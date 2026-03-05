import { api, getApiErrorMessage, setStoredToken } from './api';
import { mockUser } from '../data/mock';
import type { AuthResponse, User } from '../types';

const USER_KEY = 'livrarium_user';

function setStoredUser(user: User | null) {
  if (!user) {
    localStorage.removeItem(USER_KEY);
    return;
  }

  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getStoredUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export const authService = {
  getStoredUser,
  setStoredUser,

  async login(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      setStoredToken(response.data.token);
      setStoredUser(response.data.user);
      return response.data.user;
    } catch (error) {
      const isMockMode = import.meta.env.DEV;
      if (isMockMode) {
        const fallback = { ...mockUser, email };
        setStoredToken('mock-token');
        setStoredUser(fallback);
        return fallback;
      }
      throw new Error(getApiErrorMessage(error, 'Não foi possível fazer login.'));
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignora erro de logout no backend
    } finally {
      setStoredToken(null);
      setStoredUser(null);
    }
  }
};

import { api, getApiErrorMessage, setStoredToken } from './api';
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
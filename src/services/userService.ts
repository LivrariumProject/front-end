import { api, getApiErrorMessage, unwrapItemResponse } from './api';
import { authService } from './authService';
import { mockUser } from '../data/mock';
import type { ApiItemResponse, User } from '../types';

export const userService = {
  getStoredUser: authService.getStoredUser,
  setStoredUser: authService.setStoredUser,

  async signup(payload: Omit<User, 'id' | 'role'>): Promise<User> {
    try {
      const response = await api.post<ApiItemResponse<User>>('/users', payload);
      const createdUser = unwrapItemResponse(response.data);

      // Faz login em seguida para obter o token JWT do backend.
      return await authService.login(payload.email, payload.password ?? '');
    } catch (error) {
      const isMockMode = import.meta.env.DEV;
      if (isMockMode) {
        const fallback = { ...mockUser, ...payload };
        this.setStoredUser(fallback);
        return fallback;
      }
      throw new Error(getApiErrorMessage(error, 'Não foi possível criar a conta.'));
    }
  },

  async update(id: number, payload: Partial<User>): Promise<User> {
    try {
      const response = await api.put<ApiItemResponse<User>>(`/users/${id}`, payload);
      const user = unwrapItemResponse(response.data);
      this.setStoredUser({ ...(this.getStoredUser() ?? {}), ...user });
      return user;
    } catch (error) {
      const isMockMode = import.meta.env.DEV;
      if (isMockMode) {
        const merged = { ...(this.getStoredUser() ?? mockUser), ...payload } as User;
        this.setStoredUser(merged);
        return merged;
      }
      throw new Error(getApiErrorMessage(error, 'Não foi possível atualizar o perfil.'));
    }
  }
};

import { api, getApiErrorMessage, unwrapItemResponse } from './api';
import { authService } from './authService';
import type { ApiItemResponse, User } from '../types';

export const userService = {
  getStoredUser: authService.getStoredUser,
  setStoredUser: authService.setStoredUser,

  async signup(payload: Omit<User, 'id' | 'role'>): Promise<User> {
    try {
      // tenta /register (backend atual)
      try {
        await api.post('/register', payload);
      } catch {
        // fallback opcional caso alguém mova registro para /users
        await api.post('/users', payload);
      }

      // login após cadastro (precisa de password)
      return await authService.login(payload.email, payload.password ?? '');
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível criar a conta.'));
    }
  },

  async update(id: number, payload: Partial<User>): Promise<User> {
    try {
      const response = await api.put<ApiItemResponse<User>>(`/users/${id}`, payload);
      const user = unwrapItemResponse(response.data);

      // preserva dados já salvos (ex.: role) e atualiza com o retorno do backend
      this.setStoredUser({ ...(this.getStoredUser() ?? {}), ...user });
      return user;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível atualizar o perfil.'));
    }
  }
};

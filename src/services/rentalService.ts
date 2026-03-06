import { api, getApiErrorMessage, unwrapItemResponse, unwrapListResponse } from './api';
import type { ApiItemResponse, ApiListResponse, PaymentMethod, Rental } from '../types';

export const rentalService = {
  async getByUser(userId: number): Promise<Rental[]> {
    try {
      const response = await api.get<ApiListResponse<Rental>>(`/rentals/user/${userId}`);
      return unwrapListResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível carregar os aluguéis.'));
    }
  },

  async createMany(
    userId: number,
    items: { bookId: number; rentalDays: number; paymentMethod: PaymentMethod }[]
  ): Promise<Rental[]> {
    try {
      const responses = await Promise.all(
        items.map((item) =>
          api.post<ApiItemResponse<Rental>>('/rentals', {
            userId,
            bookId: item.bookId,
            rentalDays: item.rentalDays,
            paymentMethod: item.paymentMethod
          })
        )
      );

      return responses.map((r) => unwrapItemResponse(r.data));
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível finalizar os aluguéis.'));
    }
  }
};

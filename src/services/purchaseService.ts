import { api, getApiErrorMessage, unwrapItemResponse, unwrapListResponse } from './api';
import type { ApiItemResponse, ApiListResponse, PaymentMethod, Purchase } from '../types';

export const purchaseService = {
  async getByUser(userId: number): Promise<Purchase[]> {
    try {
      const response = await api.get<ApiListResponse<Purchase>>(`/purchases/user/${userId}`);
      return unwrapListResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível carregar as compras.'));
    }
  },

  async createMany(
    userId: number,
    items: { bookId: number; paymentMethod: PaymentMethod }[]
  ): Promise<Purchase[]> {
    try {
      const responses = await Promise.all(
        items.map((item) =>
          api.post<ApiItemResponse<Purchase>>('/purchases', {
            userId,
            bookId: item.bookId,
            paymentMethod: item.paymentMethod
          })
        )
      );

      return responses.map((r) => unwrapItemResponse(r.data));
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível finalizar as compras.'));
    }
  },

  async listAll(): Promise<Purchase[]> {
    try {
      const response = await api.get<ApiListResponse<Purchase>>('/purchases');
      return unwrapListResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível carregar todas as compras.'));
    }
  },

  async confirm(id: number): Promise<Purchase> {
    try {
      const response = await api.patch<ApiItemResponse<Purchase>>(`/purchases/${id}/confirm`);
      return unwrapItemResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível confirmar a compra.'));
    }
  },

  async fail(id: number): Promise<Purchase> {
    try {
      const response = await api.patch<ApiItemResponse<Purchase>>(`/purchases/${id}/fail`);
      return unwrapItemResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível marcar a compra como falha.'));
    }
  },

  async refund(id: number): Promise<Purchase> {
    try {
      const response = await api.patch<ApiItemResponse<Purchase>>(`/purchases/${id}/refund`);
      return unwrapItemResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível reembolsar a compra.'));
    }
  },
};

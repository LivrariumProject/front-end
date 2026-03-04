import { api, unwrapItemResponse, unwrapListResponse } from './api';
import { mockBooks, mockPurchases } from '../data/mock';
import type { ApiItemResponse, ApiListResponse, PaymentMethod, Purchase } from '../types';

export const purchaseService = {
  async getByUser(userId: number): Promise<Purchase[]> {
    try {
      const response = await api.get<ApiListResponse<Purchase>>(`/purchases/user/${userId}`);
      return unwrapListResponse(response.data);
    } catch {
      return mockPurchases;
    }
  },

  async createMany(userId: number, items: { bookId: number; paymentMethod: PaymentMethod }[]): Promise<Purchase[]> {
    const created: Purchase[] = [];

    for (const item of items) {
      try {
        const response = await api.post<ApiItemResponse<Purchase>>('/purchases', {
          userId,
          bookId: item.bookId,
          paymentMethod: item.paymentMethod
        });
        created.push(unwrapItemResponse(response.data));
      } catch {
        created.push({
          id: Date.now() + item.bookId,
          userId,
          bookId: item.bookId,
          price: Number(mockBooks.find((book) => book.id === item.bookId)?.price ?? 0),
          paymentMethod: item.paymentMethod,
          paymentStatus: 'completed',
          purchaseDate: new Date().toISOString(),
          book: mockBooks.find((book) => book.id === item.bookId)
        });
      }
    }

    return created;
  }
};

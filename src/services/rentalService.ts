import { api, unwrapItemResponse, unwrapListResponse } from './api';
import { mockBooks, mockRentals } from '../data/mock';
import type { ApiItemResponse, ApiListResponse, PaymentMethod, Rental } from '../types';

export const rentalService = {
  async getByUser(userId: number): Promise<Rental[]> {
    try {
      const response = await api.get<ApiListResponse<Rental>>(`/rentals/user/${userId}`);
      return unwrapListResponse(response.data);
    } catch {
      return mockRentals;
    }
  },

  async getActiveByUser(userId: number): Promise<Rental[]> {
    try {
      const response = await api.get<ApiListResponse<Rental>>(`/rentals/user/${userId}/active`);
      return unwrapListResponse(response.data);
    } catch {
      return mockRentals.filter((item) => item.rentalStatus === 'active');
    }
  },

  async createMany(
    userId: number,
    items: { bookId: number; rentalDays: number; paymentMethod: PaymentMethod }[]
  ): Promise<Rental[]> {
    const created: Rental[] = [];

    for (const item of items) {
      try {
        const response = await api.post<ApiItemResponse<Rental>>('/rentals', {
          userId,
          bookId: item.bookId,
          rentalDays: item.rentalDays,
          paymentMethod: item.paymentMethod
        });
        created.push(unwrapItemResponse(response.data));
      } catch {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + item.rentalDays);

        created.push({
          id: Date.now() + item.bookId,
          userId,
          bookId: item.bookId,
          rentalPrice: Number(mockBooks.find((book) => book.id === item.bookId)?.rentalPrice ?? 0),
          paymentMethod: item.paymentMethod,
          paymentStatus: 'completed',
          rentalStatus: 'active',
          rentalDate: new Date().toISOString(),
          dueDate: dueDate.toISOString(),
          book: mockBooks.find((book) => book.id === item.bookId)
        });
      }
    }

    return created;
  }
};

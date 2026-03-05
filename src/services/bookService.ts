import { api, unwrapItemResponse, unwrapListResponse } from './api';
import { mockBooks } from '../data/mock';
import type { ApiItemResponse, ApiListResponse, Book } from '../types';

export const bookService = {
  async getAll(): Promise<Book[]> {
    try {
      const response = await api.get<ApiListResponse<Book>>('/books');
      return unwrapListResponse(response.data);
    } catch {
      return mockBooks;
    }
  },

  async getById(id: number): Promise<Book> {
    try {
      const response = await api.get<ApiItemResponse<Book>>(`/books/${id}`);
      return unwrapItemResponse(response.data);
    } catch {
      const book = mockBooks.find((item) => item.id === id);
      if (!book) throw new Error('Livro não encontrado');
      return book;
    }
  },

  async search(params: Record<string, string>): Promise<Book[]> {
    try {
      const response = await api.get<ApiListResponse<Book>>('/books/search', { params });
      return unwrapListResponse(response.data);
    } catch {
      return mockBooks.filter((book) => {
        const title = params.title?.toLowerCase() ?? '';
        const genre = params.genre?.toLowerCase() ?? '';
        return (
          (!title || book.title.toLowerCase().includes(title)) &&
          (!genre || (book.genre ?? '').toLowerCase().includes(genre))
        );
      });
    }
  }
};

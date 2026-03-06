import { api, getApiErrorMessage, unwrapItemResponse, unwrapListResponse } from './api';
import type { ApiItemResponse, ApiListResponse, Book } from '../types';

export type CreateBookPayload = {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  price: number;
  rentalPrice: number;
  description?: string;
};

export const bookService = {
  async getAll(): Promise<Book[]> {
    try {
      const response = await api.get<ApiListResponse<Book>>('/books');
      return unwrapListResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível carregar os livros.'));
    }
  },

  async getById(id: number): Promise<Book> {
    try {
      const response = await api.get<ApiItemResponse<Book>>(`/books/${id}`);
      return unwrapItemResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível carregar o livro.'));
    }
  },

  async search(params: Record<string, string | number | undefined>): Promise<Book[]> {
    try {
      const response = await api.get<ApiListResponse<Book>>('/books/search', { params });
      return unwrapListResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível buscar livros.'));
    }
  },

  async create(payload: CreateBookPayload): Promise<Book> {
    try {
      const response = await api.post<ApiItemResponse<Book>>('/books', payload);
      return unwrapItemResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível criar o livro.'));
    }
  },

  async update(id: number, payload: Partial<CreateBookPayload & { available: boolean }>): Promise<Book> {
    try {
      const response = await api.put<ApiItemResponse<Book>>(`/books/${id}`, payload);
      return unwrapItemResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível atualizar o livro.'));
    }
  },

  async markAvailable(id: number): Promise<Book> {
    try {
      const response = await api.patch<ApiItemResponse<Book>>(`/books/${id}/available`);
      return unwrapItemResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível marcar como disponível.'));
    }
  },

  async markUnavailable(id: number): Promise<Book> {
    try {
      const response = await api.patch<ApiItemResponse<Book>>(`/books/${id}/unavailable`);
      return unwrapItemResponse(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível marcar como indisponível.'));
    }
  },

  async remove(id: number): Promise<void> {
    try {
      await api.delete(`/books/${id}`);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Não foi possível deletar o livro.'));
    }
  },

  async getAvailable(): Promise<Book[]> {
    const response = await api.get<ApiListResponse<Book>>('/books/available');
    return unwrapListResponse(response.data);
  },
};

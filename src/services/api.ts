import axios, { AxiosError } from 'axios';
import type { ApiItemResponse, ApiListResponse } from '../types';

const TOKEN_KEY = 'livrarium_token';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function unwrapListResponse<T>(payload: ApiListResponse<T> | T[]): T[] {
  if (Array.isArray(payload)) return payload;
  return payload.data;
}

export function unwrapItemResponse<T>(payload: ApiItemResponse<T> | T): T {
  const candidate = payload as ApiItemResponse<T>;
  if (candidate && typeof candidate === 'object' && 'data' in candidate) {
    return candidate.data;
  }
  return payload as T;
}

export function getApiErrorMessage(error: unknown, fallback = 'Ocorreu um erro na requisição.') {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message || fallback;
  }

  return fallback;
}

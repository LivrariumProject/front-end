export type PaymentMethod = 'credit_card' | 'debit_card' | 'pix' | 'boleto';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type RentalStatus = 'active' | 'returned' | 'overdue';
export type CartMode = 'purchase' | 'rental';
export type UserRole = 'admin' | 'user';

export interface ApiListResponse<T> {
  success: boolean;
  count?: number;
  message?: string;
  data: T[];
}

export interface ApiItemResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  publishedYear?: number;
  genre?: string;
  price: number;
  rentalPrice: number;
  available?: boolean;
  description?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: UserRole;
}

export interface Purchase {
  id: number;
  userId: number;
  bookId: number;
  price: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  purchaseDate: string;
  user?: User;
  book?: Book;
}

export interface Rental {
  id: number;
  userId: number;
  bookId: number;
  rentalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  rentalStatus: RentalStatus;
  rentalDate: string;
  dueDate: string;
  returnDate?: string | null;
  daysRemaining?: number;
  isOverdue?: boolean;
  user?: User;
  book?: Book;
}

export interface CartItem {
  id: string;
  book: Book;
  mode: CartMode;
  rentalDays?: number;
  price: number;
}

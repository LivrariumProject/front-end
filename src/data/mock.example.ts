import type { Book, Purchase, Rental, User } from '../types';

export const mockBooks: Book[] = [
  {
    id: 1,
    title: 'O Senhor dos Anéis',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasia',
    price: 45.9,
    rentalPrice: 12.9,
    available: true,
    publishedYear: 1954,
    description: 'Uma jornada épica para destruir o Anel Único.'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    genre: 'Distopia',
    price: 32.5,
    rentalPrice: 9.9,
    available: true,
    publishedYear: 1949,
    description: 'Um clássico sobre vigilância, poder e controle social.'
  },
  {
    id: 3,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Tecnologia',
    price: 89.9,
    rentalPrice: 19.9,
    available: true,
    publishedYear: 2008,
    description: 'Boas práticas para escrever código limpo e sustentável.'
  },
  {
    id: 4,
    title: 'Hábitos Atômicos',
    author: 'James Clear',
    genre: 'Desenvolvimento pessoal',
    price: 52,
    rentalPrice: 14.9,
    available: true,
    publishedYear: 2018,
    description: 'Pequenas mudanças que geram grandes resultados.'
  }
];

export const mockUser: User = {
  id: 1,
  name: 'Usuário Demo',
  email: 'demo@livrarium.com',
  role: 'user'
};

export const mockPurchases: Purchase[] = [
  {
    id: 1,
    userId: 1,
    bookId: 1,
    price: 45.9,
    paymentMethod: 'pix',
    paymentStatus: 'completed',
    purchaseDate: '2026-03-01',
    book: mockBooks[0]
  }
];

export const mockRentals: Rental[] = [
  {
    id: 1,
    userId: 1,
    bookId: 4,
    rentalPrice: 14.9,
    paymentMethod: 'credit_card',
    paymentStatus: 'completed',
    rentalStatus: 'active',
    rentalDate: '2026-03-02',
    dueDate: '2026-04-01',
    book: mockBooks[3]
  }
];

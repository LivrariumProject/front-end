import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { HomePage } from './pages/HomePage';
import { BookDetailPage } from './pages/BookDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LibraryPage } from './pages/LibraryPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { bookService } from './services/bookService';
import { authService } from './services/authService';
import { Loading } from './components/Loading';
import type { Book, User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(authService.getStoredUser());
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadBooks() {
      const data = await bookService.getAll();
      setBooks(data);
      setLoading(false);
    }

    loadBooks();
  }, []);

  function syncUser() {
    setUser(authService.getStoredUser());
  }

  async function handleLogout() {
    await authService.logout();
    setUser(null);
  }

  if (loading) return <Loading />;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={syncUser} />} />
      <Route path="/signup" element={<SignupPage onSignup={syncUser} />} />

      <Route
        path="/"
        element={
          <MainLayout user={user} search={search} onSearchChange={setSearch} onLogout={handleLogout} />
        }
      >
        <Route index element={<HomePage books={books} search={search} />} />
        <Route path="books/:id" element={<BookDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

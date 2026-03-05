import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { BookFilters } from '../components/BookFilters';
import { EmptyState } from '../components/EmptyState';
import { useCart } from '../context/CartContext';
import type { Book } from '../types';

interface HomePageProps {
  books: Book[];
  search: string;
}

export function HomePage({ books, search }: HomePageProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [genre, setGenre] = useState('');
  const [type, setType] = useState('');

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = [book.title, book.author, book.genre]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGenre = !genre || book.genre === genre;
      const matchesType = !type || (type === 'purchase' ? book.price > 0 : (book.rentalPrice ?? 0) > 0);

      return matchesSearch && matchesGenre && matchesType;
    });
  }, [books, search, genre, type]);

  function handleBuy(book: Book) {
    addItem({
      id: `purchase-${book.id}-${Date.now()}`,
      book,
      mode: 'purchase',
      price: book.price
    });
    navigate('/cart');
  }

  function handleRent(book: Book) {
    addItem({
      id: `rental-${book.id}-${Date.now()}`,
      book,
      mode: 'rental',
      rentalDays: 7,
      price: book.rentalPrice ?? book.price
    });
    navigate('/cart');
  }

  return (
    <div>
      <section className="hero-card">
        <h1>Bem-vindo à Livrarium</h1>
        <p>Catálogo simples para compra e aluguel de livros digitais.</p>
      </section>

      <BookFilters genre={genre} type={type} onGenreChange={setGenre} onTypeChange={setType} />

      {filteredBooks.length === 0 ? (
        <EmptyState title="Nenhum livro encontrado" description="Ajuste os filtros ou a busca." />
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onBuy={handleBuy} onRent={handleRent} />
          ))}
        </div>
      )}
    </div>
  );
}

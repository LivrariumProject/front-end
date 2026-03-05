import { Link } from 'react-router-dom';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  onBuy: (book: Book) => void;
  onRent: (book: Book) => void;
}

export function BookCard({ book, onBuy, onRent }: BookCardProps) {
  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`} className="book-cover-link">
        <div className="book-cover">📖</div>
      </Link>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <strong>R$ {book.price.toFixed(2)}</strong>
        <div className="book-actions-row">
          <button onClick={() => onBuy(book)}>Comprar</button>
          <button className="secondary" onClick={() => onRent(book)}>
            Alugar
          </button>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  onBuy: (book: Book) => void;
  onRent: (book: Book) => void;
}

export function BookCard({ book, onBuy, onRent }: BookCardProps) {
  const canBuy = Number(book.price) > 0;
  const canRent = Number(book.rentalPrice ?? 0) > 0;

  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`} className="book-cover-link">
        <div className="book-cover">📖</div>
      </Link>

      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>

        {/* Mostra preços de forma consistente */}
        <strong>
          {canBuy ? `Compra: R$ ${Number(book.price).toFixed(2)}` : 'Compra: indisponível'}
        </strong>
        <div className="muted">
          {canRent ? `Aluguel: R$ ${Number(book.rentalPrice).toFixed(2)}` : 'Aluguel: indisponível'}
        </div>

        <div className="book-actions-row">
          {canBuy ? <button onClick={() => onBuy(book)}>Comprar</button> : <span />}
          {canRent ? (
            <button className="secondary" onClick={() => onRent(book)}>
              Alugar
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
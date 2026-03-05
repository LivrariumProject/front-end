import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { useCart } from '../context/CartContext';
import { bookService } from '../services/bookService';
import type { Book } from '../types';

export function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'purchase' | 'rental'>('purchase');
  const [rentalDays, setRentalDays] = useState(7);

  useEffect(() => {
    async function loadBook() {
      if (!id) return;
      const data = await bookService.getById(Number(id));
      setBook(data);
      setLoading(false);
    }

    loadBook();
  }, [id]);

  if (loading) return <Loading />;
  if (!book) return <div className="feedback-box">Livro não encontrado.</div>;

  const currentBook = book;

  function handleAddToCart() {
    addItem({
      id: `${mode}-${currentBook.id}-${Date.now()}`,
      book: currentBook,
      mode,
      rentalDays: mode === 'rental' ? rentalDays : undefined,
      price: mode === 'purchase' ? currentBook.price : currentBook.rentalPrice ?? currentBook.price
    });
    navigate('/cart');
  }

  return (
    <section className="detail-card">
      <div className="detail-cover-large">📖</div>
      <div>
        <h1>{currentBook.title}</h1>
        <p className="muted">{currentBook.author}</p>
        <p className="muted">{currentBook.genre} • {currentBook.publishedYear}</p>
        <p className="detail-description">{currentBook.description ?? 'Sem descrição cadastrada.'}</p>

        <div className="detail-options">
          <button className={mode === 'purchase' ? 'active' : ''} onClick={() => setMode('purchase')}>
            Comprar por R$ {currentBook.price.toFixed(2)}
          </button>
          <button className={mode === 'rental' ? 'active' : ''} onClick={() => setMode('rental')}>
            Alugar por R$ {(currentBook.rentalPrice ?? currentBook.price).toFixed(2)}
          </button>
        </div>

        {mode === 'rental' && (
          <div className="inline-field">
            <label>Dias do aluguel</label>
            <select value={rentalDays} onChange={(event) => setRentalDays(Number(event.target.value))}>
              <option value={7}>7 dias</option>
              <option value={15}>15 dias</option>
              <option value={30}>30 dias</option>
            </select>
          </div>
        )}

        <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
      </div>
    </section>
  );
}

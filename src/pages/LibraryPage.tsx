import { useEffect, useState } from 'react';
import { EmptyState } from '../components/EmptyState';
import { Loading } from '../components/Loading';
import { purchaseService } from '../services/purchaseService';
import { userService } from '../services/userService';
import type { Purchase } from '../types';

export function LibraryPage() {
  const [items, setItems] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string>('');

  useEffect(() => {
    async function load() {
      const user = userService.getStoredUser();
      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }
      const purchases = await purchaseService.getByUser(user.id);
      setItems(purchases.filter((purchase) => purchase.paymentStatus === 'completed'));
      setLoading(false);
    }

    load();
  }, []);

  function handleRead() {
    setNotice('A leitura do conteúdo do livro não está disponível nesta versão do projeto.');
  }

  if (loading) return <Loading />;
  if (items.length === 0) {
    return <EmptyState title="Biblioteca vazia" description="Nenhum livro comprado com pagamento concluído ainda." />;
  }

  return (
    <section className="panel">
      <h2>Minha biblioteca</h2>

      {notice ? (
        <div className="feedback-box" style={{ marginBottom: 12, padding: '1rem' }}>
          {notice}
        </div>
      ) : null}

      <div className="books-grid compact-grid">
        {items.map((purchase) => (
          <div className="book-card" key={purchase.id}>
            <div className="book-cover">📘</div>
            <div className="book-info">
              <h3>{purchase.book?.title ?? `Livro #${purchase.bookId}`}</h3>
              <p>{purchase.book?.author ?? 'Autor não informado'}</p>
              <button type="button" onClick={handleRead}>
                Ler
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

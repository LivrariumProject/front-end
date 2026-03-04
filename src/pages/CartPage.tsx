import { Link, useNavigate } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { items, removeItem, subtotal } = useCart();
  const navigate = useNavigate();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (items.length === 0) {
    return <EmptyState title="Carrinho vazio" description="Adicione livros do catálogo para continuar." />;
  }

  return (
    <div className="cart-layout">
      <section className="panel">
        <h2>Carrinho</h2>
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <div>
              <h3>{item.book.title}</h3>
              <p className="muted">
                {item.mode === 'purchase' ? 'Compra' : `Aluguel (${item.rentalDays} dias)`}
              </p>
              <strong>R$ {item.price.toFixed(2)}</strong>
            </div>
            <button className="secondary" onClick={() => removeItem(item.id)}>
              Remover
            </button>
          </div>
        ))}
      </section>

      <aside className="panel">
        <h2>Resumo</h2>
        <div className="summary-line"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
        <div className="summary-line"><span>Taxa</span><span>R$ {tax.toFixed(2)}</span></div>
        <div className="summary-line total"><span>Total</span><span>R$ {total.toFixed(2)}</span></div>
        <button onClick={() => navigate('/checkout')}>Ir para checkout</button>
        <Link to="/">Continuar comprando</Link>
      </aside>
    </div>
  );
}

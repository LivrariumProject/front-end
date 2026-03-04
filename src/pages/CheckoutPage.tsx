import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { purchaseService } from '../services/purchaseService';
import { rentalService } from '../services/rentalService';
import { userService } from '../services/userService';
import type { PaymentMethod } from '../types';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = useMemo(() => subtotal, [subtotal]);

  async function handleCheckout(event: React.FormEvent) {
    event.preventDefault();
    const user = userService.getStoredUser();

    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const purchaseItems = items.filter((item) => item.mode === 'purchase');
      const rentalItems = items.filter((item) => item.mode === 'rental');

      if (purchaseItems.length > 0) {
        await purchaseService.createMany(
          user.id,
          purchaseItems.map((item) => ({
            bookId: item.book.id,
            paymentMethod
          }))
        );
      }

      if (rentalItems.length > 0) {
        await rentalService.createMany(
          user.id,
          rentalItems.map((item) => ({
            bookId: item.book.id,
            rentalDays: item.rentalDays ?? 7,
            paymentMethod
          }))
        );
      }

      clearCart();
      window.alert('Pedido realizado com sucesso.');
      navigate('/history');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível finalizar o pedido.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="panel checkout-form" onSubmit={handleCheckout}>
      <h2>Checkout</h2>

      <label>Método de pagamento</label>
      <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}>
        <option value="pix">PIX</option>
        <option value="credit_card">Cartão de crédito</option>
        <option value="debit_card">Cartão de débito</option>
        <option value="boleto">Boleto</option>
      </select>

      <div className="order-box">
        {items.map((item) => (
          <div className="summary-line" key={item.id}>
            <span>
              {item.book.title}
              {item.mode === 'rental' ? ` (${item.rentalDays ?? 7} dias)` : ''}
            </span>
            <span>R$ {item.price.toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-line total">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      {error ? <div className="feedback-box error-box">{error}</div> : null}

      <button type="submit" disabled={loading || items.length === 0}>
        {loading ? 'Finalizando...' : 'Finalizar pedido'}
      </button>
    </form>
  );
}

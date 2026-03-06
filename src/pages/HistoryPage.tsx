import { useEffect, useState } from 'react';
import { EmptyState } from '../components/EmptyState';
import { Loading } from '../components/Loading';
import { purchaseService } from '../services/purchaseService';
import { rentalService } from '../services/rentalService';
import { userService } from '../services/userService';
import type { Purchase, Rental } from '../types';

function formatDate(value?: string) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('pt-BR');
}

function paymentStatusLabel(status?: string) {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'completed':
      return 'Concluída';
    case 'failed':
      return 'Falhou';
    case 'refunded':
      return 'Reembolsada';
    default:
      return status ?? '-';
  }
}

function paymentStatusBadge(status?: string) {
  switch (status) {
    case 'completed':
      return 'badge-success';
    case 'failed':
      return 'badge-danger';
    case 'refunded':
      return 'badge-muted';
    case 'pending':
    default:
      return 'badge-warning';
  }
}

function rentalStatusLabel(status?: string) {
  switch (status) {
    case 'active':
      return 'Ativo';
    case 'returned':
      return 'Devolvido';
    case 'overdue':
      return 'Atrasado';
    default:
      return status ?? '-';
  }
}

function rentalStatusBadge(status?: string) {
  switch (status) {
    case 'active':
      return 'badge-success';
    case 'returned':
      return 'badge-muted';
    case 'overdue':
      return 'badge-danger';
    default:
      return 'badge-warning';
  }
}

export function HistoryPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const user = userService.getStoredUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const [purchaseData, rentalData] = await Promise.all([
        purchaseService.getByUser(user.id),
        rentalService.getByUser(user.id)
      ]);

      setPurchases(purchaseData);
      setRentals(rentalData);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <Loading />;
  if (purchases.length === 0 && rentals.length === 0) {
    return <EmptyState title="Sem histórico" description="As compras e aluguéis aparecerão aqui." />;
  }

  return (
    <div className="panel">
      <h2>Histórico</h2>

      <table className="history-table">
        <thead>
          <tr>
            <th>Livro</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {purchases.map((purchase) => (
            <tr key={`purchase-${purchase.id}`}>
              <td>{purchase.book?.title ?? `Livro #${purchase.bookId}`}</td>
              <td>Compra</td>
              <td>{formatDate(purchase.purchaseDate)}</td>
              <td>R$ {Number(purchase.price).toFixed(2)}</td>
              <td>
                <span className={`badge ${paymentStatusBadge(purchase.paymentStatus)}`}>
                  {paymentStatusLabel(purchase.paymentStatus)}
                </span>
              </td>
            </tr>
          ))}

          {rentals.map((rental) => (
            <tr key={`rental-${rental.id}`}>
              <td>{rental.book?.title ?? `Livro #${rental.bookId}`}</td>
              <td>Aluguel</td>
              <td>{formatDate(rental.rentalDate)}</td>
              <td>R$ {Number(rental.rentalPrice).toFixed(2)}</td>
              <td style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className={`badge ${rentalStatusBadge(rental.rentalStatus)}`}>
                  {rentalStatusLabel(rental.rentalStatus)}
                </span>
                <span className={`badge ${paymentStatusBadge(rental.paymentStatus)}`}>
                  {paymentStatusLabel(rental.paymentStatus)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

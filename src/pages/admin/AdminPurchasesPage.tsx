import { useEffect, useState } from 'react';
import { purchaseService } from '../../services/purchaseService';
import type { Purchase } from '../../types';

export function AdminPurchasesPage() {
    const [items, setItems] = useState<Purchase[]>([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    async function load() {
        setError('');
        try {
        const data = await purchaseService.listAll();
        setItems(data);
        } catch (e) {
        setError(e instanceof Error ? e.message : 'Erro ao carregar compras.');
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function act(action: 'confirm' | 'fail' | 'refund', id: number) {
        setMessage('');
        setError('');

        try {
        if (action === 'confirm') await purchaseService.confirm(id);
        if (action === 'fail') await purchaseService.fail(id);
        if (action === 'refund') await purchaseService.refund(id);

        setMessage(`Compra ${id} atualizada: ${action}`);
        setEditingId(null);
        await load();
        } catch (e) {
        setError(e instanceof Error ? e.message : 'Erro ao atualizar compra.');
        }
    }

    return (
        <section className="panel">
        <h2>Admin • Compras</h2>

        <div className="admin-actions" style={{ marginBottom: 12 }}>
            <button type="button" className="secondary" onClick={load}>
            Recarregar
            </button>
        </div>

        {message ? <div className="feedback-box">{message}</div> : null}
        {error ? <div className="feedback-box error-box">{error}</div> : null}

        <table className="history-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>User</th>
                <th>Livro</th>
                <th>Método</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
            </tr>
            </thead>

            <tbody>
            {items.map((p: any) => {
                const isFinal = p.paymentStatus && p.paymentStatus !== 'pending';
                const isEditing = editingId === p.id;

                return (
                <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.userId}</td>
                    <td>{p.bookId}</td>
                    <td>{p.paymentMethod}</td>
                    <td>{p.paymentStatus}</td>
                    <td>{p.purchaseDate ? new Date(p.purchaseDate).toLocaleString() : '-'}</td>

                    <td style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {/* Se pendente, mostra ações direto.
                        Se já finalizou, mostra só Editar.
                        Se clicou Editar, mostra ações novamente. */}
                    {!isFinal || isEditing ? (
                        <>
                        <button className="btn-confirm btn-small" onClick={() => act('confirm', p.id)}>
                            Confirmar
                        </button>
                        <button className="btn-fail btn-small" onClick={() => act('fail', p.id)}>
                            Falhar
                        </button>
                        <button className="btn-refund btn-small" onClick={() => act('refund', p.id)}>
                            Reembolsar
                        </button>

                        {isFinal ? (
                            <button className="secondary btn-small" onClick={() => setEditingId(null)}>
                            Cancelar
                            </button>
                        ) : null}
                        </>
                    ) : (
                        <button className="btn-edit btn-small" onClick={() => setEditingId(p.id)}>
                        Editar
                        </button>
                    )}
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </section>
    );
}
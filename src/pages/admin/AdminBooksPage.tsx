import { useEffect, useState } from 'react';
import { bookService, type CreateBookPayload } from '../../services/bookService';
import type { Book } from '../../types';

const emptyForm: CreateBookPayload = {
    title: '',
    author: '',
    isbn: '',
    publishedYear: new Date().getFullYear(),
    genre: '',
    price: 0,
    rentalPrice: 0,
    description: ''
    };

    export function AdminBooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [form, setForm] = useState<CreateBookPayload>(emptyForm);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loadingList, setLoadingList] = useState(false);

    // controle de modo
    const [allowMode, setAllowMode] = useState<'both' | 'purchase' | 'rental'>('both');

    // confirmação do delete sem confirm()
    const [deleteId, setDeleteId] = useState<number | null>(null);

    async function load(showMessage = false) {
        setError('');
        if (showMessage) setMessage('');
        setLoadingList(true);

        try {
        const data = await bookService.getAll(); // admin vê todos
        setBooks(data);
        if (showMessage) setMessage('Lista recarregada.');
        } catch (e) {
        setError(e instanceof Error ? e.message : 'Erro ao carregar livros.');
        } finally {
        setLoadingList(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
        const payload: CreateBookPayload = {
            ...form,
            publishedYear: Number(form.publishedYear),
            price: Number(form.price),
            rentalPrice: Number(form.rentalPrice),
            description: form.description?.trim() || undefined
        };

        // aplica regra do modo
        if (allowMode === 'purchase') payload.rentalPrice = 0;
        if (allowMode === 'rental') payload.price = 0;

        const created = await bookService.create(payload);

        setMessage(`Livro criado: ${created.title} (indisponível por padrão — use "Disponibilizar")`);
        setForm(emptyForm);
        setAllowMode('both');
        await load(true);
        } catch (e) {
        setError(e instanceof Error ? e.message : 'Erro ao criar livro.');
        } finally {
        setLoading(false);
        }
    }

    async function toggleAvailability(book: Book) {
        setMessage('');
        setError('');

        try {
        if (book.available) {
            await bookService.markUnavailable(book.id);
        } else {
            await bookService.markAvailable(book.id);
        }
        await load();
        } catch (e) {
        setError(e instanceof Error ? e.message : 'Erro ao atualizar disponibilidade.');
        }
    }

    // delete sem confirm()
    async function handleDelete(book: Book) {
        setMessage('');
        setError('');

        try {
        await bookService.remove(book.id);

        // remove da lista imediatamente
        setBooks((prev) => prev.filter((x) => x.id !== book.id));

        setMessage('Livro deletado.');
        setDeleteId(null);
        } catch (e) {
        const msg = e instanceof Error ? e.message : 'Erro ao deletar.';
        const lower = msg.toLowerCase();

        const isForeignKey =
            lower.includes('er_row_is_referenced') ||
            lower.includes('foreign key') ||
            lower.includes('constraint') ||
            lower.includes('cannot delete or update a parent row') ||
            lower.includes('purchases') ||
            lower.includes('rentals');

        if (isForeignKey) {
            setError('Não é possível deletar este livro porque já existe compra/aluguel associado. Use "Indisponibilizar".');
            setDeleteId(null);
            return;
        }

        setError(msg);
        setDeleteId(null);
        }
    }

    return (
        <section className="panel">
        <h2>Admin • Livros</h2>

        <form className="admin-book-form" onSubmit={handleCreate}>
            <div>
            <label>Título</label>
            <input value={form.title} required onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))} />
            </div>

            <div>
            <label>Autor</label>
            <input value={form.author} required onChange={(e) => setForm((c) => ({ ...c, author: e.target.value }))} />
            </div>

            <div>
            <label>ISBN</label>
            <input value={form.isbn} required onChange={(e) => setForm((c) => ({ ...c, isbn: e.target.value }))} />
            </div>

            <div>
            <label>Ano</label>
            <input
                type="number"
                value={form.publishedYear}
                required
                onChange={(e) => setForm((c) => ({ ...c, publishedYear: Number(e.target.value) }))}
            />
            </div>

            <div>
            <label>Gênero</label>
            <input value={form.genre} required onChange={(e) => setForm((c) => ({ ...c, genre: e.target.value }))} />
            </div>

            <div>
            <label>Permitir</label>
            <select value={allowMode} onChange={(e) => setAllowMode(e.target.value as any)}>
                <option value="both">Compra e Aluguel</option>
                <option value="purchase">Apenas Compra</option>
                <option value="rental">Apenas Aluguel</option>
            </select>
            </div>

            <div>
            <label>Preço (compra)</label>
            <input
                type="number"
                step="0.01"
                value={form.price}
                required
                disabled={allowMode === 'rental'}
                onChange={(e) => setForm((c) => ({ ...c, price: Number(e.target.value) }))}
            />
            </div>

            <div>
            <label>Preço (aluguel)</label>
            <input
                type="number"
                step="0.01"
                value={form.rentalPrice}
                required
                disabled={allowMode === 'purchase'}
                onChange={(e) => setForm((c) => ({ ...c, rentalPrice: Number(e.target.value) }))}
            />
            </div>

            <div className="full">
            <label>Descrição (opcional)</label>
            <input value={form.description ?? ''} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} />
            </div>

            <div className="full admin-actions">
            <button type="submit" disabled={loading}>
                {loading ? 'Criando...' : 'Criar livro'}
            </button>

            <button type="button" className="secondary" disabled={loadingList} onClick={() => load(true)}>
                {loadingList ? 'Recarregando...' : 'Recarregar lista'}
            </button>
            </div>
        </form>

        {message ? <div className="feedback-box">{message}</div> : null}
        {error ? <div className="feedback-box error-box">{error}</div> : null}

        <table className="history-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Preço</th>
                <th>Aluguel</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
            </thead>

            <tbody>
            {books.map((b) => (
                <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>R$ {Number(b.price).toFixed(2)}</td>
                <td>R$ {Number(b.rentalPrice).toFixed(2)}</td>
                <td>
                    <span className={`badge ${b.available ? 'badge-success' : 'badge-muted'}`}>
                        {b.available ? 'Disponível' : 'Indisponível'}
                    </span>
                </td>

                <td style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button type="button" className="secondary" onClick={() => toggleAvailability(b)}>
                    {b.available ? 'Indisponibilizar' : 'Disponibilizar'}
                    </button>

                    {deleteId === b.id ? (
                    <>
                        <button type="button" className="btn-danger btn-small" onClick={() => handleDelete(b)}>
                        Confirmar
                        </button>
                        <button type="button" className="secondary btn-small" onClick={() => setDeleteId(null)}>
                        Cancelar
                        </button>
                    </>
                    ) : (
                    <button type="button" className="btn-danger btn-small" onClick={() => setDeleteId(b.id)}>
                        Deletar
                    </button>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </section>
    );
}
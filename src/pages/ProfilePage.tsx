import { useEffect, useState } from 'react';
import { userService } from '../services/userService';

export function ProfilePage() {
  const user = userService.getStoredUser();
  const [form, setForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    setForm((current) => {
      // evita setState desnecessário
      if (current.name === user.name && current.email === user.email) return current;
      return { name: user.name, email: user.email };
    });
  }, [user?.id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!user) return;

    setMessage('');
    setError('');

    try {
      await userService.update(user.id, form);
      setMessage('Perfil atualizado com sucesso.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível atualizar o perfil.');
    }
  }

  if (!user) {
    return <div className="feedback-box">Faça login para ver seu perfil.</div>;
  }

  return (
    <form className="panel profile-form" onSubmit={handleSubmit}>
      <h2>Meu perfil</h2>
      <label>Nome</label>
      <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
      <label>Email</label>
      <input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />

      {message ? <div className="feedback-box success-box">{message}</div> : null}
      {error ? <div className="feedback-box error-box">{error}</div> : null}

      <button type="submit">Salvar</button>
    </form>
  );
}

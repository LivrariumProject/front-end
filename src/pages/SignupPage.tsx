import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';

interface SignupPageProps {
  onSignup: () => void;
}

export function SignupPage({ onSignup }: SignupPageProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await userService.signup(form);
      onSignup();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-split">
      <div className="auth-left">
        <img src="/livrarium-icon.png" alt="Livrarium" />
        <div className="auth-slogan">Sua próxima leitura começa aqui.</div>
        <div className="auth-sub">
          Explore o catálogo, compre ou alugue livros digitais e acompanhe tudo na sua biblioteca.
        </div>
        <div className="auth-highlight">
          <span className="auth-pill">Cadastro rápido</span>
          <span className="auth-pill">Acesso imediato</span>
          <span className="auth-pill">Descubra novos títulos</span>
        </div>
      </div>

      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1>Criar conta</h1>
          <p>Cadastro conectado ao endpoint de usuários e login automático.</p>

          <label>Nome</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />

          <label>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />

          <label>Senha</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />

          {error ? <div className="feedback-box error-box">{error}</div> : null}

          <button type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>

          <span>
            Já tem conta? <Link to="/login">Entrar</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

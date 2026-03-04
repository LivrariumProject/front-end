import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  search: string;
  onSearchChange: (value: string) => void;
  onLogout: () => void;
}

export function Header({ user, search, onSearchChange, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <button className="logo-button" onClick={() => navigate('/')}>
        📚 Livrarium
      </button>

      <input
        className="search-input"
        placeholder="Buscar livros, autores..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <div className="header-actions">
        <Link to="/cart">Carrinho</Link>
        <Link to="/library">Biblioteca</Link>
        <Link to="/history">Histórico</Link>
        <Link to="/profile">Perfil</Link>
        {user ? (
          <button className="ghost-button" onClick={onLogout}>
            Sair
          </button>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </div>
    </header>
  );
}

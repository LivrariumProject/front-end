import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="header">
    <button className="logo-button" onClick={() => navigate('/')}>
      <img src="livro.png" alt="Logo Livrarium" className="logo-img" />
      <span>Livrarium</span>
    </button>

      <div className="header-actions">
        {user ? (
          <>
            <Link to="/profile">Perfil</Link>
            <button className="ghost-button" onClick={onLogout}>
              Sair
            </button>
          </>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </div>
    </header>
  );
}

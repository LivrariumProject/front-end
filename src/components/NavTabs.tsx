import { NavLink } from 'react-router-dom';
import { authService } from '../services/authService';

interface NavTabsProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function NavTabs({ search, onSearchChange }: NavTabsProps) {
  const user = authService.getStoredUser();
  const isAdmin = user?.role === 'admin';

  return (
    <nav className="nav-tabs">
      <div className="nav-tabs-left">
        <NavLink to="/">Catálogo</NavLink>
        <NavLink to="/library">Minha Biblioteca</NavLink>
        <NavLink to="/history">Histórico</NavLink>
        <NavLink to="/profile">Minha Conta</NavLink>
        <NavLink to="/cart">Carrinho</NavLink>

        {isAdmin ? (
          <>
            <NavLink to="/admin/books">Admin Livros</NavLink>
            <NavLink to="/admin/purchases">Admin Compras</NavLink>
          </>
        ) : null}
      </div>

      <input
        className="nav-search"
        placeholder="Buscar livros, autores..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </nav>
  );
}
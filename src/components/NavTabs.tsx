import { NavLink } from 'react-router-dom';

interface NavTabsProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function NavTabs({ search, onSearchChange }: NavTabsProps) {
  return (
    <nav className="nav-tabs">
      <div className="nav-tabs-left">
        <NavLink to="/">Catálogo</NavLink>
        <NavLink to="/library">Minha Biblioteca</NavLink>
        <NavLink to="/history">Histórico</NavLink>
        <NavLink to="/profile">Minha Conta</NavLink>
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
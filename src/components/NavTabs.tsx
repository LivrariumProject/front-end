import { NavLink } from 'react-router-dom';

export function NavTabs() {
  return (
    <nav className="nav-tabs">
      <NavLink to="/">Catálogo</NavLink>
      <NavLink to="/library">Minha Biblioteca</NavLink>
      <NavLink to="/history">Histórico</NavLink>
      <NavLink to="/profile">Minha Conta</NavLink>
    </nav>
  );
}

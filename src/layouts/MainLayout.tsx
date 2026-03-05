import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { NavTabs } from '../components/NavTabs';
import type { User } from '../types';

interface MainLayoutProps {
  user: User | null;
  search: string;
  onSearchChange: (value: string) => void;
  onLogout: () => void;
}

export function MainLayout({ user, search, onSearchChange, onLogout }: MainLayoutProps) {
  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <NavTabs search={search} onSearchChange={onSearchChange} />

      <main className="page-container">
        <Outlet />
      </main>

      <footer className="footer">© 2026 Livrarium</footer>
    </div>
  );
}
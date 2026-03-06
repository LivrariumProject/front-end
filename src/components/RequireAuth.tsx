import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

export function RequireAuth() {
    const location = useLocation();
    const user = authService.getStoredUser();

    if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return <Outlet />;
}
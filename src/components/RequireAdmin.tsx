import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

export function RequireAdmin() {
    const location = useLocation();
    const user = authService.getStoredUser();

    if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
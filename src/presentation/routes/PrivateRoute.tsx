import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { TokenStorage } from '../../infrastructure/storage/TokenStorage';

export const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const hasToken = TokenStorage.hasToken();

  // Si no está autenticado y no tiene token → redirigir a login
  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Inicializa el estado de autenticación desde localStorage al cargar la app
import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { container } from '../../di/container';
import { TokenStorage } from '../../infrastructure/storage/TokenStorage';

export const AuthInitializer: React.FC = () => {
  const { setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      if (!TokenStorage.hasToken()) {
        clearAuth();
        return;
      }

      try {
        const authRepo = container.getAuthRepository();
        const user = await authRepo.getCurrentUser();

        if (user) {
          setAuth(TokenStorage.getToken()!, user);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      }
    };

    initAuth();
  }, [setAuth, clearAuth]);

  return null; // No renderiza nada, solo inicializa
};

import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { container } from '../../di/container';
import type { LoginDto } from '../../application/dto/LoginDto';
import type { RegisterDto } from '../../application/dto/RegisterDto';
import { DomainException } from '../../domain/exceptions/DomainException';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  const login = useCallback(
    async (credentials: LoginDto) => {
      try {
        const loginUseCase = container.getLoginUseCase();
        const { token, user } = await loginUseCase.execute(credentials);
        
        setAuth(token, user);
        toast.success('Login successful');
        return true;
      } catch (error) {
        const message =
          error instanceof DomainException
            ? error.message
            : 'Login failed. Please try again.';
        toast.error(message);
        return false;
      }
    },
    [setAuth]
  );

  const register = useCallback(
    async (data: RegisterDto) => {
      try {
        const registerUseCase = container.getRegisterUseCase();
        await registerUseCase.execute(data);

        // El backend no autologuea en el registro: iniciamos sesión con las mismas credenciales
        const loginUseCase = container.getLoginUseCase();
        const { token, user } = await loginUseCase.execute({
          email: data.email,
          password: data.password,
        });

        setAuth(token, user);
        toast.success('Registration successful');
        return true;
      } catch (error) {
        const message =
          error instanceof DomainException
            ? error.message
            : 'Registration failed. Please try again.';
        toast.error(message);
        return false;
      }
    },
    [setAuth]
  );

  const logout = useCallback(async () => {
    try {
      const logoutUseCase = container.getLogoutUseCase();
      await logoutUseCase.execute();
      clearAuth();
      toast.success('Logged out successfully');
    } catch (error) {
      // Siempre limpiar el estado local, incluso si la API falla
      clearAuth();
      toast.error('Logged out');
    }
  }, [clearAuth]);

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
};

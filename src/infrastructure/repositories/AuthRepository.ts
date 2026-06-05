import type { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';
import type { LoginDto } from '../../application/dto/LoginDto';
import type { LoginResponseDto } from '../../application/dto/LoginResponseDto';
import { httpClient } from '../api/client/httpClient';
import { endpoints } from '../api/endpoints';
import { TokenStorage } from '../storage/TokenStorage';
import { UserMapper } from '../../application/mappers/UserMapper';

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginDto): Promise<{ token: string; user: User }> {
    const response = await httpClient.post<LoginResponseDto>(
      endpoints.auth.login,
      credentials
    );

    // Guardar token
    TokenStorage.setToken(response.token);

    // Convertir a entidad de dominio
    const user = UserMapper.toDomain(response.user);

    return { token: response.token, user };
  }

  async logout(): Promise<void> {
    try {
      await httpClient.post(endpoints.auth.logout);
    } finally {
      // Siempre limpiar token, incluso si la petición falla
      TokenStorage.clearToken();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      if (!TokenStorage.hasToken()) {
        return null;
      }

      const response = await httpClient.get<{
        id: string;
        email: string;
        name: string;
        roles: string[];
      }>(endpoints.auth.me);

      return UserMapper.toDomain(response);
    } catch {
      return null;
    }
  }
}

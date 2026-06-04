import { User } from '../entities/User';
import type { LoginDto } from '../../application/dto/LoginDto';

export interface IAuthRepository {
  login(credentials: LoginDto): Promise<{ token: string; user: User }>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

import { User } from '../entities/User';
import type { LoginDto } from '../../application/dto/LoginDto';
import type { RegisterDto } from '../../application/dto/RegisterDto';

export interface IAuthRepository {
  login(credentials: LoginDto): Promise<{ token: string; user: User }>;
  register(data: RegisterDto): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

import { User } from '../../../domain/entities/User';
import type { LoginDto } from '../../dto/LoginDto';

export interface ILoginUseCase {
  execute(credentials: LoginDto): Promise<{ token: string; user: User }>;
}

import { User } from '../../../domain/entities/User';
import { LoginDto } from '../../dto/LoginDto';

export interface ILoginUseCase {
  execute(credentials: LoginDto): Promise<{ token: string; user: User }>;
}

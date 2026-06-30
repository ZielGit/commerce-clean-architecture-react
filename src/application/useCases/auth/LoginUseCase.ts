import type { ILoginUseCase } from './ILoginUseCase';
import type { IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { User } from '../../../domain/entities/User';
import type { LoginDto } from '../../dto/LoginDto';

export class LoginUseCase implements ILoginUseCase {
  private readonly authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(credentials: LoginDto): Promise<{ token: string; user: User }> {
    return await this.authRepository.login(credentials);
  }
}

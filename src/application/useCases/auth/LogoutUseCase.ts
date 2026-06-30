import type { ILogoutUseCase } from './ILogoutUseCase';
import type { IAuthRepository } from '../../../domain/repositories/IAuthRepository';

export class LogoutUseCase implements ILogoutUseCase {
  private readonly authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(): Promise<void> {
    await this.authRepository.logout();
  }
}

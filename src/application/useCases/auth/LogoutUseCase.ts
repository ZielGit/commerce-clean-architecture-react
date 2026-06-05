import type { ILogoutUseCase } from './ILogoutUseCase';
import type { IAuthRepository } from '../../../domain/repositories/IAuthRepository';

export class LogoutUseCase implements ILogoutUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.logout();
  }
}

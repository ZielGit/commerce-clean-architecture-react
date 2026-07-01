import type { IRegisterUseCase } from './IRegisterUseCase';
import type { IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { User } from '../../../domain/entities/User';
import type { RegisterDto } from '../../dto/RegisterDto';

export class RegisterUseCase implements IRegisterUseCase {
  private readonly authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(data: RegisterDto): Promise<User> {
    return await this.authRepository.register(data);
  }
}

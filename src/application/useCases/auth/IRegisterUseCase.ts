import { User } from '../../../domain/entities/User';
import type { RegisterDto } from '../../dto/RegisterDto';

export interface IRegisterUseCase {
  execute(data: RegisterDto): Promise<User>;
}

import { User } from '../../domain/entities/User';
import type { UserDto } from '../dto/UserDto';

/**
 * Mapper para convertir entre DTOs y Entidades de Dominio
 */
export class UserMapper {
  /**
   * Convierte un UserDto a User
   */
  static toDomain(dto: UserDto): User {
    return new User(
      dto.id,
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.role,
      new Date(dto.createdAt),
      dto.updatedAt ? new Date(dto.updatedAt) : undefined,
    );
  }

  /**
   * Convierte un User a UserDto
   */
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Convierte un array de UserDto a User[]
   */
  static toDomainList(dtos: UserDto[]): User[] {
    return dtos.map((dto) => this.toDomain(dto));
  }

  /**
   * Convierte un array de User a UserDto[]
   */
  static toDtoList(users: User[]): UserDto[] {
    return users.map((user) => this.toDto(user));
  }
}

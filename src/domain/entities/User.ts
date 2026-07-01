import { DomainException } from '../exceptions/DomainException';

/**
 * Entidad User - Representa un usuario autenticado
 */
export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly role: string;
  public readonly createdAt: Date;
  public readonly updatedAt?: Date;

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    createdAt: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.validate();
  }

  private validate(): void {
    if (!this.email || !this.email.includes('@')) {
      throw new DomainException('Invalid email format');
    }

    if (!this.firstName || this.firstName.trim().length === 0) {
      throw new DomainException('User firstName cannot be empty');
    }

    if (!this.lastName || this.lastName.trim().length === 0) {
      throw new DomainException('User lastName cannot be empty');
    }

    if (!this.role || this.role.trim().length === 0) {
      throw new DomainException('User role cannot be empty');
    }
  }

  /**
   * Retorna el nombre completo del usuario
   */
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Verifica si el usuario es administrador
   */
  isAdmin(): boolean {
    return this.role === 'admin';
  }
}

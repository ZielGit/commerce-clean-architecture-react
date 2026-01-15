import { DomainException } from '../exceptions/DomainException';

/**
 * Entidad User - Representa un usuario autenticado
 */
export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly roles: string[];

  constructor(id: string, email: string, name: string, roles: string[]) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.roles = roles;

    this.validate();
  }

  private validate(): void {
    if (!this.email || !this.email.includes('@')) {
      throw new DomainException('Invalid email format');
    }

    if (!this.name || this.name.trim().length === 0) {
      throw new DomainException('User name cannot be empty');
    }
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  /**
   * Verifica si es administrador
   */
  isAdmin(): boolean {
    return this.hasRole('admin');
  }
}

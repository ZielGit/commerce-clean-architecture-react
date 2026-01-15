import { Money } from '../valueObjects/Money';
import { DomainException } from '../exceptions/DomainException';

/**
 * Entidad Product - Representa un producto en el dominio
 * Incluye validaciones de negocio y lógica de dominio
 */
export class Product {
  public readonly id: string;
  public readonly name: string;
  public readonly price: Money;
  public readonly stock: number;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt?: Date;

  constructor(
    id: string,
    name: string,
    price: Money,
    stock: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new DomainException('Product name cannot be empty');
    }

    if (this.name.length > 200) {
      throw new DomainException('Product name cannot exceed 200 characters');
    }

    if (this.stock < 0) {
      throw new DomainException('Product stock cannot be negative');
    }
  }

  /**
   * Factory method para crear un nuevo producto (sin ID)
   */
  static create(name: string, price: Money, stock: number): Product {
    return new Product(
      '', // ID se asigna en el backend
      name,
      price,
      stock,
      true,
      new Date()
    );
  }

  /**
   * Verifica si el producto tiene stock disponible
   */
  hasStock(): boolean {
    return this.stock > 0 && this.isActive;
  }

  /**
   * Verifica si el producto tiene suficiente stock
   */
  hasEnoughStock(quantity: number): boolean {
    return this.stock >= quantity && this.isActive;
  }
}

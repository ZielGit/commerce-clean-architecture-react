import { DomainException } from '../exceptions/DomainException';

/**
 * Value Object Money - Representa dinero inmutable
 * Incluye lógica de formateo y validación
 */
export class Money {
  public readonly amount: number;
  public readonly currency: string;

  constructor(amount: number, currency: string = 'USD') {
    this.amount = amount;
    this.currency = currency;
    this.validate();
  }

  private validate(): void {
    if (this.amount < 0) {
      throw new DomainException('Amount cannot be negative');
    }

    if (!this.currency || this.currency.trim().length === 0) {
      throw new DomainException('Currency is required');
    }

    if (this.currency.length !== 3) {
      throw new DomainException('Currency must be 3 characters (ISO 4217)');
    }
  }

  /**
   * Formatea el dinero según la moneda
   */
  format(): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(this.amount);
  }

  /**
   * Compara dos objetos Money
   */
  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  /**
   * Suma dos Money objects (misma moneda)
   */
  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new DomainException('Cannot add different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  /**
   * Multiplica por una cantidad
   */
  multiply(quantity: number): Money {
    if (quantity < 0) {
      throw new DomainException('Quantity cannot be negative');
    }
    return new Money(this.amount * quantity, this.currency);
  }
}

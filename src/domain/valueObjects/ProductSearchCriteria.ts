import { DomainException } from '../exceptions/DomainException';

/**
 * Value Object para criterios de búsqueda de productos
 * Usado en el patrón Specification
 */
export class ProductSearchCriteria {
  public readonly name?: string;
  public readonly minPrice?: number;
  public readonly maxPrice?: number;
  public readonly onlyInStock?: boolean;
  public readonly onlyActive?: boolean;

  constructor(
    name?: string,
    minPrice?: number,
    maxPrice?: number,
    onlyInStock?: boolean,
    onlyActive?: boolean
  ) {
    this.name = name;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.onlyInStock = onlyInStock;
    this.onlyActive = onlyActive;

    this.validate();
  }

  private validate(): void {
    if (this.minPrice !== undefined && this.minPrice < 0) {
      throw new DomainException('Minimum price cannot be negative');
    }

    if (this.maxPrice !== undefined && this.maxPrice < 0) {
      throw new DomainException('Maximum price cannot be negative');
    }

    if (
      this.minPrice !== undefined &&
      this.maxPrice !== undefined &&
      this.minPrice > this.maxPrice
    ) {
      throw new DomainException('Minimum price cannot be greater than maximum price');
    }
  }

  /**
   * Verifica si hay algún filtro activo
   */
  hasFilters(): boolean {
    return !!(
      this.name ||
      this.minPrice !== undefined ||
      this.maxPrice !== undefined ||
      this.onlyInStock ||
      this.onlyActive
    );
  }

  /**
   * Limpia todos los filtros
   */
  static clear(): ProductSearchCriteria {
    return new ProductSearchCriteria();
  }
}

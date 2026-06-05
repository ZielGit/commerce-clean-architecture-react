import { Product } from '../../domain/entities/Product';
import { Money } from '../../domain/valueObjects/Money';
import { ProductDto } from '../dto/ProductDto';

/**
 * Mapper para convertir entre DTOs y Entidades de Dominio
 */
export class ProductMapper {
  /**
   * Convierte un Product a ProductDto
   */
  static toDto(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price.amount,
      currency: product.price.currency,
      stock: product.stock,
      isActive: product.isActive,
    };
  }

  /**
   * Convierte un ProductDto a Product
   */
  static toDomain(dto: ProductDto): Product {
    return new Product(
      dto.id,
      dto.name,
      new Money(dto.price, dto.currency),
      dto.stock,
      dto.isActive,
      new Date() // createdAt se asigna aquí
    );
  }

  /**
   * Convierte un array de ProductDto a Product[]
   */
  static toDomainList(dtos: ProductDto[]): Product[] {
    return dtos.map((dto) => this.toDomain(dto));
  }

  /**
   * Convierte un array de Product a ProductDto[]
   */
  static toDtoList(products: Product[]): ProductDto[] {
    return products.map((product) => this.toDto(product));
  }
}

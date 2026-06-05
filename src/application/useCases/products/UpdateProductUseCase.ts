import type { IUpdateProductUseCase } from './IUpdateProductUseCase';
import type { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product } from '../../../domain/entities/Product';
import { DomainException } from '../../../domain/exceptions/DomainException';

export class UpdateProductUseCase implements IUpdateProductUseCase {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string, stock: number): Promise<Product> {
    // Validar que el producto existe
    const existingProduct = await this.productRepository.getById(id);
    if (!existingProduct) {
      throw new DomainException('Product not found');
    }

    // Validar stock
    if (stock < 0) {
      throw new DomainException('Stock cannot be negative');
    }

    return await this.productRepository.update(id, { stock });
  }
}

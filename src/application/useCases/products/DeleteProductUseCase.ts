import type { IDeleteProductUseCase } from './IDeleteProductUseCase';
import type { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { DomainException } from '../../../domain/exceptions/DomainException';

export class DeleteProductUseCase implements IDeleteProductUseCase {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string): Promise<void> {
    // Validar que el producto existe
    const existingProduct = await this.productRepository.getById(id);
    if (!existingProduct) {
      throw new DomainException('Product not found');
    }

    await this.productRepository.delete(id);
  }
}

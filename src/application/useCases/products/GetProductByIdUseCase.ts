import type { IGetProductByIdUseCase } from './IGetProductByIdUseCase';
import type { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product } from '../../../domain/entities/Product';

export class GetProductByIdUseCase implements IGetProductByIdUseCase {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string): Promise<Product | null> {
    return await this.productRepository.getById(id);
  }
}

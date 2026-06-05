import type { IGetAllProductsUseCase } from './IGetAllProductsUseCase';
import type { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product } from '../../../domain/entities/Product';

export class GetAllProductsUseCase implements IGetAllProductsUseCase {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(
    page: number = 1,
    pageSize: number = 12
  ): Promise<{
    products: Product[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    return await this.productRepository.getAll(page, pageSize);
  }
}

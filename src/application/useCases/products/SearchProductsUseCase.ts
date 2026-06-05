import type { ISearchProductsUseCase } from './ISearchProductsUseCase';
import type { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product } from '../../../domain/entities/Product';
import { ProductSearchCriteria } from '../../../domain/valueObjects/ProductSearchCriteria';

export class SearchProductsUseCase implements ISearchProductsUseCase {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(criteria: ProductSearchCriteria): Promise<Product[]> {
    return await this.productRepository.search(criteria);
  }
}

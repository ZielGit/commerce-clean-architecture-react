import { Product } from '../../../domain/entities/Product';
import { ProductSearchCriteria } from '../../../domain/valueObjects/ProductSearchCriteria';

export interface ISearchProductsUseCase {
  execute(criteria: ProductSearchCriteria): Promise<Product[]>;
}

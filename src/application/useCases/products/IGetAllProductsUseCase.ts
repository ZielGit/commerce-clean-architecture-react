import { Product } from '../../../domain/entities/Product';

export interface IGetAllProductsUseCase {
  execute(page?: number, pageSize?: number): Promise<{
    products: Product[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>;
}

import { Product } from '../../../domain/entities/Product';

export interface IGetProductByIdUseCase {
  execute(id: string): Promise<Product | null>;
}

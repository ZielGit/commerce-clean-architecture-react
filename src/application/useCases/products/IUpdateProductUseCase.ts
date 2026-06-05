import { Product } from '../../../domain/entities/Product';

export interface IUpdateProductUseCase {
  execute(id: string, stock: number): Promise<Product>;
}

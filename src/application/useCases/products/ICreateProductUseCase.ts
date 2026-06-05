import { Product } from '../../../domain/entities/Product';

export interface ICreateProductUseCase {
  execute(data: {
    name: string;
    price: number;
    currency: string;
    stock: number;
  }): Promise<Product>;
}

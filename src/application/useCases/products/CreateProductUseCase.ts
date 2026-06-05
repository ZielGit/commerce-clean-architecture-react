import type { ICreateProductUseCase } from './ICreateProductUseCase';
import type { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product } from '../../../domain/entities/Product';
import { Money } from '../../../domain/valueObjects/Money';

export class CreateProductUseCase implements ICreateProductUseCase {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(data: {
    name: string;
    price: number;
    currency: string;
    stock: number;
  }): Promise<Product> {
    const money = new Money(data.price, data.currency);
    const product = Product.create(data.name, money, data.stock);

    return await this.productRepository.create(product);
  }
}

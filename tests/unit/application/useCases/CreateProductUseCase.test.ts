import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateProductUseCase } from '../../../../src/application/useCases/products/CreateProductUseCase';
import { IProductRepository } from '../../../../src/domain/repositories/IProductRepository';
import { Product } from '../../../../src/domain/entities/Product';
import { Money } from '../../../../src/domain/valueObjects/Money';

describe('CreateProductUseCase', () => {
  let mockRepository: IProductRepository;
  let useCase: CreateProductUseCase;

  const mockProduct = new Product(
    '1',
    'Laptop',
    new Money(999.99, 'USD'),
    10,
    true,
    new Date()
  );

  beforeEach(() => {
    mockRepository = {
      getAll: vi.fn(),
      getById: vi.fn(),
      create: vi.fn().mockResolvedValue(mockProduct),
      update: vi.fn(),
      delete: vi.fn(),
      search: vi.fn(),
    };

    useCase = new CreateProductUseCase(mockRepository);
  });

  it('should create product successfully', async () => {
    const data = {
      name: 'Laptop',
      price: 999.99,
      currency: 'USD',
      stock: 10,
    };

    const result = await useCase.execute(data);

    expect(result.name).toBe('Laptop');
    expect(mockRepository.create).toHaveBeenCalledOnce();
  });

  it('should throw DomainException for invalid price', async () => {
    const data = {
      name: 'Laptop',
      price: -100,
      currency: 'USD',
      stock: 10,
    };

    await expect(useCase.execute(data)).rejects.toThrow('Amount cannot be negative');
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('should throw DomainException for empty name', async () => {
    const data = {
      name: '',
      price: 100,
      currency: 'USD',
      stock: 10,
    };

    await expect(useCase.execute(data)).rejects.toThrow('Product name cannot be empty');
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});

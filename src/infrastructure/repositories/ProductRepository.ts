import type { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { ProductSearchCriteria } from '../../domain/valueObjects/ProductSearchCriteria';
import { httpClient } from '../api/client/httpClient';
import { endpoints } from '../api/endpoints';
import { ProductMapper } from '../../application/mappers/ProductMapper';
import type { ProductDto } from '../../application/dto/ProductDto';
import type { CreateProductDto } from '../../application/dto/CreateProductDto';
import type { UpdateProductDto } from '../../application/dto/UpdateProductDto';

export class ProductRepository implements IProductRepository {
  async getAll(
    page: number = 1,
    pageSize: number = 12
  ): Promise<{
    products: Product[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const endpoint = `${endpoints.products.getAll}?page=${page}&pageSize=${pageSize}`;
    const response = await httpClient.get<{
      data: ProductDto[];
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    }>(endpoint);

    return {
      products: ProductMapper.toDomainList(response.data),
      total: response.total,
      page: response.page,
      pageSize: response.pageSize,
      totalPages: response.totalPages,
    };
  }

  async getById(id: string): Promise<Product | null> {
    try {
      const dto = await httpClient.get<ProductDto>(endpoints.products.getById(id));
      return ProductMapper.toDomain(dto);
    } catch (error) {
      // Si es 404, retornar null
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async create(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Product> {
    const createDto: CreateProductDto = {
      name: product.name,
      price: product.price.amount,
      currency: product.price.currency,
      stock: product.stock,
    };

    const dto = await httpClient.post<ProductDto>(
      endpoints.products.create,
      createDto
    );

    return ProductMapper.toDomain(dto);
  }

  async update(id: string, data: { stock: number }): Promise<Product> {
    const updateDto: UpdateProductDto = {
      stock: data.stock,
    };

    const dto = await httpClient.put<ProductDto>(
      endpoints.products.update(id),
      updateDto
    );

    return ProductMapper.toDomain(dto);
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(endpoints.products.delete(id));
  }

  async search(criteria: ProductSearchCriteria): Promise<Product[]> {
    const params = new URLSearchParams();

    if (criteria.name) params.append('name', criteria.name);
    if (criteria.minPrice !== undefined)
      params.append('minPrice', criteria.minPrice.toString());
    if (criteria.maxPrice !== undefined)
      params.append('maxPrice', criteria.maxPrice.toString());
    if (criteria.onlyInStock) params.append('onlyInStock', 'true');
    if (criteria.onlyActive) params.append('onlyActive', 'true');

    const endpoint = `${endpoints.products.search}?${params.toString()}`;
    const dtos = await httpClient.get<ProductDto[]>(endpoint);

    return ProductMapper.toDomainList(dtos);
  }
}

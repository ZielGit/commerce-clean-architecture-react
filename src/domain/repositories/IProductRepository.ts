import { Product } from '../entities/Product';
import { ProductSearchCriteria } from '../valueObjects/ProductSearchCriteria';

/**
 * Interfaz del repositorio de productos
 * Define el contrato para acceso a datos
 */
export interface IProductRepository {
  /**
   * Obtiene todos los productos con paginación
   */
  getAll(page?: number, pageSize?: number): Promise<{
    products: Product[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>;

  /**
   * Obtiene un producto por su ID
   */
  getById(id: string): Promise<Product | null>;

  /**
   * Crea un nuevo producto
   */
  create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;

  /**
   * Actualiza un producto existente
   */
  update(id: string, data: { stock: number }): Promise<Product>;

  /**
   * Elimina un producto
   */
  delete(id: string): Promise<void>;

  /**
   * Busca productos según criterios (Specification Pattern)
   */
  search(criteria: ProductSearchCriteria): Promise<Product[]>;
}

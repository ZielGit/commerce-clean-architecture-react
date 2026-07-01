import { ProductRepository } from '../infrastructure/repositories/ProductRepository';
import { AuthRepository } from '../infrastructure/repositories/AuthRepository';

import { GetAllProductsUseCase } from '../application/useCases/products/GetAllProductsUseCase';
import { GetProductByIdUseCase } from '../application/useCases/products/GetProductByIdUseCase';
import { CreateProductUseCase } from '../application/useCases/products/CreateProductUseCase';
import { UpdateProductUseCase } from '../application/useCases/products/UpdateProductUseCase';
import { DeleteProductUseCase } from '../application/useCases/products/DeleteProductUseCase';
import { SearchProductsUseCase } from '../application/useCases/products/SearchProductsUseCase';
import { LoginUseCase } from '../application/useCases/auth/LoginUseCase';
import { RegisterUseCase } from '../application/useCases/auth/RegisterUseCase';
import { LogoutUseCase } from '../application/useCases/auth/LogoutUseCase';

/**
 * Contenedor de Inversión de Dependencias
 * Gestiona la creación y ciclo de vida de las dependencias
 */
class DIContainer {
  // Repositories (Singleton)
  private productRepository: ProductRepository;
  private authRepository: AuthRepository;

  constructor() {
    // Inicializar repositorios
    this.productRepository = new ProductRepository();
    this.authRepository = new AuthRepository();
  }

  // ========================================
  // Product Use Cases
  // ========================================

  getGetAllProductsUseCase(): GetAllProductsUseCase {
    return new GetAllProductsUseCase(this.productRepository);
  }

  getGetProductByIdUseCase(): GetProductByIdUseCase {
    return new GetProductByIdUseCase(this.productRepository);
  }

  getCreateProductUseCase(): CreateProductUseCase {
    return new CreateProductUseCase(this.productRepository);
  }

  getUpdateProductUseCase(): UpdateProductUseCase {
    return new UpdateProductUseCase(this.productRepository);
  }

  getDeleteProductUseCase(): DeleteProductUseCase {
    return new DeleteProductUseCase(this.productRepository);
  }

  getSearchProductsUseCase(): SearchProductsUseCase {
    return new SearchProductsUseCase(this.productRepository);
  }

  // ========================================
  // Auth Use Cases
  // ========================================

  getLoginUseCase(): LoginUseCase {
    return new LoginUseCase(this.authRepository);
  }

  getRegisterUseCase(): RegisterUseCase {
    return new RegisterUseCase(this.authRepository);
  }

  getLogoutUseCase(): LogoutUseCase {
    return new LogoutUseCase(this.authRepository);
  }

  // ========================================
  // Repositories (para casos avanzados)
  // ========================================

  getProductRepository(): ProductRepository {
    return this.productRepository;
  }

  getAuthRepository(): AuthRepository {
    return this.authRepository;
  }
}

// Exportar instancia única (Singleton)
export const container = new DIContainer();

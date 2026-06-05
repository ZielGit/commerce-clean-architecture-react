/**
 * DTO para representar un producto
 * Debe coincidir exactamente con el backend
 */
export interface ProductDto {
  id: string;
  name: string;
  price: number;
  currency: string;
  stock: number;
  isActive: boolean;
}

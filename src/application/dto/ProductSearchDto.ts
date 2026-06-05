export interface ProductSearchDto {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  onlyInStock?: boolean;
  onlyActive?: boolean;
}

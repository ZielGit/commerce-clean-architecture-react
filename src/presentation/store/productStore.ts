import { create } from 'zustand';
import { Product } from '../../domain/entities/Product';
import { ProductSearchCriteria } from '../../domain/valueObjects/ProductSearchCriteria';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  searchCriteria: ProductSearchCriteria;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };

  // Actions
  setProducts: (products: Product[]) => void;
  setCurrentProduct: (product: Product | null) => void;
  setSearchCriteria: (criteria: ProductSearchCriteria) => void;
  setPagination: (pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }) => void;
  clearFilters: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  currentProduct: null,
  searchCriteria: ProductSearchCriteria.clear(),
  pagination: {
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 0,
  },

  setProducts: (products) => set({ products }),
  setCurrentProduct: (currentProduct) => set({ currentProduct }),
  setSearchCriteria: (searchCriteria) => set({ searchCriteria }),
  setPagination: (pagination) => set({ pagination }),
  clearFilters: () => set({ searchCriteria: ProductSearchCriteria.clear() }),
}));

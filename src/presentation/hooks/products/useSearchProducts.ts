import { useState } from 'react';
import { Product } from '../../../domain/entities/Product';
import { ProductSearchCriteria } from '../../../domain/valueObjects/ProductSearchCriteria';
import { useProductStore } from '../../store/productStore';
import { container } from '../../../di/container';
import { DomainException } from '../../../domain/exceptions/DomainException';
import toast from 'react-hot-toast';

export const useSearchProducts = () => {
  const { searchCriteria, setSearchCriteria } = useProductStore();
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (criteria: ProductSearchCriteria) => {
    try {
      setLoading(true);
      setError(null);
      setSearchCriteria(criteria);

      const useCase = container.getSearchProductsUseCase();
      const products = await useCase.execute(criteria);

      setResults(products);
      return products;
    } catch (err) {
      const message =
        err instanceof DomainException
          ? err.message
          : 'Failed to search products';
      setError(message);
      toast.error(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    const cleared = ProductSearchCriteria.clear();
    setSearchCriteria(cleared);
    search(cleared);
  };

  return {
    searchCriteria,
    results,
    loading,
    error,
    search,
    clearFilters,
  };
};

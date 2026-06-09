import { useState, useEffect, useCallback } from 'react';
import { useProductStore } from '../../store/productStore';
import { container } from '../../../di/container';
import { DomainException } from '../../../domain/exceptions/DomainException';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const {
    products,
    pagination,
    setProducts,
    setPagination,
  } = useProductStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(
    async (page: number = 1, pageSize: number = 12) => {
      try {
        setLoading(true);
        setError(null);

        const useCase = container.getGetAllProductsUseCase();
        const result = await useCase.execute(page, pageSize);

        setProducts(result.products);
        setPagination({
          page: result.page,
          pageSize: result.pageSize,
          total: result.total,
          totalPages: result.totalPages,
        });
      } catch (err) {
        const message =
          err instanceof DomainException
            ? err.message
            : 'Failed to fetch products';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [setProducts, setPagination]
  );

  useEffect(() => {
    fetchProducts(pagination.page, pagination.pageSize);
  }, []);

  const changePage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= pagination.totalPages) {
        fetchProducts(newPage, pagination.pageSize);
      }
    },
    [fetchProducts, pagination]
  );

  const refresh = useCallback(() => {
    fetchProducts(pagination.page, pagination.pageSize);
  }, [fetchProducts, pagination]);

  return {
    products,
    pagination,
    loading,
    error,
    changePage,
    refresh,
  };
};

import { useState, useEffect } from 'react';
import { Product } from '../../../domain/entities/Product';
import { container } from '../../../di/container';
import { DomainException } from '../../../domain/exceptions/DomainException';
import toast from 'react-hot-toast';

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const useCase = container.getGetProductByIdUseCase();
        const result = await useCase.execute(id);

        if (!result) {
          setError('Product not found');
          toast.error('Product not found');
        } else {
          setProduct(result);
        }
      } catch (err) {
        const message =
          err instanceof DomainException
            ? err.message
            : 'Failed to fetch product';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

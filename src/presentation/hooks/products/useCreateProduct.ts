import { useState } from 'react';
import { container } from '../../../di/container';
import { DomainException } from '../../../domain/exceptions/DomainException';
import toast from 'react-hot-toast';

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (data: {
    name: string;
    price: number;
    currency: string;
    stock: number;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const useCase = container.getCreateProductUseCase();
      const product = await useCase.execute(data);

      toast.success('Product created successfully');
      return product;
    } catch (err) {
      const message =
        err instanceof DomainException
          ? err.message
          : 'Failed to create product';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
};

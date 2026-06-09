import { useState } from 'react';
import { container } from '../../../di/container';
import { DomainException } from '../../../domain/exceptions/DomainException';
import toast from 'react-hot-toast';

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (id: string, stock: number) => {
    try {
      setLoading(true);
      setError(null);

      const useCase = container.getUpdateProductUseCase();
      const product = await useCase.execute(id, stock);

      toast.success('Product updated successfully');
      return product;
    } catch (err) {
      const message =
        err instanceof DomainException
          ? err.message
          : 'Failed to update product';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
};

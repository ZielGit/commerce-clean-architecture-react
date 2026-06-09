import { useState } from 'react';
import { container } from '../../../di/container';
import { DomainException } from '../../../domain/exceptions/DomainException';
import toast from 'react-hot-toast';

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const useCase = container.getDeleteProductUseCase();
      await useCase.execute(id);

      toast.success('Product deleted successfully');
      return true;
    } catch (err) {
      const message =
        err instanceof DomainException
          ? err.message
          : 'Failed to delete product';
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading, error };
};

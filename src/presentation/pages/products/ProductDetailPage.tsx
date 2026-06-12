import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useProduct } from '../../hooks/products/useProduct';
import { useDeleteProduct } from '../../hooks/products/useDeleteProduct';
import { Loading } from '../../components/common/Loading/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage/ErrorMessage';
import { Button } from '../../components/common/Button/Button';
import { Card } from '../../components/common/Card/Card';
import { Modal } from '../../components/common/Modal/Modal';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { product, loading, error } = useProduct(id!);
  const { deleteProduct, loading: deleting } = useDeleteProduct();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteConfirm = async () => {
    const success = await deleteProduct(id!);
    if (success) navigate('/products');
  };

  if (loading) return <Loading text={t('common.loading')} />;
  if (error || !product) return (
    <ErrorMessage
      message={error || t('products.notFound')}
      onRetry={() => navigate('/products')}
    />
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        ← {t('common.back')}
      </button>

      <Card padding="lg">
        {/* Status Badge */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            product.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.isActive ? t('products.active') : t('products.inactive')}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500">{t('products.price')}</p>
            <p className="text-2xl font-semibold text-blue-600">
              {product.price.format()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('products.stock')}</p>
            <p className={`text-2xl font-semibold ${
              product.stock === 0 ? 'text-red-500' : 'text-gray-900'
            }`}>
              {product.stock}
              {product.stock === 0 && (
                <span className="ml-2 text-sm font-normal text-red-500">
                  {t('products.outOfStock')}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={() => navigate(`/products/${id}/edit`)}>
            {t('products.edit')}
          </Button>
          <Button variant="danger" onClick={() => setDeleteModalOpen(true)}>
            {t('products.delete')}
          </Button>
        </div>
      </Card>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title={t('products.deleteConfirmTitle')}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              variant="danger"
              loading={deleting}
              onClick={handleDeleteConfirm}
            >
              {t('common.delete')}
            </Button>
          </div>
        }
      >
        <p className="text-gray-600">{t('products.deleteConfirmMessage')}</p>
      </Modal>
    </div>
  );
};

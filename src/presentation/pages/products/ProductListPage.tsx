import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../../hooks/products/useProducts';
import { useDeleteProduct } from '../../hooks/products/useDeleteProduct';
import { ProductCard } from '../../components/products/ProductCard/ProductCard';
import { ProductFilters } from '../../components/products/ProductFilters/ProductFilters';
import { Loading } from '../../components/common/Loading/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage/ErrorMessage';
import { Pagination } from '../../components/common/Pagination/Pagination';
import { Button } from '../../components/common/Button/Button';
import { Modal } from '../../components/common/Modal/Modal';

export const ProductListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { products, pagination, loading, error, changePage, refresh } = useProducts();
  const { deleteProduct, loading: deleting } = useDeleteProduct();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleEdit = (id: string) => navigate(`/products/${id}/edit`);
  const handleView = (id: string) => navigate(`/products/${id}`);

  const handleDeleteClick = (id: string) => {
    setSelectedProductId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProductId) return;
    const success = await deleteProduct(selectedProductId);
    if (success) {
      setDeleteModalOpen(false);
      setSelectedProductId(null);
      refresh();
    }
  };

  if (loading) return <Loading text={t('common.loading')} />;
  if (error) return <ErrorMessage message={error} onRetry={refresh} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('products.title')}</h1>
        <Button onClick={() => navigate('/products/create')}>
          + {t('products.create')}
        </Button>
      </div>

      {/* Filters */}
      <ProductFilters onFilter={refresh} />

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">{t('products.empty')}</p>
          <Button
            className="mt-4"
            onClick={() => navigate('/products/create')}
          >
            {t('products.create')}
          </Button>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={changePage}
            />
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title={t('products.deleteConfirmTitle')}
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteModalOpen(false)}
            >
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

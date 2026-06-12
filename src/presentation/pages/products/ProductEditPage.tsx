import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useProduct } from '../../hooks/products/useProduct';
import { useUpdateProduct } from '../../hooks/products/useUpdateProduct';
import { ProductForm } from '../../components/products/ProductForm/ProductForm';
import { Loading } from '../../components/common/Loading/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage/ErrorMessage';
import { Card } from '../../components/common/Card/Card';

export const ProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { product, loading: fetching, error } = useProduct(id!);
  const { updateProduct, loading: updating } = useUpdateProduct();

  const handleSubmit = async (data: {
    name: string;
    price: number;
    currency: string;
    stock: number;
  }) => {
    const updated = await updateProduct(id!, data.stock);
    if (updated) navigate(`/products/${id}`);
  };

  if (fetching) return <Loading text={t('common.loading')} />;
  if (error || !product) return <ErrorMessage message={error || t('products.notFound')} />;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(`/products/${id}`)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        ← {t('common.back')}
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t('products.edit')}: {product.name}
      </h1>

      <Card padding="lg">
        <ProductForm
          initialValues={{
            name: product.name,
            price: product.price.amount,
            currency: product.price.currency,
            stock: product.stock,
          }}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/products/${id}`)}
          loading={updating}
          submitLabel={t('common.save')}
          editMode
        />
      </Card>
    </div>
  );
};

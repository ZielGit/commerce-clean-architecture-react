import React from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useCreateProduct } from '../../hooks/products/useCreateProduct';
import { ProductForm } from '../../components/products/ProductForm/ProductForm';
import { Card } from '../../components/common/Card/Card';

export const ProductCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { createProduct, loading } = useCreateProduct();

  const handleSubmit = async (data: {
    name: string;
    price: number;
    currency: string;
    stock: number;
  }) => {
    const product = await createProduct(data);
    if (product) navigate('/products');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/products')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        ← {t('common.back')}
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t('products.create')}
      </h1>

      <Card padding="lg">
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/products')}
          loading={loading}
          submitLabel={t('products.create')}
        />
      </Card>
    </div>
  );
};

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../../../../domain/entities/Product';
import { Button } from '../../common/Button/Button';
import { Card } from '../../common/Card/Card';

interface ProductCardProps {
  product: Product;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onView,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Card hoverable className="product-card flex flex-col justify-between h-full">
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            product.isActive
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {product.isActive ? t('products.active') : t('products.inactive')}
        </span>

        {product.stock === 0 && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-700">
            {t('products.outOfStock')}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-900 truncate mb-1">
          {product.name}
        </h3>

        <p className="text-xl font-bold text-blue-600 mb-2">
          {product.price.format()}
        </p>

        <p className="text-sm text-gray-500">
          {t('products.stock')}: {' '}
          <span className={`font-medium ${
            product.stock === 0 ? 'text-red-500' : 'text-gray-700'
          }`}>
            {product.stock}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onView(product.id)}
          className="flex-1"
        >
          {t('common.view')}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEdit(product.id)}
          className="flex-1"
        >
          {t('common.edit')}
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(product.id)}
          className="flex-1"
        >
          {t('common.delete')}
        </Button>
      </div>
    </Card>
  );
};

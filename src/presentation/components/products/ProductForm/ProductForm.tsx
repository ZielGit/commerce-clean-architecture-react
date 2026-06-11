import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';

const CURRENCIES = ['USD', 'EUR', 'PEN', 'GBP', 'JPY'];

const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(200, 'Name cannot exceed 200 characters'),
  price: z
    .number({ error: 'Price must be a number' })
    .positive('Price must be greater than 0'),
  currency: z.string().length(3, 'Currency must be 3 characters'),
  stock: z
    .number({ error: 'Stock must be a number' })
    .int('Stock must be a whole number')
    .nonnegative('Stock cannot be negative'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  submitLabel?: string;
  editMode?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = 'Save',
  editMode = false,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialValues?.name || '',
      price: initialValues?.price,
      currency: initialValues?.currency || 'USD',
      stock: initialValues?.stock,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Name Field */}
      <Input
        label={t('products.name')}
        type="text"
        placeholder="e.g. Laptop Gaming"
        error={errors.name?.message}
        required
        disabled={editMode} // En edición solo se puede cambiar stock
        {...register('name')}
      />

      {/* Price Field */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Input
            label={t('products.price')}
            type="number"
            placeholder="0.00"
            error={errors.price?.message}
            required
            disabled={editMode}
            {...register('price', { valueAsNumber: true })}
          />
        </div>

        <div className="w-28">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('products.currency')}
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            disabled={editMode}
            {...register('currency')}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.currency && (
            <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>
          )}
        </div>
      </div>

      {/* Stock Field */}
      <Input
        label={t('products.stock')}
        type="number"
        placeholder="0"
        error={errors.stock?.message}
        required
        {...register('stock', { valueAsNumber: true })}
      />

      {editMode && (
        <p className="text-sm text-gray-500 mb-4 bg-blue-50 p-3 rounded-lg">
          ℹ️ {t('products.editStockOnly')}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <Button type="submit" loading={loading} className="flex-1">
          {submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  );
};

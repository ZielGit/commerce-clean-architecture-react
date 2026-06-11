import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchProducts } from '../../../hooks/products/useSearchProducts';
import { ProductSearchCriteria } from '../../../../domain/valueObjects/ProductSearchCriteria';
import { Button } from '../../common/Button/Button';

interface ProductFiltersProps {
  onFilter: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilter }) => {
  const { t } = useTranslation();
  const { search, clearFilters, loading } = useSearchProducts();

  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyActive, setOnlyActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = name || minPrice || maxPrice || onlyInStock || onlyActive;

  const handleSearch = async () => {
    const criteria = new ProductSearchCriteria(
      name || undefined,
      minPrice ? parseFloat(minPrice) : undefined,
      maxPrice ? parseFloat(maxPrice) : undefined,
      onlyInStock || undefined,
      onlyActive || undefined
    );
    await search(criteria);
    onFilter();
  };

  const handleClear = () => {
    setName('');
    setMinPrice('');
    setMaxPrice('');
    setOnlyInStock(false);
    setOnlyActive(false);
    clearFilters();
    onFilter();
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      {/* Search Bar + Toggle */}
      <div className="flex gap-2 p-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('products.searchPlaceholder')}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <Button onClick={handleSearch} loading={loading}>
          {t('common.search')}
        </Button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
            hasActiveFilters
              ? 'border-blue-500 text-blue-600 bg-blue-50'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {t('products.filters')}
          {hasActiveFilters && (
            <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
              {[name, minPrice, maxPrice, onlyInStock, onlyActive].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('products.minPrice')}
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('products.maxPrice')}
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="9999"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="text-sm text-gray-700">{t('products.onlyInStock')}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyActive}
                onChange={(e) => setOnlyActive(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="text-sm text-gray-700">{t('products.onlyActive')}</span>
            </label>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleClear}
                className="text-sm text-gray-500 hover:text-red-600 underline"
              >
                {t('products.clearFilters')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

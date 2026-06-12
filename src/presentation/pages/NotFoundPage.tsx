import React from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-xl text-gray-600">{t('common.pageNotFound')}</p>
      <button
        onClick={() => navigate('/products')}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {t('common.backToHome')}
      </button>
    </div>
  );
};

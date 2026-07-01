import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';

export const MainLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useAuthStore();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <span
                className="text-xl font-bold text-blue-600 cursor-pointer"
                onClick={() => navigate('/products')}
              >
                Commerce
              </span>

              {/* Navigation Links */}
              <div className="hidden sm:flex gap-4">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  {t('products.title')}
                </NavLink>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1"
              >
                {i18n.language === 'en' ? '🇪🇸 ES' : '🇺🇸 EN'}
              </button>

              {/* User Info */}
              {user && (
                <span className="hidden sm:block text-sm text-gray-600">
                  {user.fullName}
                </span>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                {t('auth.logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import { LocalStorageService } from '../../infrastructure/storage/LocalStorageService';

const LANGUAGE_KEY = 'app_language';

const savedLanguage = LocalStorageService.get<string>(LANGUAGE_KEY) || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React ya escapa por defecto
  },
});

// Persistir el idioma cuando cambia
i18n.on('languageChanged', (lng) => {
  LocalStorageService.set(LANGUAGE_KEY, lng);
  document.documentElement.lang = lng;
});

export default i18n;

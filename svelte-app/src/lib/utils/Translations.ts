import i18n from '@sveltekit-i18n/base';
import parser from '@sveltekit-i18n/parser-default';

const config = {
  parser: parser(),
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('@translations/en/common.json')).default
    },
    {
      locale: 'en',
      key: 'dashboard',
      loader: async () => (await import('@translations/en/dashboard.json')).default
    },
    {
      locale: 'en',
      key: 'email',
      loader: async () => (await import('@translations/en/email.json')).default
    },
    {
      locale: 'en',
      key: 'error',
      loader: async () => (await import('@translations/en/error.json')).default
    },
    {
      locale: 'en',
      key: 'header',
      loader: async () => (await import('@translations/en/header.json')).default
    },
    {
      locale: 'en',
      key: 'meter',
      loader: async () => (await import('@translations/en/meter.json')).default
    },
    {
      locale: 'en',
      key: 'navigation',
      loader: async () => (await import('@translations/en/navigation.json')).default
    },
    {
      locale: 'en',
      key: 'session',
      loader: async () => (await import('@translations/en/session.json')).default
    },

    {
      locale: 'es',
      key: 'common',
      loader: async () => (await import('@translations/es/common.json')).default
    },
    {
      locale: 'es',
      key: 'dashboard',
      loader: async () => (await import('@translations/es/dashboard.json')).default
    },
    {
      locale: 'es',
      key: 'email',
      loader: async () => (await import('@translations/es/email.json')).default
    },
    {
      locale: 'es',
      key: 'error',
      loader: async () => (await import('@translations/es/error.json')).default
    },
    {
      locale: 'es',
      key: 'header',
      loader: async () => (await import('@translations/es/header.json')).default
    },
    {
      locale: 'es',
      key: 'meter',
      loader: async () => (await import('@translations/es/meter.json')).default
    },
    {
      locale: 'es',
      key: 'navigation',
      loader: async () => (await import('@translations/es/navigation.json')).default
    },
    {
      locale: 'es',
      key: 'session',
      loader: async () => (await import('@translations/es/session.json')).default
    }
  ]
};

export const { t, locale, loadTranslations } = new i18n(config);

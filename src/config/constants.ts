/**
 * Централизованные константы приложения
 * Все значения берутся из переменных окружения с fallback на значения по умолчанию
 */

export const APP_CONFIG = {
  // URL приложения и API
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://llfsite.vercel.app',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'КФМФ - Казахстанская Федерация Мини-Футбола',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://1sportkz.com',

  // Контактная информация
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'kmff.kz@gmail.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+77753130805',
  },

  // Ссылки на мобильные приложения
  apps: {
    ios: process.env.NEXT_PUBLIC_IOS_APP_URL || 'https://apps.apple.com/kz/app/minifootball/id6449434914',
    android: process.env.NEXT_PUBLIC_ANDROID_APP_URL || 'https://play.google.com/store/apps/details?id=kz.llf.onesportone',
  },
} as const;

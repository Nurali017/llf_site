import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'КФМФ - Казахстанская Федерация Мини-Футбола',
  description: 'Официальная платформа Казахстанской Федерации Мини-Футбола. Результаты матчей, турнирные таблицы, статистика игроков и последние новости мини-футбола Казахстана.',
  keywords: [
    'мини-футбол Казахстан',
    'КФМФ',
    'футзал',
    'турнирная таблица',
    'результаты матчей',
    'казахстанский футбол',
    'лига мини-футбола',
  ],
  authors: [{ name: 'КФМФ' }],
  creator: 'КФМФ',
  publisher: 'Казахстанская Федерация Мини-Футбола',

  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://yourdomain.com/',
    siteName: 'КФМФ',
    title: 'КФМФ - Казахстанская Федерация Мини-Футбола',
    description: 'Результаты матчей, турнирные таблицы и статистика мини-футбола Казахстана',
    images: [
      {
        url: 'https://yourdomain.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'КФМФ - Мини-футбол Казахстана',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'КФМФ - Мини-футбол Казахстана',
    description: 'Результаты матчей, турнирные таблицы и статистика',
    images: ['https://yourdomain.com/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  // Редирект на Астану по умолчанию
  redirect('/astana');
}

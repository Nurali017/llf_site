import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { APP_CONFIG } from '@/config/constants';
import { GoogleAnalytics, YandexMetrika } from '@/components/Analytics';

// Brutally Minimal Typography System
// Manrope: Geometric display font with full Kazakh Cyrillic support
const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.siteUrl),
  title: {
    default: "KMFF - Казахстанская Федерация Мини-Футбола",
    template: "%s | KMFF"
  },
  description: "Официальная платформа КФМФ. Результаты матчей, турнирные таблицы, новости, статистика игроков и команд мини-футбола Казахстана.",
  keywords: ["мини-футбол Казахстан", "КФМФ", "KMFF", "футзал", "результаты матчей", "турнирная таблица", "футбол Алматы", "любительский футбол"],
  authors: [{ name: "KMFF" }],
  creator: "KMFF",
  publisher: "KMFF",
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
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: APP_CONFIG.siteUrl,
    title: "KMFF - Казахстанская Федерация Мини-Футбола",
    description: "Результаты матчей, турнирные таблицы, новости и статистика мини-футбола Казахстана",
    siteName: "KMFF",
    images: [
      {
        url: "/kmff-logo.jpg",
        width: 1200,
        height: 630,
        alt: "KMFF Logo"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KMFF - Казахстанская Федерация Мини-Футбола",
    description: "Результаты матчей, турнирные таблицы, новости и статистика",
    images: ["/kmff-logo.jpg"],
  },
  icons: {
    icon: "/kmff-logo.jpg",
    shortcut: "/kmff-logo.jpg",
    apple: "/kmff-logo.jpg",
  },
  verification: {
    google: "_Ffqhw-M5ya1w85K9tZxqXd3zJrC1hvFNZ_Foxq_-Nw",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization Schema for SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: 'Казахстанская Федерация Мини-Футбола',
    alternateName: 'КФМФ',
    url: APP_CONFIG.siteUrl,
    logo: `${APP_CONFIG.siteUrl}/kmff-logo.jpg`,
    description: 'Официальная платформа Казахстанской Федерации Мини-Футбола. Результаты матчей, турнирные таблицы и статистика.',
    foundingDate: '2010',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KZ',
    },
    sameAs: [],
    sport: 'Futsal',
  };

  return (
    <html lang="ru">
      <head>
        {/* Preconnect for better performance */}
        <link rel="preconnect" href="https://1sportkz.com" />
        <link rel="dns-prefetch" href="https://1sportkz.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${jetBrainsMono.variable} antialiased font-display`}
      >
        <GoogleAnalytics />
        <YandexMetrika />
        <ErrorBoundary>
          <OrganizationProvider>
            {children}
          </OrganizationProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

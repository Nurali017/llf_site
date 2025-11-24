import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import { ErrorBoundary } from '@/components/ErrorBoundary';

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "KMFF - Казахстанская Лига Любительского Футбола",
  description: "Результаты матчей, турнирные таблицы, новости и статистика KMFF.",
  icons: {
    icon: "/kmff-logo.jpg",
    shortcut: "/kmff-logo.jpg",
    apple: "/kmff-logo.jpg",
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
    url: 'https://yourdomain.com',
    logo: 'https://yourdomain.com/kmff-logo.jpg',
    description: 'Официальная платформа Казахстанской Федерации Мини-Футбола. Результаты матчей, турнирные таблицы и статистика.',
    foundingDate: '2010',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KZ',
    },
    // TODO: Add real social media links
    sameAs: [
      // 'https://facebook.com/kmff',
      // 'https://instagram.com/kmff_kz',
      // 'https://vk.com/kmff',
    ],
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
        className={`${manrope.variable} ${montserrat.variable} antialiased font-sans`}
      >
        <ErrorBoundary>
          <OrganizationProvider>
            {children}
          </OrganizationProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

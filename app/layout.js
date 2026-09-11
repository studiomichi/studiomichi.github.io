import './globals.css';
import { Suspense } from 'react';
import PageFrame from './components/PageFrame';
import GoogleAnalytics from './components/GoogleAnalytics';

export const metadata = {
  metadataBase: new URL('https://studiomichi.co'),
  title: 'Studio Michi - Seattle Floral Studio',
  description: 'Studio Michi is a Seattle floral studio creating custom bouquets and arrangements for everyday moments.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Studio Michi - Seattle Floral Studio',
    description: 'Studio Michi is a Seattle floral studio creating custom bouquets and arrangements for everyday moments.',
    url: 'https://studiomichi.co',
    siteName: 'Studio Michi',
    type: 'website',
    images: ['/images/dahlia-meadow-arrangement.jpg'],
  },
};

export default function RootLayout({ children }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Studio Michi',
    url: 'https://studiomichi.co',
    description: 'Studio Michi is a Seattle floral studio creating custom bouquets and arrangements for everyday moments.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://studiomichi.co/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Florist',
    name: 'Studio Michi',
    description: 'Studio Michi is a Seattle floral studio creating custom bouquets and arrangements for everyday moments.',
    url: 'https://studiomichi.co',
    image: 'https://studiomichi.co/images/dahlia-meadow-arrangement.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    areaServed: 'Seattle, Washington',
    sameAs: [
      'https://www.instagram.com/studiomichico',
      'https://www.pinterest.com/studiomichi',
    ],
  };

  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema, businessSchema]),
          }}
        />
        <PageFrame>{children}</PageFrame>
      </body>
    </html>
  );
}

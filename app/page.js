import HomePageClient from './HomePageClient';

export const metadata = {
  title: 'Studio Michi - Seattle Floral Studio',
  description: 'Studio Michi is a Seattle floral studio creating custom bouquets and arrangements for everyday moments.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomePageClient />;
}

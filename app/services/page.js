import ShopFlowersPageClient from '../ShopFlowersPageClient';

export const metadata = {
  title: 'Flower Bouquets & Arrangements - Studio Michi',
  description: 'Explore custom bouquets and floral arrangements from Studio Michi, designed for gifting, events, and everyday moments in Seattle.',
  alternates: { canonical: '/shop-flowers' },
};

export default function ShopFlowersPage() {
  return <ShopFlowersPageClient />;
}

import ShopFlowersPageClient from '../ShopFlowersPageClient';

export const metadata = {
  title: 'Shop Flower Bouquets & Arrangements - Seattle Flower Delivery - Studio Michi',
  description: 'Shop local flower bouquets and floral arrangements designed for gifting, events, and everyday moments in Seattle. Flower delivery and pick-up available.',
  alternates: { canonical: '/shop-flowers/' },
};

export default function ShopFlowersPage() {
  return <ShopFlowersPageClient />;
}

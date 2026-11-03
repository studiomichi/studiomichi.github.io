import EventsPageClient from '../EventsPageClient';

export const metadata = {
  title: 'Seattle Weddings, Gatherings & Intimate Events - Studio Michi',
  description: '',
  alternates: { canonical: '/seattle-events/' },
};

export default function ShopFlowersPage() {
  return <EventsPageClient />;
}
import EventsPageClient from '../EventsPageClient';

export const metadata = {
  title: 'Seattle weddings, gatherings, and intimate events - Studio Michi',
  description: '',
  alternates: { canonical: '/seattle-events/' },
};

export default function ShopFlowersPage() {
  return <EventsPageClient />;
}
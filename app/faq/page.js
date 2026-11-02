import FaqPageClient from '../FaqPageClient';

export const metadata = {
  title: 'Frequently Asked Questions - Studio Michi',
  description: 'Find answers about flower orders, event florals, and handmade ceramics from Studio Michi.',
  alternates: { canonical: '/faq/' },
};

export default function FaqPage() {
  return <FaqPageClient />;
}

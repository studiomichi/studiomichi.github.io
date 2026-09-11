import FaqPageClient from '../FaqPageClient';

export const metadata = {
  title: 'Frequently Asked Questions - Studio Michi',
  description: 'Find answers about ordering flowers, delivery, and flower care.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return <FaqPageClient />;
}

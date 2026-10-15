import FaqPageClient from '../FaqPageClient';

export const metadata = {
  title: 'Frequently Asked Questions - Studio Michi',
  description: 'Find answers about ordering flowers, flower delivery in Seattle, and flower care.',
  alternates: { canonical: '/faq/' },
};

export default function FaqPage() {
  return <FaqPageClient />;
}

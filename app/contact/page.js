import ContactPageClient from '../ContactPageClient';

export const metadata = {
  title: 'Contact & Flower Order - Studio Michi',
  description: 'Get in touch with Studio Michi for custom flower orders, event inquiries, collaborations, and general questions.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return <ContactPageClient />;
}

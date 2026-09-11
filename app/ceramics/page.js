import CeramicsPageClient from '../CeramicsPageClient';

export const metadata = {
  title: 'Small-Batch Handmade Ceramics - Studio Michi',
  description: 'Browse handmade ceramics from Studio Michi, created to complement floral moments and everyday rituals.',
  alternates: { canonical: '/ceramics' },
};

export default function CeramicsPage() {
  return <CeramicsPageClient />;
}

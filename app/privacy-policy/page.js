import PrivacyPolicyPageClient from '../PrivacyPolicyPageClient';

export const metadata = {
  title: 'Privacy Policy - Studio Michi',
  description: 'Read Studio Michi’s privacy policy for information about how we collect, use, and protect personal data on our website.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />;
}

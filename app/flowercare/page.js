import FlowerCarePageClient from '../FlowerCarePageClient';

export const metadata = {
  title: 'Flower Care - Studio Michi',
  description: 'Learn how to keep your flowers fresh longer with these practical flower care tips and guidance.',
  alternates: { canonical: '/flowercare' },
};

export default function FlowerCarePage() {
  return <FlowerCarePageClient />;
}

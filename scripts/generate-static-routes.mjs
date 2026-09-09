import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const indexPath = join(distDir, 'index.html');

const routes = [
  {
    route: '/',
    title: 'Studio Michi - Seattle Floral Studio',
    description: 'Studio Michi is a Seattle floral studio creating custom bouquets and arrangements for everyday moments.',
    canonical: 'https://studiomichi.co/',
  },
  {
    route: '/services',
    title: 'Flower Bouquets & Arrangements - Studio Michi',
    description: 'Explore custom bouquets and floral arrangements from Studio Michi, designed for gifting, events, and everyday moments in Seattle.',
    canonical: 'https://studiomichi.co/services',
  },
  {
    route: '/ceramics',
    title: 'Small-Batch Handmade Ceramics - Studio Michi',
    description: 'Browse handmade ceramics from Studio Michi, created to complement floral moments and everyday rituals.',
    canonical: 'https://studiomichi.co/ceramics',
  },
  {
    route: '/contact',
    title: 'Contact - Studio Michi',
    description: 'Get in touch with Studio Michi for custom flower orders, event inquiries, collaborations, and general questions.',
    canonical: 'https://studiomichi.co/contact',
  },
  {
    route: '/faq',
    title: 'Frequently Asked Questions - Studio Michi',
    description: 'Find answers about ordering flowers, delivery, and flower care.',
    canonical: 'https://studiomichi.co/faq',
  },
  {
    route: '/flowercare',
    title: 'Flower Care - Studio Michi',
    description: 'Learn how to keep your flowers fresh longer with these practical flower care tips and guidance.',
    canonical: 'https://studiomichi.co/flowercare',
  },
  {
    route: '/privacy-policy',
    title: 'Privacy Policy - Studio Michi',
    description: 'Read Studio Michi’s privacy policy for information about how we collect, use, and protect personal data on our website.',
    canonical: 'https://studiomichi.co/privacy-policy',
  },
];

const fallbackHtml = readFileSync(indexPath, 'utf8');

for (const routeDef of routes) {
  let html = fallbackHtml;

  html = html.replace(/<title>.*?<\/title>/i, `<title>${routeDef.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${routeDef.description}">`);

  if (!html.includes('rel="canonical"')) {
    html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${routeDef.canonical}" />\n</head>`);
  } else {
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${routeDef.canonical}" />`);
  }

  const outputPath = routeDef.route === '/'
    ? join(distDir, 'index.html')
    : join(distDir, routeDef.route.replace(/^\//, ''), 'index.html');

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html);
}

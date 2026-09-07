import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Ceramics from './pages/Ceramics';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import FlowerCare from './pages/FlowerCare';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PageNotFound from './pages/PageNotFound';
import { trackPageView, trackEvent } from './utils/gtag';

const pageMetadata = {
  '/': {
    title: 'Studio Michi - Seattle Floral Studio',
    description: 'Studio Michi is a Seattle floral studio creating custom bouquets and arrangements for everyday moments.',
  },
  '/services': {
    title: 'Flower Bouquets & Arrangements - Studio Michi',
    description: 'Explore custom bouquets and floral arrangements from Studio Michi, designed for gifting, events, and everyday moments in Seattle.',
  },
  '/ceramics': {
    title: 'Small-Batch Handmade Ceramics - Studio Michi',
    description: 'Browse handmade ceramics from Studio Michi, created to complement floral moments and everyday rituals.',
  },
  '/contact': {
    title: 'Contact - Studio Michi',
    description: 'Get in touch with Studio Michi for custom flower orders, event inquiries, collaborations, and general questions.',
  },
  '/faq': {
    title: 'Frequently Asked Questions - Studio Michi',
    description: 'Find answers about ordering flowers, delivery, and flower care.',
  },
  '/flowercare': {
    title: 'Flower Care - Studio Michi',
    description: 'Learn how to keep your flowers fresh longer with these practical flower care tips and guidance.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy - Studio Michi',
    description: 'Read Studio Michi’s privacy policy for information about how we collect, use, and protect personal data on our website.',
  },
};

const getCanonicalUrl = (pathname) => {
  const origin = window.location.origin;
  const cleanPath = pathname === '/' ? '' : pathname;
  return `${origin}${cleanPath}`;
};

const upsertMetaTag = ({ attributeName, attributeValue, tagName = 'meta', property = 'name', content }) => {
  let element = document.head.querySelector(`${tagName}[${property}="${attributeValue}"]`);

  if (!element) {
    element = document.createElement(tagName);
    element.setAttribute(property, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setRouteMetadata = (pathname) => {
  const metadata = pageMetadata[pathname] || pageMetadata['/'];
  const canonicalUrl = getCanonicalUrl(pathname);
  const imageUrl = `${window.location.origin}/images/dahlia-meadow-arrangement.jpg`;

  document.title = metadata.title;
  upsertMetaTag({ property: 'name', attributeName: 'description', attributeValue: 'description', content: metadata.description });
  upsertMetaTag({ property: 'property', attributeName: 'og:title', attributeValue: 'og:title', content: metadata.title });
  upsertMetaTag({ property: 'property', attributeName: 'og:description', attributeValue: 'og:description', content: metadata.description });
  upsertMetaTag({ property: 'property', attributeName: 'og:type', attributeValue: 'og:type', content: 'website' });
  upsertMetaTag({ property: 'property', attributeName: 'og:url', attributeValue: 'og:url', content: canonicalUrl });
  upsertMetaTag({ property: 'property', attributeName: 'og:image', attributeValue: 'og:image', content: imageUrl });
  upsertMetaTag({ property: 'name', attributeName: 'twitter:card', attributeValue: 'twitter:card', content: 'summary_large_image' });
  upsertMetaTag({ property: 'name', attributeName: 'twitter:title', attributeValue: 'twitter:title', content: metadata.title });
  upsertMetaTag({ property: 'name', attributeName: 'twitter:description', attributeValue: 'twitter:description', content: metadata.description });

  let canonicalLink = document.head.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Studio Michi',
    url: window.location.origin,
    description: 'Studio Michi is a Seattle floral studio creating custom bouquets and arrangements for everyday moments.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${window.location.origin}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Florist',
    name: 'Studio Michi',
    description: metadata.description,
    url: canonicalUrl,
    image: imageUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    areaServed: 'Seattle, Washington',
    sameAs: [
      'https://www.instagram.com/studiomichico',
      'https://www.pinterest.com/studiomichi',
    ],
  };

  let jsonLdScript = document.head.querySelector('script[data-seo-jsonld]');
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.setAttribute('type', 'application/ld+json');
    jsonLdScript.setAttribute('data-seo-jsonld', 'true');
    document.head.appendChild(jsonLdScript);
  }
  jsonLdScript.textContent = JSON.stringify([websiteSchema, businessSchema]);
};

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname || '/';
    setRouteMetadata(pathname);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    trackPageView(pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global click event listener to track clicks on links and buttons
  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href');
      const label = target.textContent?.trim() || target.getAttribute('aria-label') || target.name || 'unnamed';
      const isExternal = !!href && /^(https?:)?\/\//i.test(href);

      const normalizedLabel = label.replace(/\s+/g, '');

      if (target.tagName === 'BUTTON') {
        trackEvent(`button_click_${normalizedLabel}`, 'ui', { target: target.className || 'button' });
        return;
      }

      if (href) {
        const eventName = isExternal ? `external_link_click_${normalizedLabel}` : `navigation_click_${normalizedLabel}`;
        trackEvent(eventName, isExternal ? 'external_link' : 'internal_link', {
          destination: href,
        });
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <NavBar />
      <main id="main-content" className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ceramics" element={<Ceramics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/flowercare" element={<FlowerCare />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
      {showScrollTop && (
        <button
          type="button"
          className="scroll-top-button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;

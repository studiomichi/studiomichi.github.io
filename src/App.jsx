import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Ceramics from './pages/Ceramics';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import PageNotFound from './pages/PageNotFound';
import { trackPageView, trackEvent } from './utils/gtag';

const pageTitles = {
  '/': 'Studio Michi - Home',
  '/services': 'Studio Michi - Flower Offerings',
  '/ceramics': 'Studio Michi - Ceramics',
  '/contact': 'Studio Michi - Contact',
  '/faq': 'Studio Michi - FAQ',
};

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname] || 'Studio Michi - Page Not Found';
    document.title = title;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    trackPageView(location.pathname);
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
      <NavBar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ceramics" element={<Ceramics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
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

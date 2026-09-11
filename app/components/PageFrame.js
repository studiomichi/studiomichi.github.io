'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const headerLinks = [
  { href: '/services', label: 'Shop Flowers' },
  { href: '/ceramics', label: 'Ceramics' },
  { href: '/contact', label: 'Contact' },
];

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Shop Flowers' },
  { href: '/ceramics', label: 'Ceramics' },
  { href: '/faq', label: 'FAQ' },
  { href: '/flowercare', label: 'Flower Care' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

const trackEvent = (action, category, extraData = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    page_path: window.location.pathname,
    ...extraData,
  });
};

const handleLinkClick = (label, destination) => {
  const normalizedLabel = (label || '').replace(/\s+/g, '');
  const isExternal = /^(https?:)?\/\//i.test(destination) || destination.startsWith('mailto:');
  const eventName = isExternal ? `external_link_click_${normalizedLabel}` : `navigation_click_${normalizedLabel}`;

  trackEvent(eventName, isExternal ? 'external_link' : 'internal_link', {
    destination,
  });
};

export default function PageFrame({ children }) {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="nav-bar">
        <Link href="/" className="brand" aria-label="Studio Michi home page" onClick={() => handleLinkClick('Studio Michi home page', '/')}>
          Studio Michi
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-navigation" className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {headerLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => {
                  handleLinkClick(link.label, link.href);
                  setMobileMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main id="main-content" className="app-content">{children}</main>

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

      <footer className="site-footer">
        <div className="footer-contact-column">
          <span className="brand">Studio Michi</span>
          <a className="footer-email" href="mailto:studiomichico@gmail.com" aria-label="studiomichico@gmail.com" onClick={() => handleLinkClick('Flower order email', 'mailto:studiomichico@gmail.com')}>
            studiomichico@gmail.com
          </a>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/studiomichico"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Studio Michi on Instagram"
              className="social-media-link"
              onClick={() => handleLinkClick('Instagram', 'https://www.instagram.com/studiomichico')}
            >
              <InstagramIcon fontSize="inherit" />
            </a>
            <a
              href="https://www.pinterest.com/studiomichi"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Studio Michi on Pinterest"
              className="social-media-link"
              onClick={() => handleLinkClick('Pinterest', 'https://www.pinterest.com/studiomichi')}
            >
              <PinterestIcon fontSize="inherit" />
            </a>
          </div>
        </div>

        <div className="footer-nav-column">
          <ul className="footer-nav-list">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link" onClick={() => handleLinkClick(link.label, link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}

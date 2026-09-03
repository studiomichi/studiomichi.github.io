import { NavLink } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { flowerOrderHref, studioEmailAddress } from '../utils/contactEmail';
import { trackEvent } from '../utils/gtag';

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Shop Flowers' },
  { to: '/ceramics', label: 'Ceramics' },
  { to: '/faq', label: 'FAQ' },
  { to: '/flowercare', label: 'Flower Care' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-contact-column">
        <span className="brand">Studio Michi</span>
        <a
          className="footer-email"
          href={flowerOrderHref}
          aria-label="Email Studio Michi about flower orders"
          onClick={() => trackEvent('email_click', 'footer', 'Flower order email', { destination: flowerOrderHref })}
        >
          {studioEmailAddress}
        </a>
        <div className="footer-socials">
          <a
            href="https://www.instagram.com/studiomichico"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Studio Michi on Instagram"
            className="social-media-link"
            onClick={() => trackEvent('social_click', 'footer', 'Instagram', { destination: 'https://www.instagram.com/studiomichico' })}
          >
            <InstagramIcon fontSize="inherit" />
          </a>
          <a
            href="https://www.pinterest.com/studiomichi"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Studio Michi on Pinterest"
            className="social-media-link"
            onClick={() => trackEvent('social_click', 'footer', 'Pinterest', { destination: 'https://www.pinterest.com/studiomichi' })}
          >
            <PinterestIcon fontSize="inherit" />
          </a>
        </div>
      </div>

      <div className="footer-nav-column">
        <ul className="footer-nav-list">
          {footerLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="footer-link"
                onClick={() => trackEvent('navigation_click', 'footer', link.label, { destination: link.to })}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

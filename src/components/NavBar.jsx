import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { trackEvent } from '../utils/gtag';

const links = [
  { to: '/services', label: 'Shop Flowers' },
  { to: '/ceramics', label: 'Ceramics' },
  { to: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav-bar">
      <NavLink to="/" className="brand" onClick={closeMenu}>
        Studio Michi
      </NavLink>

      <button
        type="button"
        className="mobile-nav-toggle"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => {
              trackEvent('navigation_click', 'nav', link.label, { destination: link.to });
              closeMenu();
            }}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

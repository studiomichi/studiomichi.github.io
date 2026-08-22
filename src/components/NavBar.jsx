import { NavLink } from 'react-router-dom';

const links = [
  { to: '/services', label: 'Shop Flowers' },
  { to: '/ceramics', label: 'Ceramics' },
  { to: '/contact', label: 'Contact' },
];

export default function NavBar() {
  return (
    <header className="nav-bar">
      <NavLink to="/" className="brand">
        Studio Michi
      </NavLink>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

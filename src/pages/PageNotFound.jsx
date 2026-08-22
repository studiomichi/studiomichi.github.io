import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <section className="page page-not-found">
      <div className="section-header page-not-found-content">
        <p className="eyebrow">Page not found</p>
        <p>We couldn’t find the page you were looking for.</p>
        <div className="page-not-found-actions">
          <Link to="/services" className="button">
            Back to flower offerings &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

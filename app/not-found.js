import Link from 'next/link';

export default function PageNotFound() {
  return (
    <main className="page page-not-found">
      <div className="section-header not-found-header">
        <p className="eyebrow">Page not found</p>
      </div>

      <div className="not-found-body">
        <p>
          We couldn’t find the page you were looking for.
        </p>
        <Link href="/services" className="button">
          Back to flower offerings →
        </Link>
      </div>
    </main>
  );
}

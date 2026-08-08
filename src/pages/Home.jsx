export default function Home() {
  return (
    <section className="page page-home">
      <div className="hero">
        <div>
          <p className="eyebrow">where your path blooms</p>
          <h1>Studio Michi</h1>
          <p className="lead">
            lead text
          </p>
          <div className="hero-actions">
            <a className="button" href="/services">View services</a>
            <a className="button button-secondary" href="/contact">Place an order</a>
          </div>
        </div>
        <div className="hero-image" aria-hidden="true">
          <div className="image-frame">
            <span>hero text</span>
          </div>
        </div>
      </div>

      <div className="section-card">
        <h2>Our Story</h2>
        <p>
          Studio Michi...........
        </p>
      </div>

      <div className="section-card">
        <h2>What We Offer</h2>
      </div>
    </section>
  );
}

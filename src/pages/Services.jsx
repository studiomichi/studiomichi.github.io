const serviceItems = [
  {
    title: 'Bouquets',
    description: 'Curated seasonal bouquets for gifting and home accents.',
  },
  {
    title: 'Arrangements',
    description: 'Curated arrangements.',
  },
  {
    title: 'Subscriptions',
    description: 'Weekly or monthly flower subscriptions designed to keep your space feeling fresh with rotating blooms and greenery.',
  },
];

export default function Services() {
  return (
    <section className="page page-services">
      <div className="section-header">
        <p className="eyebrow">Offerings</p>
        <h1>Services</h1>
        <p>Where your path blooms.</p>
      </div>

      <div className="service-grid">
        {serviceItems.map((item) => (
          <article key={item.title} className="service-card">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

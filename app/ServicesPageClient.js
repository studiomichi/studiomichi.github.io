'use client';

import { useState } from 'react';

const trackEvent = (action, category, extraData = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    page_path: window.location.pathname,
    ...extraData,
  });
};

const orderDeliveryNote = 'All orders are available for scheduled complimentary pick-up in Seattle/Central District (Thursday - Saturday between 10am - 7pm) or delivery within 10 miles of the studio (Friday - Saturday between 10am - 1pm). Delivery outside of this location and time range is available for a fee (starting from $10 based on zip code). Each arrangement is made to order with fresh blooms, so we recommend placing orders at least 5 days in advance. If you need specific flowers, please order at least 3 weeks in advance.';

const preferenceNote = 'While we\'ll try to accomodate any flower preferences, the overall selection of flowers is designer\'s choice based on your color palette preferences, and seasonal and market availability. The example photos shown are for reference only on style and size. The final arrangement will be unique to your order.';

const serviceItems = [
  {
    id: 'bouquets',
    title: 'Bouquets',
    intro: 'Our hand-tied bouquets feature a mix of fresh seasonal and premium blooms intentionally designed for you. Each bouquet is wrapped in water-resistant paper with a ribbon and comes in our flower bag with a water box.',
    bulletList: [
      { label: 'Classic (starting from $130)', text: 'Our just-because bouquet full of seasonal blooms to bring a little joy and beauty into everyday moments.' },
      { label: 'Signature (starting from $180)', text: 'Our signature bouquet featuring a beautiful mix of seasonal and premium blooms, thoughtfully designed to make someone feel truly special.' },
    ],
    ctaHref: 'https://forms.gle/h1W7MgCtVth4PZSr9',
    ctaLabel: 'Inquire',
    ctaEventName: 'external_link_click_inquirebouquets',
    images: [
      { src: '/images/orange-summer-bouquet1.jpg', alt: 'A classic bouquet with warm-toned summer blooms.', caption: 'Classic bouquet' },
      { src: '/images/orange-summer-bouquet3.jpg', alt: 'A classic bouquet with yellow and orange summer blooms.', caption: 'Classic bouquet' },
      { src: '/images/pastel-signature-bouquet.jpg', alt: 'A colorful and pastel signature bouquet with roses, lisianthus and carnations.', caption: 'Signature bouquet' },
    ],
  },
  {
    id: 'arrangements',
    title: 'Arrangements',
    intro: 'Our floral arrangements are curated for your space and moment. Each arrangement features a mix of fresh seasonal and premium blooms designed in a ceramic or glass vase.',
    bulletList: [
      { label: 'Classic (starting from $150)', text: 'Our classic arrangement of fresh blooms designed to brighten your space.' },
      { label: 'Signature (starting from $200)', text: 'Our signature arrangement curated to elevate your space.' },
    ],
    ctaHref: 'https://forms.gle/h1W7MgCtVth4PZSr9',
    ctaLabel: 'Inquire',
    ctaEventName: 'external_link_click_inquirearrangements',
    images: [
      { src: '/images/pink-peony-arrangement.jpg', alt: 'A signature arrangement of pink peonies and ranunculus.', caption: 'Signature arrangement' },
      { src: '/images/dahlia-meadow-arrangement.jpg', alt: 'A classic arrangement of greenery and dahlias.', caption: 'Classic arrangement' },
      { src: '/images/rose-dahlia-classic-arrangement.jpg', alt: 'A signature arrangement of wild sunflowers and greenery.', caption: 'Classic arrangement' },
    ],
  },
];

function ServiceCarousel({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="service-carousel">
      <div className="carousel-slides" aria-live="polite">
        {images.map((image, index) => (
          <div
            key={`${title}-${image.alt}`}
            id={`carousel-panel-${title}-${index}`}
            className="carousel-image-frame"
            role="tabpanel"
            aria-labelledby={`carousel-tab-${title}-${index}`}
            hidden={index !== activeIndex}
            aria-hidden={index !== activeIndex}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <div className="carousel-caption">{image.caption}</div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button type="button" className="carousel-button" onClick={showPrevious} aria-label={`Show previous ${title} image`}>
          ←
        </button>

        <div className="carousel-dots" role="tablist" aria-label={`${title} image gallery`}>
          {images.map((image, index) => (
            <button
              key={image.alt}
              id={`carousel-tab-${title}-${index}`}
              type="button"
              role="tab"
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${title} image ${index + 1}`}
              aria-selected={index === activeIndex}
              aria-controls={`carousel-panel-${title}-${index}`}
              tabIndex={index === activeIndex ? 0 : -1}
            />
          ))}
        </div>

        <button type="button" className="carousel-button" onClick={showNext} aria-label={`Show next ${title} image`}>
          →
        </button>
      </div>
    </div>
  );
}

export default function ServicesPageClient() {
  return (
    <section className="page page-services">
      <div className="section-header">
        <p className="eyebrow">Flower offerings</p>
        <h1>Services</h1>
        <nav className="service-nav" aria-label="Jump to service sections">
          <a href="#bouquets" className="service-pill" aria-label="Jump to bouquets section" onClick={() => trackEvent('navigation_click_bouquets', 'internal_link', { destination: '#bouquets' })}>Bouquets</a>
          <a href="#arrangements" className="service-pill" aria-label="Jump to arrangements section" onClick={() => trackEvent('navigation_click_arrangements', 'internal_link', { destination: '#arrangements' })}>Arrangements</a>
        </nav>
      </div>

      <div className="service-section-list">
        {serviceItems.map((item) => (
          <article key={item.id} id={item.id} className="section-card service-detail-card">
            <div className="service-detail-copy">
              <h3>{item.title}</h3>
              <p>{item.intro} {preferenceNote}</p>
              <br/>
              <ul>
                {item.bulletList.map((bullet) => (
                  <li key={bullet.label}>
                    <b>{bullet.label}</b>: {bullet.text}
                  </li>
                ))}
              </ul>
              <br/>
              <p>{orderDeliveryNote}</p>
              <br/>
              <p><b>Note that due to the perishable nature of our work, all sales are final.</b></p>
              <br/>
              <a
                href={item.ctaHref}
                className="button"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Inquire about ${item.title.toLowerCase()}`}
                onClick={() => trackEvent(item.ctaEventName, 'external_link', { destination: item.ctaHref })}
              >
                {item.ctaLabel}
              </a>
            </div>
            <ServiceCarousel images={item.images} title={item.title} />
          </article>
        ))}
      </div>
    </section>
  );
}

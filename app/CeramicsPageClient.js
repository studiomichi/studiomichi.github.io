'use client';

const trackEvent = (action, category, extraData = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    page_path: window.location.pathname,
    ...extraData,
  });
};

const galleryImages = [
  {
    src: '/images/ceramic-dessert-plates1.jpg',
    alt: 'Mini speckled matte white handmade ceramic plates partially in the sunlight with pink sweetpea flowers in the corner.',
    caption: 'Mini dessert plates',
  },
  {
    src: '/images/ceramic-dessert-plates2.jpg',
    alt: 'Close-up of two speckled matte white handmade ceramic dessert plates resting on top of each other. The top plate shows the bottom of the plate with a small signature stamp. Two silver mini forks rest on the right side of the plates.',
    caption: 'Mini dessert plates',
  },
  {
    src: '/images/ceramic-bowls2.jpg',
    alt: 'Speckled matte white handmade ceramic bowls on a warm wooden surface. One bowl is on its side, one is upside down to show the bottom of the bowl, and two are stacked on top of each other.',
    caption: 'Rice/dessert bowls',
  },
];

export default function CeramicsPageClient() {
  return (
    <section className="page page-ceramics">
      <div className="section-header">
        <p className="eyebrow">Small-batch ceramics</p>
        <h1>Ceramics</h1>
        <p>
          I occasionally make hand-thrown ceramic pieces. Because these are in small batches, they are only available at a limited number of markets/pop-ups. Follow <b><a href="https://www.instagram.com/studiomichico/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('external_link_click_StudioMichiInstagram', 'external_link', { destination: 'https://www.instagram.com/studiomichico/' })}>Studio Michi on Instagram</a></b> for the latest updates!
        </p>
        <p>
          Our next pop-up will be on <b>October 10th, 2026 from 11am - 4pm</b> at <b><a href="https://maps.app.goo.gl/p4prUh28AcKKkWrx9" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('external_link_click_SilkenCeramics', 'external_link', { destination: 'https://maps.app.goo.gl/p4prUh28AcKKkWrx9' })}>Silken Ceramics (853 Hiawatha Pl S, Seattle, WA 98144)</a></b>!
        </p>
      </div>

      <div className="ceramic-gallery" aria-label="Studio Michi ceramic gallery">
        {galleryImages.map((image) => (
          <figure key={image.src} className="ceramic-gallery-item">
            <img src={image.src} alt={image.alt} className="ceramic-gallery-image" />
            <figcaption className="carousel-caption">{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

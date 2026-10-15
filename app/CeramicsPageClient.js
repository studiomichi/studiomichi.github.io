'use client';

import { ceramicsInquiryHref } from './utils/contactEmail';

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
    caption: 'Mini dessert plates - $18/each',
  },
  {
    src: '/images/ceramic-dessert-plates2.jpg',
    alt: 'Close-up of two speckled matte white handmade ceramic dessert plates resting on top of each other. The top plate shows the bottom of the plate with a small signature stamp. Two silver mini forks rest on the right side of the plates.',
    caption: 'Mini dessert plates - $18/each',
  },
  {
    src: '/images/ceramic-bowls2.jpg',
    alt: 'Speckled matte white handmade ceramic bowls on a warm wooden surface. One bowl is on its side, one is upside down to show the bottom of the bowl, and two are stacked on top of each other.',
    caption: 'Rice/dessert bowls - $18/each',
  },
];

export default function CeramicsPageClient() {
  return (
    <section className="page page-ceramics">
      <div className="section-header">
        <p className="eyebrow">Small-batch ceramics</p>
        <h1>Ceramics</h1>
        <p>
          I occasionally make hand-thrown ceramic pieces. Because these are in small batches, they are only available at a limited number of markets/pop-ups and for local pick-up/delivery. Follow <b><a href="https://www.instagram.com/studiomichico/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('external_link_click_StudioMichiInstagram', 'external_link', { destination: 'https://www.instagram.com/studiomichico/' })}>Studio Michi on Instagram</a></b> for the latest updates!
        </p>
        {/* Placeholder for next pop-up info */}
        {/* <p>
          Our next pop-up will be on <b>October 10th, 2026 from 11am - 4pm</b> at <b><a href="PLACEHOLDER" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('external_link_click_PLACEHOLDER', 'external_link', { destination: 'PLACEHOLDER' })}>LOCATION PLACEHOLDER</a></b>!
        </p> */}
        <p>My maker's mark features the outline of a cat that I hand-drew and vectorized so that I could use it on a stamp. I love that it also looks like an "M", for "Michi" and "Mia" (my first cat, a foster-fail and one-eyed Siamese kitten, that I lost to FIP). The "hook" on one side also is a subtle nod at one of the characters in my Chinese name (嫻) 😊.</p>
        <p>If you're interested in any of these available pieces, <a href={ceramicsInquiryHref} aria-label="Email Studio Michi for ceramics inquiries" onClick={() => trackEvent('external_link_click_ceramics', 'external_link', { destination: ceramicsInquiryHref })}>feel free to reach out via email</a>!</p>
      </div>

      <div className="ceramic-gallery" aria-label="Studio Michi ceramic gallery">
        {galleryImages.map((image) => (
          <figure key={image.src} className="ceramic-gallery-item">
            <img src={image.src} alt={image.alt} className="ceramic-gallery-image" />
            <figcaption className="carousel-caption">{image.caption}</figcaption>
          </figure>
        ))}
      </div>
      <br/>
      <div className="ceramic-care-card">
        <h3>Ceramic care instructions</h3>
        <ul>
          <li>Dishwasher-safe, but may shorten its lifespan. Gentle hand washing is recommended.</li>
          <li>Allow the ceramic piece to dry thoroughly between washes.</li>
          <li>Avoid sudden temperature changes to prevent thermal shock and cracking.</li>
          <li>Microwave-safe, but may shorten its lifespan.</li>
          <li>Do not use in ovens or on stove tops.</li>
        </ul>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { flowerOrderHref, flowerOrderInquiry } from '../utils/contactEmail';

const orderDeliveryNote =
  '<p>All orders are available for scheduled complimentary pick-up in Seattle/Central District (Wednesday - Saturday between 10am - 7pm) or delivery within 10 miles of the studio (Friday - Saturday between 10am - 1pm). Delivery outside of this location and time range is available for a fee (starting from $10 based on zip code). We recommend placing orders at least 5 days in advance. If you need specific flowers, please order at least 3 weeks in advance.</p><br/><p><b>Note that due to the perishable nature of our work, all sales are final.</b></p>';

const serviceItems = [
  {
    id: 'bouquets',
    title: 'Bouquets',
    description:
      `<p>Our hand-tied bouquets feature a mix of fresh seasonal and premium blooms intentionally designed for you. Each bouquet is wrapped in water-resistant paper with a ribbon and comes in our flower bag with an aqua box. While we\'ll try to accomodate any flower preferences, the overall  selection of flowers is designer\'s choice based on your color palette preferences, and seasonal and market availability.</p><br/><ul><li><b>Classic (starting from $130)</b>: Our just-because bouquet full of seasonal blooms to bring a little joy and beauty into everyday moments.</li><li><b>Signature (starting from $180)</b>: Our signature bouquet featuring a beautiful mix of seasonal and premium blooms, thoughtfully designed to make someone feel truly special.</li></ul><br/>${orderDeliveryNote}<br/><a href="${flowerOrderHref}" class="button">${flowerOrderInquiry.buttonLabel}</a>`,
    images: [
      {
        src: '/images/orange-summer-bouquet1.png',
        alt: 'A classic bouquet with warm-toned summer blooms.',
        caption: 'Classic bouquet',
      },
      {
        src: '/images/orange-summer-bouquet3.png',
        alt: 'A classic bouquet with yellow and orange summer blooms.',
        caption: 'Classic bouquet',
      },
      {
        src: '/images/green-sunflower-bouquet.jpg',
        alt: 'A classic bouquet with greenery and sunflowers.',
        caption: 'Classic bouquet',
      },
    ],
  },
  {
    id: 'arrangements',
    title: 'Arrangements',
    description:
      `<p>Our floral arrangements are curated for your space and moment. Each arrangement features a mix of fresh seasonal and premium blooms designed in a ceramic or glass vase. While we\'ll try to accomodate any flower preferences, the overall  selection of flowers is designer\'s choice based on your color palette preferences, and seasonal and market availability.</p><br/><ul><li><b>Classic (starting from $150)</b>: Our classic arrangement of fresh blooms designed to brighten your space.</li><li><b>Signature (starting from $200)</b>: Our signature arrangement curated to complement your space with an elevated aesthetic.</li></ul><br/>${orderDeliveryNote}<br/><a href="${flowerOrderHref}" class="button">${flowerOrderInquiry.buttonLabel}</a>`,
    images: [
      {
        src: '/images/pink-peony-arrangement.jpg',
        alt: 'A signature arrangement of pink peonies and ranunculus.',
        caption: 'Signature arrangement',
      },
      {
        src: '/images/dahlia-meadow-arrangement.jpg',
        alt: 'A classic arrangement of greenery and dahlias.',
        caption: 'Classic arrangement',
      },
      {
        src: '/images/wild-sunflower-arrangement3.jpg',
        alt: 'A signature arrangement of wild sunflowers and greenery.',
        caption: 'Signature arrangement',
      },
    ],
  },
  // {
  //   id: 'subscriptions',
  //   title: 'Subscriptions',
  //   description:
  //     `<p>Our weekly or monthly flower subscriptions are designed to keep your space feeling fresh with rotating blooms and greenery. The subscription will cover a vase rental. With each delivery, we\'ll provide the vase and collect the previous one.</p><br/><p>While we\'ll try to accomodate any flower preferences, the overall  selection of flowers is designer\'s choice based on your color palette preferences, and seasonal and market availability.</p><br/><ul><li><b>Classic arrangement (starting from $130)</b>: Our classic arrangement of fresh blooms designed to brighten your space.</li><li><b>Signature arrangement (starting from $180)</b>: Our signature arrangement curated to complement your space with an elevated aesthetic.</li></ul><br/>${orderDeliveryNote}<br/><a href="${flowerOrderHref}" class="button">${flowerOrderInquiry.buttonLabel}</a>`,
  //   images: [
  //     {
  //       src: '/images/red-smokebush-arrangement.jpg',
  //       alt: 'Arrangement of smokebush and red carnations in a white compote vase.',
  //       caption: 'Classic arrangement',
  //     },
  //     {
  //       src: '/images/dahlia-meadow-arrangement.jpg',
  //       alt: 'Meadow arrangement of dahlias and greenery.',
  //       caption: 'Classic arrangement',
  //     },
  //     {
  //       src: '/images/pink-peony-arrangement.jpg',
  //       alt: 'Arrangement of pink peonies and ranunculus.',
  //       caption: 'Signature arrangement',
  //     },
  //   ],
  // },
];

function ServiceCarousel({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = images[activeIndex];

  const showPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="service-carousel">
      <div className="carousel-image-frame">
        <img src={currentImage.src} alt={currentImage.alt} loading="lazy" />
        <div className="carousel-caption">{currentImage.caption}</div>
      </div>

      <div className="carousel-controls">
        <button type="button" className="carousel-button" onClick={showPrevious} aria-label={`Show previous ${title} image`}>
          ←
        </button>

        <div className="carousel-dots" role="tablist" aria-label={`${title} image gallery`}>
          {images.map((image, index) => (
            <button
              key={image.alt}
              type="button"
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${title} image ${index + 1}`}
              aria-pressed={index === activeIndex}
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

export default function Services() {
  return (
    <section className="page page-services">
      <div className="section-header">
        <p className="eyebrow">Flower offerings</p>
        <h1>Services</h1>
        <nav className="service-nav" aria-label="Jump to service sections">
          <a href="#bouquets" className="service-pill">
            Bouquets
          </a>
          <a href="#arrangements" className="service-pill">
            Arrangements
          </a>
          {/* <a href="#subscriptions" className="service-pill">
            Subscriptions
          </a> */}
        </nav>
      </div>

      <div className="service-section-list">
        {serviceItems.map((item) => (
          <article key={item.id} id={item.id} className="section-card service-detail-card">
            <div className="service-detail-copy">
              <h2>{item.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
            <ServiceCarousel images={item.images} title={item.title} />
          </article>
        ))}
      </div>
    </section>
  );
}

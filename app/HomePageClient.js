'use client';

import Link from 'next/link';

const trackEvent = (action, category, extraData = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    page_path: window.location.pathname,
    ...extraData,
  });
};

const galleryImages = [
  { src: '/images/wild-sunflower-arrangement1.jpg', alt: 'Wild and organic arrangements of smokebush plumes, yellow sunflowers and coreopsis.' },
  { src: '/images/orange-summer-bouquet1.jpg', alt: 'A hand-tied classic bouquet with warm-toned summer blooms wrapped in orange and cream paper with an orange ribbon. Seasonal flowers featured include orange marigolds, deep red dahlias, chocolate cosmos, orange and red rudbeckia, yellow solidago, and deep red carnations.' },
  { src: '/images/dahlia-meadow-arrangement.jpg', alt: 'A compote flower arrangement giving meadowy vibes featuring flowy ferns, yellow solidago, peachy dahlias, purple campanula bellflowers, and orange-red coreopsis.' },
  { src: '/images/green-sunflower-bouquet.jpg', alt: 'A modern flower bouquet with grasses, dianthus, chocolate cosmos, and naked sunflowers wrapped in white wrapping and sitting in a brown flower bag.' },
  { src: '/images/red-smokebush-arrangement.jpg', alt: 'A sculptural flower arrangement of smokebush plumes and deep red carnations in a tall compote vase.' },
  { src: '/images/pink-peony-arrangement.jpg', alt: 'A soft and romantic lush garden flower arrangement featuring pink peonies, pink and cream ranunculus, cream and yellow butterfly ranunculus, pink sweetpea vines, and white scabiosas.' },
];

export default function HomePageClient() {
  return (
    <section className="page-home">
      <div className="hero hero-full-width">
        <img
          className="hero-image"
          src="/images/dahlia-meadow-arrangement.webp"
          alt="A custom flower arrangement giving meadowy vibes featuring flowy ferns, yellow solidago, peachy dahlias, purple campanula bellflowers, and orange-red coreopsis."
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          width="1600"
          height="900"
        />
        <div className="hero-overlay">
          <p className="brand-slogan">whimsical blooms for everyday moments</p>
          <div className="hero-actions">
            <Link
              className="button"
              href="/shop-flowers"
              aria-label="View flower offerings from hero"
              onClick={() => trackEvent('navigation_click_viewflowerofferings', 'internal_link', { destination: '/shop-flowers' })}
            >
              view flower offerings &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="page-content-block story-layout">
        <div className="story-copy">
          <p className="eyebrow">Where your path blooms</p>
          <h2>Our story</h2>
          <p>
            Studio Michi is a floral design studio based in Seattle, Washington offering thoughtful flower arrangements for any moment. Our designs are inspired and guided by the natural movement, texture, and whimsy of flowers. We aim to make sustainable choices at each step of our process, from sourcing seasonal and local blooms when possible, designing without floral foam, to gifting leftover blooms to the community.
          </p>
          <p>
            Jenn is the florist and owner behind Studio Michi. What began as a love for creating with her hands has grown into a studio rooted in artistry, nature and the joy of making something beautiful. She's a milk tea enthusiast, cat mom, and enjoys a good hike with mountain views. Jenn loves traveling and visiting new places just as much as she loves being a homebody and tending to her garden.
          </p>
          <p>
            The name, Studio Michi, came from a desire to honor both her creative path and her love for cats (specifically her first cat, a foster-fail and one-eyed Siamese kitten, Mia). After considering multiple options, Jenn stumbled upon the word, <i>michi</i>. In Japanese, <i>michi</i>, (and the Chinese character for it, 道) can mean "path", a fitting name for her studio path. Coincidentally, <i>michi</i> is also an informal Spanish word used to refer to a "cat", making the name a serendipitous choice.
          </p>
          <br />
          <Link
            className="button"
            href="/shop-flowers"
            aria-label="View flower offerings from story section"
            onClick={() => trackEvent('navigation_click_viewflowerofferings', 'internal_link', { destination: '/shop-flowers' })}
          >
            view flower offerings &rarr;
          </Link>
        </div>

        <div className="story-visual">
          <img
            src="/images/profile-image2.jpg"
            alt="Jenn, the florist and owner of Studio Michi, smiling and standing in front of wild purple lupines with a view of a lake and mountains in the background."
            className="story-image"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width="430"
            height="537"
          />
        </div>
      </div>

      <div className="home-gallery" aria-label="Studio Michi gallery">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <img
            key={index}
            src={galleryImages[(index - 1) % galleryImages.length].src}
            alt={galleryImages[(index - 1) % galleryImages.length].alt}
            className="home-gallery-image"
            loading={index <= 2 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index <= 2 ? 'high' : 'low'}
            width="300"
            height="350"
          />
        ))}
      </div>
    </section>
  );
}

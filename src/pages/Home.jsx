import { Link } from 'react-router-dom';

export default function Home() {
  const galleryImages = [
    {
      src: '/images/wild-sunflower-arrangement1.jpg',
      alt: 'Wild organic arrangement of smokebush, sunflowers and coreopsis.',
    },
    {
      src: '/images/orange-summer-bouquet1.png',
      alt: 'A bouquet with warm-toned summer blooms.',
    },
    {
      src: '/images/dahlia-meadow-arrangement.jpg',
      alt: 'A compote arrangement of greenery and peachy dahlias.',
    },
    {
      src: '/images/green-sunflower-bouquet.jpg',
      alt: 'A modern bouquet with greenery and sunflowers.',
    },
    {
      src: '/images/red-smokebush-arrangement.jpg',
      alt: 'A sculptural arrangement of smokebush and red carnations.',
    },
    {
      src: '/images/pink-peony-arrangement.jpg',
      alt: 'A soft romantic arrangement of pink peonies and ranunculus.',
    },
  ];

  return (
    <section className="page-home">
      <div className="hero hero-full-width">
        <div className="hero-overlay">
          <p className="brand-slogan">whimsical blooms for everyday moments</p>
          <div className="hero-actions">
            <Link className="button" to="/services">view flower offerings &rarr;</Link>
          </div>
        </div>
      </div>

      <div className="page-content-block story-layout">
        <div className="story-copy">
          <p className="eyebrow">Where your path blooms</p>
          <h2>Our story</h2>
          <p>
            Studio Michi is a floral design studio based in Seattle, Washington creating thoughtful arrangements for any moment. Our designs are inspired and guided by the natural movement, texture, and whimsy of flowers. We aim to make sustainable choices at each step of our process, from sourcing seasonal and local blooms when possible to designing without floral foam.
          </p>
          <p>
            Jenn is the floral designer and owner behind Studio Michi. What began as a love for creating with her hands has grown into a studio rooted in artistry, nature and the joy of making something beautiful.
          </p>
          <p>The name, Studio Michi, came from a desire to honor both her creative path and her love for cats (specifically her first cat, Mia). After considering multiple options, Jenn stumbled upon the word, <i>michi</i>. In Japanese, <i>michi</i>, (and the Chinese character for it, 道) means "path", a fitting name for her studio path. Coincidentally, <i>michi</i> is also an informal Spanish word used to refer to a "cat", making the name a serendipitous choice.</p><br/>
          <Link className="button" to="/services">view flower offerings &rarr;</Link>
        </div>

        <div className="story-visual">
          <img
            src="/images/profile-image.jpg"
            alt="Jenn, the owner of Studio Michi, with a peony bouquet."
            className="story-image"
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
          />
        ))}
      </div>
    </section>
  );
}

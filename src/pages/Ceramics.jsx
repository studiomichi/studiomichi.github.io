export default function Ceramics() {
  const galleryImages = [
    {
      src: '/images/ceramic-dessert-plates1.jpg',
      alt: 'Mini ceramic plates partially in the sunlight.',
      caption: 'Mini dessert plates',
    },
    {
      src: '/images/ceramic-dessert-plates2.jpg',
      alt: 'Close-up of ceramic dessert plates styled together.',
      caption: 'Mini dessert plates',
    },
    {
      src: '/images/ceramic-bowls2.jpg',
      alt: 'Ceramic bowls in a warm neutral studio setting.',
      caption: 'Rice/dessert bowls',
    },
  ];

  return (
    <section className="page page-ceramics">
      <div className="section-header">
        <p className="eyebrow">Small-batch ceramics</p>
        <h1>Ceramics</h1>
        <p>
          I occasionally make hand-thrown ceramic pieces. Because these are in small batches, they are only available at a limited number of markets/pop-ups. Follow <b><a href="https://www.instagram.com/studiomichico/" target="_blank" rel="noopener noreferrer">Studio Michi on Instagram</a></b> for the latest updates!
        </p>
        <p>
          Our next pop-up will be on <b>October 10th, 2026 from 11am - 4pm</b> at <b><a href="https://maps.app.goo.gl/p4prUh28AcKKkWrx9" target="_blank" rel="noopener noreferrer">Silken Ceramics (853 Hiawatha Pl S, Seattle, WA 98144)</a></b>!
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

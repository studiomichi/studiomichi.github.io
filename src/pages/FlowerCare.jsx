export default function FlowerCare() {
  const careTips = [
    {
      title: 'Care',
      description: 'Keep flowers away from direct sunlight, hot rooms and ripening fruit. You can remove wilted flowers and leaves as they age to keep the arrangement looking fresh.',
    },
    {
      title: 'Water',
      description: 'Change the water every 1-2 days or when it starts to look cloudy. You can also trim the stems with clean scissors to help them last longer and remove any petals or leaves that fall into the water to keep the water clean.',
    },
    {
      title: 'Pets',
      description: 'Your arrangement may contain flowers that aren\'t pet-friendly. Keep them out of reach from pets to avoid accidental ingestion.',
    },
    {
      title: 'Reuse',
      description: 'Our packaging is purposefully not branded so that it can be more easily reused for any occasion. Please consider reusing the flower gift bag and ribbons for your next gifting needs or repurpose the vase for another beautiful arrangement or as a planter.',
    },
  ];

  return (
    <section className="page page-flower-care">
      <div className="section-header">
        <p className="eyebrow">Enjoying your flowers</p>
        <h1>Flower Care</h1>
        <p>Flowers are not meant to last forever; they're a reminder to enjoy and appreciate the beauty and the moment. Our arrangements typically last 5-7 days depending on the type of flowers. With thoughtful care, your floral arrangement can last longer and continue to naturally open up.</p>
      </div>

      <div className="care-grid">
        {careTips.map((item, index) => (
          <div key={index} className="care-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

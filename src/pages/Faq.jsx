export default function Faq() {
  const faqs = [
    {
      question: 'How far in advance should I place an order?',
      answer: 'We recommend placing orders at least 5 days in advance. If you need specific flowers, please order at least 3 weeks in advance. We\'ll do our best to accommodate flower preferences, but may be restricted to market availability.',
    },
    {
      question: 'Where do you deliver?',
      answer: 'We offer complimentary delivery within 10 miles of our studio near Central District (Friday - Saturday between 10am - 1pm). For delivery outside of this location and time range, a fee may apply (starting from $10 based on zip code). All orders are available for scheduled complimentary pick-up from our studio (Wednesday - Saturday between 10am - 7pm).',
    },
    // {
    //   question: 'How does the subscription work?',
    //   answer: 'Choose between weekly or monthly arrangements. We\'ll work with you to confirm the scheduled delivery or pick-up date and time. The subscription will cover a vase rental. With each delivery, we\'ll provide the vase and collect the previous one. By default, the arrangements will be designer\'s choice. If you have specific aesthetic or flower preferences, please include that in your inquiry. We\'ll do our best to accommodate, but may be restricted to seasonal and market availability.'
    // },
    // {
    //   question: 'How do I pause or cancel a subscription delivery?',
    //   answer: 'Payment requests will be sent out 7 days prior to the next scheduled delivery. You can pause or cancel your subscription order by emailing us 7 days in advance of your next scheduled delivery. Please include your name and the date(s) of the delivery you wish to pause or cancel. We\'ll schedule a time to collect the vase from your last delivery. If you do not return the vase, we will charge a fee for the replacement of the vase.',
    // },
    {
      question: 'What flowers will I receive?',
      answer: 'While we\'ll try to accommodate any flower preferences, the overall selection of flowers is designer\'s choice based on your color palette preferences, and seasonal (e.g., peonies in late spring, dahlias in late summer/fall, etc) and market availability.',
    },
    {
        question: 'What color of flowers do you offer?',
        answer: 'We offer a variety of natural, thoughtfully curated color palettes, from soft pastels and monochromatic tones to harmonious analogous color combinations. Color options may vary based on seasonal and market availability. If you have specific color preferences, please include that in your inquiry and we\'ll do our best to accommodate.',
    },
    {
      question: 'How long do the flowers last?',
      answer: 'With proper care, our arrangements typically last 5-7 days. We recommend changing the water every 1-2 days or when it starts getting cloudy. You can also trim the stems with clean scissors and remove wilted flowers and leaves as they age. Keep them away from direct sunlight, hot rooms and ripening fruit to help them last longer.',
    },
    {
      question: 'Are the flowers pet-friendly?',
      answer: 'We use a variety of flowers and greenery in our arrangements, some of which may be mildly toxic to pets. It\'s best to keep the arrangement out of reach of pets to avoid accidental ingestion. The one flower that we avoid using in our arrangements is lilies, which are highly toxic to cats (and we have studio cats!). If you have any concerns about specific flowers, please reach out to us and we\'ll do our best to accommodate.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We currently can only accept Venmo or Zelle.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Due to the perishable nature of flowers, all sales are final. If you have any concerns about your order, please reach out to us within 2 hours of pick-up or delivery and we\'ll do our best to address them.',
    }
  ];

  return (
    <section className="page page-faq">
      <div className="section-header">
        <p className="eyebrow">Frequently asked questions</p>
        <h1>FAQ</h1>
      </div>

      <div className="faq-list">
        {faqs.map((item, index) => (
            <div key={index}>
                <h2>{item.question}</h2>
                <p>{item.answer}</p>
            </div>
        ))}
      </div>
    </section>
  );
}

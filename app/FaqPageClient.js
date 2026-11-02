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

const faqSections = [
  {
    id: 'flower-orders',
    title: 'Flower Orders',
    faqs: [
      {
        question: 'How far in advance should I place an order?',
        answer: 'Each arrangement is made to order with fresh blooms, so we recommend placing orders at least 5 business days in advance. If you need specific flowers, please order at least 3 weeks in advance. We\'ll do our best to accommodate flower preferences, but may be restricted to market availability.',
      },
      {
        question: 'What\'s the ordering process?',
        answer: 'Our inquiry link will take you to our flower order form. Please complete and submit the form and we\'ll get back to you within 1-3 business days about your order, discuss any preferences and limitations and send the payment details. Once payment is received, we\'ll confirm your order and schedule your pick-up or delivery date and time.',
      },
      {
        question: 'How does the subscription service work?',
        answer: 'Our monthly subscription service delivers fresh, seasonal blooms straight to your home or business. Monthly arrangements come in a vase, which we\'ll swap out with a fresh arrangement and vase each month. Subscription arrangements are designer\'s choice, guided by your color palette and seasonal and market availability. We\'ll do our best to accommodate your preferences, though each delivery will feature a fresh and unique arrangement. Monthly subscriptions will be billed on the 1st of each month and can be canceled at any time. Please reach out to us if you have any questions about our subscription service.',
      },
      {
        question: 'Where do you deliver?',
        answer: 'We offer complimentary delivery within 10 miles of our studio near Central District (Friday - Saturday between 10am - 1pm) (including Madrona, Leschi, First Hill, Queen Anne, Columbia City, Mercer Island, etc.). For delivery outside of this location and time range, a fee may apply (starting from $10 based on zip code). All orders are available for scheduled complimentary pick-up from our studio (Thursday - Saturday between 10am - 7pm).',
      },
      {
        question: 'What flowers will I receive?',
        answer: 'Each arrangement is unique and while we\'ll try to accommodate any flower preferences, the overall selection of flowers is designer\'s choice based on your color palette preferences, and seasonal (e.g., peonies in late spring, dahlias in late summer/fall, etc) and market availability. We offer a variety of natural, thoughtfully curated color palettes, from soft pastels, neutrals, and monochromatic tones to harmonious analogous color combinations. If you have specific color preferences, please include that in your inquiry and we\'ll do our best to accommodate.',
      },
      {
        question: 'How long do the flowers last?',
        answer: <>With proper care, our arrangements typically last 5-7 days depending on the type of flowers. Care instructions are included in each order and you can also visit our <Link href="/flower-care" onClick={() => trackEvent('navigation_click_FlowerCare', 'internal_link', { destination: '/flower-care' })}>Flower Care</Link> page for more tips.</>,
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
        answer: 'Due to the perishable nature of flowers, all sales are final. If you have any concerns about your order, please reach out to us within 8 hours of pick-up or delivery and we\'ll do our best to address them.',
      },
    ],
  },
  {
    id: 'events',
    title: 'Events & Gatherings',
    faqs: [
      {
        question: 'How do I get started with event flowers?',
        answer: <>Submit the <Link href="/events" onClick={() => trackEvent('navigation_click_Events', 'internal_link', { destination: '/events' })}>event inquiry form</Link> and we'll follow up with a personalized proposal. A non-refundable deposit and signed contract is required to secure your event date.</>,
      },
      {
        question: 'How far in advance should I inquire about my event?',
        answer: 'We recommend reaching out once your event date and venue are confirmed. The earlier the better!',
      },
      {
        question: 'Can I request for specific flowers?',
        answer: 'Yes! We\'d love to consider and incorporate your favorite flowers into the design. However, because flowers are seasonal and availability may change, we can\'t guarantee specific flowers. We\'ll let you know if substitutions are needed and will work with you to find the best alternatives to keep the overall mood.',
      },
      {
        question: 'How does the floral estimator work?',
        answer: 'The estimator provides a rough estimate based on minimum listed prices for the floral pieces selected, including labor. Prices are not personalized and do not include tax or delivery, so your final proposal may differ from this estimate. It\'s meant to give you a general idea of the cost for your event flowers.',
      },
      {
        question: 'What locations do you serve?',
        answer: 'We offer floral design for intimate gatherings and events in and around the Seattle area, including Shoreline, Kirkland, Ballard, West Seattle, Bellevue, Redmond, Renton, Kent, etc. If your event is outside of the Seattle area, please reach out to us and we\'ll do our best to accommodate your event. We also offer pick-up for personal flowers.',
      },
    ],
  },
  {
    id: 'ceramics',
    title: 'Ceramics',
    faqs: [
      {
        question: 'How can I purchase your ceramic pieces?',
        answer: <>Ceramics are available at a limited number of markets and pop-ups, and for local pick-up or delivery. Available pieces are listed on the <Link href="/handmade-ceramics" onClick={() => trackEvent('navigation_click_Ceramics', 'internal_link', { destination: '/handmade-ceramics' })}>ceramics page</Link>.</>,
      }
    ],
  },
];

export default function FaqPageClient() {
  const faqs = faqSections.flatMap((section) => section.faqs);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof item.answer === 'string' ? item.answer : 'Visit the related page for more details.',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="page page-faq">
        <div className="section-header">
          <p className="eyebrow">Frequently asked questions</p>
          <h1>FAQ</h1>
          <nav className="service-nav" aria-label="Jump to FAQ sections">
            {faqSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="service-pill"
                onClick={() => trackEvent(
                  `navigation_click_faq_${section.id}`,
                  'internal_link',
                  { destination: `#${section.id}` },
                )}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>

        <div className="faq-sections">
          {faqSections.map((section) => (
            <section key={section.id} id={section.id} className="faq-category" aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              <div className="faq-list">
                {section.faqs.map((item) => (
                  <article key={item.question} className="faq-item">
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

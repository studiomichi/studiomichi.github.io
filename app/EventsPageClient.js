'use client';

import { useState } from 'react';
import { buildMailtoLink, studioEmailAddress } from './utils/contactEmail';

const arrangementOptions = [
  { id: 'bouquet', label: 'Bouquet', price: 275 },
  { id: 'boutonniere', label: 'Boutonniere', price: 30 },
  { id: 'wedding-party-bouquet', label: 'Wedding party bouquet', price: 125 },
  { id: 'aisle-piece', label: 'Aisle piece', price: 250 },
  { id: 'ground meadow', label: 'Ground meadow', price: 1500 },
  { id: 'arch', label: 'Arch', price: 3000 },
  { id: 'statement-piece', label: 'Statement piece (bar, welcome)', price: 300 },
  { id: 'centerpiece', label: 'Centerpiece', price: 200 },
  { id: 'pin-frog-arrangement', label: 'Pin frog arrangement', price: 80 },
  { id: 'budvases', label: 'Bud vase', price: 30 },
];

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const trackEvent = (action, category, extraData = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    page_path: window.location.pathname,
    ...extraData,
  });
};

function getLocalDateValue() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function EventsPageClient() {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(arrangementOptions.map(({ id }) => [id, 0])),
  );

  const getQuantity = (id) => (
    Number.isFinite(quantities[id]) ? quantities[id] : 0
  );

  const changeQuantity = (id, amount) => {
    setQuantities((currentQuantities) => {
      const currentQuantity = Number.isFinite(currentQuantities[id])
        ? currentQuantities[id]
        : 0;

      return {
        ...currentQuantities,
        [id]: Math.min(99, Math.max(0, currentQuantity + amount)),
      };
    });
  };

  const floralPiecesSubtotal = arrangementOptions.reduce(
    (total, { id, price }) => total + getQuantity(id) * price,
    0,
  );
  const laborCost = Math.round(floralPiecesSubtotal * 0.3 * 100) / 100;
  const estimatedTotal = floralPiecesSubtotal + laborCost;

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const body = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Phone: ${formData.get('phone') || ''}`,
      `Event type: ${formData.get('eventType')}`,
      `Event date: ${formData.get('eventDate')}`,
      `Planning stage: ${formData.get('planningStage') || ''}`,
      `How did you hear about us?: ${formData.get('referralSource') || ''}`,
      `Venue or location: ${formData.get('location') || ''}`,
      `Estimated guest count: ${formData.get('guestCount') || ''}`,
      `Floral investment: ${formData.get('floralInvestment') || ''}`,
      `Color, style, or other notes: ${formData.get('notes') || ''}`,
    ].join('\n\n');

    trackEvent('submit_event_inquiry', 'form', {
      event_type: formData.get('eventType'),
    });

    window.location.href = buildMailtoLink({
      subject: 'Event Inquiry',
      body,
    });
  };

  return (
    <section className="page page-events">
      <div className="section-header">
        <p className="eyebrow">Now booking for 2027 moments</p>
        <h1>Events & Gatherings</h1>
        <p>
          We offer floral design for intimate celebrations and gatherings, including small weddings and private events. From an elopement bouquet to the finishing touches for a dinner with your favorite people, we'll help bring your day to life.
        </p>
      </div>

      <section className="events-process" aria-labelledby="events-process-title">
        <div className="section-header">
          <h2 id="events-process-title">How it works</h2>
        </div>
        <ol className="events-process-list">
          <li>
            <h3>Inquiry</h3>
            <p>
              Share your event date, details and the floral pieces you have
              in mind using the inquiry form below. We'll reach out within 1 business day to confirm availability and get more details about your vision.
            </p>
          </li>
          <li>
            <h3>Proposal</h3>
            <p>
              We'll email you a personalized floral proposal with the floral details and prices within 3 business days. A complimentary one-on-one call to go over the proposal is available upon request. Your date is held for 7 days after receiving your proposal.
            </p>
          </li>
          <li>
            <h3>Reservation</h3>
            <p>
              When you're ready, your date is secured with a 20% non-refundable deposit and a signed contract.
            </p>
          </li>
          <li>
            <h3>Celebrate</h3>
            <p>
              We'll handle the floral details and work with your vendors or coordinator, and we'll be available to answer any questions leading up to your event. On the day of the event, we'll manage set-up, installation and tear-down (as needed) so you can enjoy your day!
            </p>
          </li>
        </ol>
      </section>

      <section className="events-form-section" id="event-inquiry" aria-labelledby="event-inquiry-title">
        <div className="section-header">
          <h2 id="event-inquiry-title">Tell us about your day</h2>
          <p>
            Complete the details below and we'll prepare an email inquiry
            for you to review and send.
          </p>
        </div>

        <form className="events-form" onSubmit={handleSubmit}>
          <div className="events-form-grid">
            <label className="events-field">
              <span>Name <span aria-hidden="true">*</span></span>
              <input autoComplete="name" name="name" required />
            </label>
            <label className="events-field">
              <span>Email <span aria-hidden="true">*</span></span>
              <input autoComplete="email" name="email" type="email" required />
            </label>
            <label className="events-field">
              <span>Phone</span>
              <input autoComplete="tel" name="phone" type="tel" />
            </label>
            <label className="events-field">
              <span>Event date <span aria-hidden="true">*</span></span>
              <input name="eventDate" type="date" min={getLocalDateValue()} required />
            </label>
            <label className="events-field">
              <span>Type of event <span aria-hidden="true">*</span></span>
              <select name="eventType" defaultValue="" required>
                <option value="" disabled>Select an event type</option>
                <option value="Intimate wedding">Intimate wedding (50 or fewer guests)</option>
                <option value="Elopement">Elopement</option>
                <option value="Engagement photoshoot">Engagement photoshoot</option>
                <option value="Private event">Private event</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="events-field">
              <span>Event/venue location <span aria-hidden="true">*</span></span>
              <input autoComplete="street-address" name="location" required />
            </label>
            <label className="events-field">
              <span>Where are you in the planning process? <span aria-hidden="true">*</span></span>
              <select name="planningStage" defaultValue="" required>
                <option value="">Select a planning stage</option>
                <option value="Just starting to explore">Just starting to explore prices</option>
                <option value="Date and venue are booked">Comparing between a few florists</option>
                <option value="Actively planning the details">Ready to book!</option>
              </select>
            </label>
            <label className="events-field">
              <span>How did you hear about us? <span aria-hidden="true">*</span></span>
              <select name="referralSource" defaultValue="" required>
                <option value="">Select a referral source</option>
                <option value="Google">Google</option>
                <option value="Instagram">Instagram</option>
                <option value="Pinterest">Pinterest</option>
                <option value="Tiktok">Tiktok</option>
                <option value="Word of mouth">Word of mouth</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="events-field">
              <span>Approximate guest count <span aria-hidden="true">*</span></span>
              <input name="guestCount" type="number" min="1" max="100" inputMode="numeric" required />
            </label>
            <label className="events-field">
              <span>Floral investment</span>
              <select name="floralInvestment" defaultValue="" required>
                <option value="">Select a range</option>
                <option value="300-1000">$300 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000-5000">$2,000 - $5,000</option>
                <option value="5000+">$5,000+</option>
              </select>
            </label>
          </div>

          <label className="events-field">
            <span>Other details</span>
            <textarea
              name="notes"
              rows="5"
              placeholder="Share your stylistic direction, color palette, floral pieces you're looking for, ins or any questions you have."
            />
          </label>

          <div className="events-form-submit">
            <button className="button" type="submit">Prepare inquiry email</button>
            <p>
              This opens your email app with the inquiry details for you to
              review and send. You can also email us at{' '}
              <a href={`mailto:${studioEmailAddress}`}>{studioEmailAddress}</a>.
            </p>
          </div>
        </form>
      </section>

      <section className="events-calculator-section" aria-labelledby="events-calculator-title">
        <div className="section-header">
          <h2 id="events-calculator-title">Floral estimator</h2>
          <p>
            Choose the quantities you're considering to see a rough estimate
            based on the minimum listed price for each piece. Prices are not personalized and do
            not include tax or delivery, so your final proposal may differ from
            this estimate.
          </p>
        </div>
        <fieldset className="events-arrangements">
          <legend>What floral pieces are you looking for?</legend>
          <div className="events-arrangement-list">
            {arrangementOptions.map(({ id, label, price }) => (
              <div className="events-arrangement-row" key={id}>
                <div className="events-arrangement-info">
                  <span>{label}</span>
                  <small>From {currencyFormatter.format(price)} each</small>
                </div>
                <div className="events-quantity">
                  <button
                    type="button"
                    aria-label={`Decrease ${label} quantity`}
                    onClick={() => changeQuantity(id, -1)}
                    disabled={getQuantity(id) === 0}
                  >
                    −
                  </button>
                  <output aria-label={`${getQuantity(id)} ${label}`}>
                    {getQuantity(id)}
                  </output>
                  <button
                    type="button"
                    aria-label={`Increase ${label} quantity`}
                    onClick={() => changeQuantity(id, 1)}
                    disabled={getQuantity(id) === 99}
                  >
                    +
                  </button>
                </div>
                <span className="events-line-total">
                  {currencyFormatter.format(getQuantity(id) * price)}
                </span>
              </div>
            ))}
          </div>
          <div className="events-estimate-breakdown" aria-live="polite">
            <div className="events-estimate-row">
              <span>Floral subtotal</span>
              <span>{currencyFormatter.format(floralPiecesSubtotal)}</span>
            </div>
            <div className="events-estimate-row">
              <span>Labor</span>
              <span>{currencyFormatter.format(laborCost)}</span>
            </div>
            <div className="events-total">
              <span>Minimum estimate</span>
              <strong>{currencyFormatter.format(estimatedTotal)}</strong>
            </div>
          </div>
        </fieldset>
      </section>
    </section>
  );
}

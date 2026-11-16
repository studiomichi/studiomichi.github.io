'use client';

import { useEffect, useRef, useState } from 'react';
import { buildMailtoLink, studioEmailAddress } from './utils/contactEmail';

const arrangementOptions = [
  { id: 'bouquet', label: 'Bouquet', price: 275 },
  { id: 'boutonniere', label: 'Boutonniere', price: 30 },
  { id: 'wedding-party-bouquet', label: 'Wedding party bouquet', price: 150 },
  { id: 'aisle-piece', label: 'Aisle piece', price: 250 },
  { id: 'ground meadow', label: 'Ground meadow', price: 1500 },
  { id: 'arch', label: 'Arch', price: 2000 },
  { id: 'statement-piece', label: 'Statement piece (bar, welcome)', price: 250 },
  { id: 'centerpiece', label: 'Centerpiece', price: 225 },
  { id: 'pin-frog-arrangement', label: 'Pin frog arrangement', price: 50 },
  { id: 'budvases', label: 'Bud vase', price: 25 },
];

const inquirySteps = [
  { name: 'name', label: 'Full name', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'eventDate', label: 'Event date', type: 'date', required: true },
  {
    name: 'eventType',
    label: 'Event type',
    required: true,
    placeholder: 'Select an event type',
    options: [
      ['Intimate wedding', 'Intimate wedding (50 or fewer guests)'],
      ['Elopement', 'Elopement'],
      ['Engagement photoshoot', 'Engagement photoshoot'],
      ['Private event', 'Private event'],
      ['Other', 'Other'],
    ],
  },
  { name: 'location', label: 'Event/venue location', autoComplete: 'street-address', required: true },
  {
    name: 'planningStage',
    label: 'Where are you in the planning process?',
    required: true,
    placeholder: 'Select a planning stage',
    options: [
      ['Just starting to explore', 'Just starting to explore prices'],
      ['Date and venue are booked', 'Comparing between a few florists'],
      ['Actively planning the details', 'Ready to book!'],
    ],
  },
  {
    name: 'referralSource',
    label: 'How did you hear about us?',
    required: true,
    placeholder: 'Select a referral source',
    options: [
      ['Google', 'Google'],
      ['Instagram', 'Instagram'],
      ['Pinterest', 'Pinterest'],
      ['Tiktok', 'Tiktok'],
      ['Word of mouth', 'Word of mouth'],
      ['Other', 'Other'],
    ],
  },
  {
    name: 'planner',
    label: 'Your event planner\'s name and contact',
    required: true,
    type: 'text',
    placeholder: "Your planner's name and website or social media handle.",
  },
  { name: 'guestCount', label: 'Approximate guest count', type: 'number', min: 1, max: 100, required: true },
  {
    name: 'floralInvestment',
    label: 'Floral investment',
    required: true,
    placeholder: 'Select a range',
    options: [
      ['300-1000', '$300 - $1,000'],
      ['1000-2000', '$1,000 - $2,000'],
      ['2000-5000', '$2,000 - $5,000'],
      ['5000+', '$5,000+'],
    ],
  },
  {
    name: 'notes',
    label: 'Other details',
    type: 'textarea',
    placeholder: "Share your stylistic direction, color palette, floral pieces you're looking for, or any questions you have.",
  },
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
  const processListRef = useRef(null);
  const formFieldRef = useRef(null);
  const [activeFormStep, setActiveFormStep] = useState(0);
  const [inquiry, setInquiry] = useState(
    Object.fromEntries(inquirySteps.map(({ name }) => [name, ''])),
  );
  const [quantities, setQuantities] = useState(
    Object.fromEntries(arrangementOptions.map(({ id }) => [id, 0])),
  );

  useEffect(() => {
    if (!window.matchMedia('(max-width: 640px)').matches) return;
    formFieldRef.current?.focus();
  }, [activeFormStep]);

  useEffect(() => {
    const processList = processListRef.current;
    if (!processList) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { root: processList, threshold: 0.5 },
    );

    processList.querySelectorAll('li').forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

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
  const currentFormStep = inquirySteps[activeFormStep];
  const formProgress = Math.round(((activeFormStep + 1) / inquirySteps.length) * 100);

  const updateInquiry = (event) => {
    const { name, value } = event.target;
    setInquiry((currentInquiry) => ({ ...currentInquiry, [name]: value }));
  };

  const renderInquiryField = (step, ref) => (
    <label className="events-field" key={step.name}>
      <span>
        {step.label}
        {step.required && <span aria-hidden="true"> *</span>}
      </span>
      {step.options ? (
        <select
          ref={ref}
          name={step.name}
          value={inquiry[step.name]}
          onChange={updateInquiry}
          required={step.required}
        >
          <option value="" disabled>{step.placeholder}</option>
          {step.options.map(([value, label]) => (
            <option value={value} key={value}>{label}</option>
          ))}
        </select>
      ) : step.type === 'textarea' ? (
        <textarea
          ref={ref}
          name={step.name}
          value={inquiry[step.name]}
          onChange={updateInquiry}
          rows="5"
          placeholder={step.placeholder}
        />
      ) : (
        <input
          ref={ref}
          name={step.name}
          type={step.type || 'text'}
          autoComplete={step.autoComplete}
          min={step.name === 'eventDate' ? getLocalDateValue() : step.min}
          max={step.max}
          inputMode={step.name === 'guestCount' ? 'numeric' : undefined}
          value={inquiry[step.name]}
          onChange={updateInquiry}
          required={step.required}
        />
      )}
    </label>
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    if (isMobile && activeFormStep < inquirySteps.length - 1) {
      if (!formFieldRef.current?.reportValidity()) return;
      setActiveFormStep((currentStep) => currentStep + 1);
      return;
    }

    const invalidField = Array.from(
      form.querySelectorAll(
        '.events-form-desktop input, .events-form-desktop select, .events-form-desktop textarea',
      ),
    ).find((field) => !field.checkValidity());

    if (invalidField) {
      if (isMobile) {
        const stepIndex = inquirySteps.findIndex(({ name }) => name === invalidField.name);
        if (stepIndex !== -1) setActiveFormStep(stepIndex);
      } else {
        invalidField.reportValidity();
      }
      return;
    }

    const body = [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone}`,
      `Event type: ${inquiry.eventType}`,
      `Event date: ${inquiry.eventDate}`,
      `Planning stage: ${inquiry.planningStage}`,
      `Planner: ${inquiry.planner}`,
      `How did you hear about us?: ${inquiry.referralSource}`,
      `Venue or location: ${inquiry.location}`,
      `Estimated guest count: ${inquiry.guestCount}`,
      `Floral investment: ${inquiry.floralInvestment}`,
      `Color, style, or other notes: ${inquiry.notes}`,
    ].join('\n\n');

    trackEvent('submit_event_inquiry', 'form', {
      event_type: inquiry.eventType,
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
        <ol className="events-process-list" ref={processListRef}>
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
              We'll email you a personalized floral proposal and contract with floral details and prices, including a brief moodboard, within 3 business days. A complimentary one-on-one call to go over the proposal is available upon request. Your date is held for 7 days after receiving your proposal.
            </p>
          </li>
          <li>
            <h3>Reservation</h3>
            <p>
              When you're ready, your date is secured with a 20% non-refundable deposit (or $500, whichever is lower) and a signed contract.
            </p>
          </li>
          <li>
            <h3>Celebrate</h3>
            <p>
              You'll get a more detailed floral moodboard specific to your venue and we'll handle the floral details and work with your planner or vendors. We'll be available to answer any questions leading up to your event. On the day of the event, we'll manage set-up, installation and tear-down (as needed) so you can enjoy your day!
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

        <form className="events-form" onSubmit={handleSubmit} noValidate>
          <div className="events-form-desktop">
            <div className="events-form-grid">
              {inquirySteps.slice(0, -1).map((step) => renderInquiryField(step))}
            </div>
            {renderInquiryField(inquirySteps[inquirySteps.length - 1])}
            <div className="events-form-submit">
              <button className="button" type="submit">Prepare inquiry email</button>
              <p>
                This opens your email app with the inquiry details for you to
                review and send. You can also email us at{' '}
                <a href={`mailto:${studioEmailAddress}`}>{studioEmailAddress}</a>.
              </p>
            </div>
          </div>

          <div className="events-form-mobile">
            <div
              className="events-form-progress-track"
              role="progressbar"
              aria-label="Inquiry form progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={formProgress}
              aria-valuetext={`${formProgress}% complete`}
            >
              <span style={{ width: `${formProgress}%` }} />
            </div>
            {renderInquiryField(currentFormStep, formFieldRef)}
            <div className="events-form-submit">
              <div className="events-form-navigation">
                {activeFormStep > 0 && (
                  <button
                    className="button events-form-back"
                    type="button"
                    onClick={() => setActiveFormStep((currentStep) => currentStep - 1)}
                  >
                    Back
                  </button>
                )}
                <button className="button" type="submit">
                  {activeFormStep === inquirySteps.length - 1 ? 'Prepare email' : 'Continue'}
                </button>
              </div>
              <p>
                This opens your email app with the inquiry details for you to
                review and send. You can also email us at{' '}
                <a href={`mailto:${studioEmailAddress}`}>{studioEmailAddress}</a>.
              </p>
            </div>
          </div>
        </form>
      </section>

      <section className="events-calculator-section" aria-labelledby="events-calculator-title">
        <div className="section-header">
          <h2 id="events-calculator-title">Floral estimator</h2>
          <p>
            Choose the quantities you're considering to see a rough estimate
            based on the average listed price for each piece. Prices are not personalized and do
            not include taxes, delivery or operational fees, so your final proposal may differ from
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
                  <small>Average {currencyFormatter.format(price)}/each</small>
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
              <span>Average estimate</span>
              <strong>{currencyFormatter.format(estimatedTotal)}</strong>
            </div>
          </div>
        </fieldset>
      </section>
    </section>
  );
}

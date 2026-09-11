'use client';

import {
  flowerCollabHref,
  flowerOrderHref,
  generalInquiryHref,
  studioEmailAddress,
} from './utils/contactEmail';

const trackEvent = (action, category, extraData = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    page_path: window.location.pathname,
    ...extraData,
  });
};

export default function ContactPageClient() {
  return (
    <section className="page page-contact">
      <div className="section-header">
        <p className="eyebrow">Let&apos;s talk flowers</p>
        <h1>Contact</h1>
        <p>
          For flower orders, please fill out and submit our flower order form. For any other inquiries, send us an email at <b>{studioEmailAddress}</b>. We&apos;ll get back to you within 1-3 days. For a quicker response, DM us on <b><a href="https://www.instagram.com/studiomichico/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('external_link_click_instagram', 'external_link', { destination: 'https://www.instagram.com/studiomichico/' })}>Instagram</a></b>!
        </p>
      </div>

      <div>
        <h3>For flower orders</h3>
        <p>Fill out our flower order form with your contact information, desired bouquet or arrangement style (classic or signature), any specific color/flower preferences, and your preferred pick-up or delivery date.</p>
        <a className="button contact-button" href={flowerOrderHref} target="_blank" rel="noopener noreferrer" aria-label="Open the flower order form in a new tab" onClick={() => trackEvent('external_link_click_flowerorderform', 'external_link', { destination: flowerOrderHref })}>Flower order form</a>
      </div>

      <div>
        <h3>For events or collaborations</h3>
        <p>Reach out with your contact information and details about pop-ups, your event or collaboration idea.</p>
        <a className="button contact-button" href={flowerCollabHref} aria-label="Email Studio Michi for event or collaboration inquiries" onClick={() => trackEvent('external_link_click_eventcollab', 'external_link', { destination: flowerCollabHref })}>Email for event or collaboration inquiries</a>
      </div>

      <div>
        <h3>For general inquiries</h3>
        <p>Reach out with any questions you may have.</p>
        <a className="button contact-button" href={generalInquiryHref} aria-label="Email Studio Michi with a general question" onClick={() => trackEvent('external_link_click_generalinquiry', 'external_link', { destination: generalInquiryHref })}>Email for general inquiries</a>
      </div>
    </section>
  );
}

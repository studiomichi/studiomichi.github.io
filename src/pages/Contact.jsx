import { flowerOrderHref, flowerCollabHref, flowerOrderInquiry, flowerCollabInquiry, generalInquiryHref, generalInquiry, studioEmailAddress } from '../utils/contactEmail';

export default function Contact() {
  return (
    <section className="page page-contact">
      <div className="section-header">
        <p className="eyebrow">Let's talk flowers</p>
        <h1>Contact</h1>
        <p>Send an email to <b>{studioEmailAddress}</b> to place a one-time or subscription order, inquire about pop-up events or collaborations, or if you just have a question! We'll get back to you within 24-48 hours. For a quicker response, DM us on <b><a href="https://www.instagram.com/studiomichico/" target="_blank" rel="noopener noreferrer">Instagram</a></b>!</p>
      </div>

      <div>
        <h2>For flower orders</h2>
        <p>Reach out with your contact information, desired bouquet or arrangement style (classic or signature), any specific color/flower preferences, and your preferred pick-up or delivery date.</p>
        <a className="button contact-button" href={flowerOrderHref}>
          {flowerOrderInquiry.label}
        </a>
      </div>

      <div>
        <h2>For events, collaborations or special orders</h2>
        <p>Reach out with your contact information and details about pop-ups, your event or collaboration idea, or if you're interested in ordering custom arrangements for your shop or business.</p>
        <a className="button contact-button" href={flowerCollabHref}>
          {flowerCollabInquiry.label}
        </a>
      </div>

      <div>
        <h2>For general inquiries</h2>
        <p>Reach out with any questions you may have.</p>
        <a className="button contact-button" href={generalInquiryHref}>
          {generalInquiry.label}
        </a>
      </div>
    </section>
  );
}

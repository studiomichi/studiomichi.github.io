import { flowerOrderHref, flowerCollabHref, flowerOrderInquiry, flowerCollabInquiry, generalInquiryHref, generalInquiry, studioEmailAddress } from '../utils/contactEmail';

export default function Contact() {
  return (
    <section className="page page-contact">
      <div className="section-header">
        <p className="eyebrow">Let's talk flowers</p>
        <h1>Contact</h1>
        <p>Send an email to <b>{studioEmailAddress}</b> to place a one-time or subscription order, inquire about pop-up events or collaborations, or if you just have a question! We'll get back to you within 1-3 days. For a quicker response, DM us on <b><a href="https://www.instagram.com/studiomichico/" target="_blank" rel="noopener noreferrer">Instagram</a></b>!</p>
      </div>

      <div>
        <h2>For flower orders</h2>
        <p>Reach out with your contact information, desired bouquet or arrangement style (classic or signature), any specific color/flower preferences, and your preferred pick-up or delivery date.</p>
        <a className="button contact-button" href={flowerOrderHref} target="_blank" rel="noopener noreferrer" aria-label="Open the flower order form in a new tab">
          {flowerOrderInquiry.label}
        </a>
      </div>

      <div>
        <h2>For events or collaborations</h2>
        <p>Reach out with your contact information and details about pop-ups, your event or collaboration idea.</p>
        <a className="button contact-button" href={flowerCollabHref} aria-label="Email Studio Michi for event or collaboration inquiries">
          {flowerCollabInquiry.label}
        </a>
      </div>

      <div>
        <h2>For general inquiries</h2>
        <p>Reach out with any questions you may have.</p>
        <a className="button contact-button" href={generalInquiryHref} aria-label="Email Studio Michi with a general question">
          {generalInquiry.label}
        </a>
      </div>
    </section>
  );
}

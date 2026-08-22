export const studioEmailAddress = 'studiomichico@gmail.com';

// Flower order email content
export const flowerOrderInquiry = {
  subject: 'Flower Order Inquiry',
  label: 'Email for flower orders',
  buttonLabel: 'Inquire',
  body: `All orders are available for scheduled complimentary pick-up in Seattle/Central District (Wednesday - Saturday between 10am - 7pm) or delivery within 10 miles of the studio (Friday - Saturday between 10am - 1pm). Delivery outside of this location and time range is available for a fee (starting from $10 based on zip code). We recommend placing orders at least 5 days in advance. If you need specific flowers, please order at least 3 weeks in advance.

          Note that due to the perishable nature of our work, all sales are final.

          Please respond with the following to start your flower order:
          Full name:
          Preferred email:
          Phone:
          How'd you hear about me?:

          Bouquet or arrangement?:
          Classic or signature?:
          Color preferences (if any):
          Flower preferences (dependent on market availability):
          Pick-up or delivery (if delivery, please provide delivery address and any special notes on access):
          Pick-up or delivery date/time:
          Additional notes or requests:`,
};

// Flower collab email content
export const flowerCollabInquiry = {
  subject: 'Special Flower Inquiry',
  label: 'Email for special order inquiries',
  buttonLabel: 'Inquire',
  body: `Full name:
          Preferred email:
          Phone:
          How'd you hear about me?:

          Please share details about your event or special order:
          When will you need the flowers?:`,
};

// General email content
export const generalInquiry = {
  subject: 'General Inquiry',
  label: 'Email for general inquiries',
  buttonLabel: 'Inquire',
  body: ``,
};

export const flowerOrderHref = buildMailtoLink({
  subject: flowerOrderInquiry.subject,
  body: flowerOrderInquiry.body,
});

export const flowerCollabHref = buildMailtoLink({
  subject: flowerCollabInquiry.subject,
  body: flowerCollabInquiry.body,
});

export const generalInquiryHref = buildMailtoLink({
  subject: generalInquiry.subject,
  body: generalInquiry.body,
});


export function buildMailtoLink({ to = studioEmailAddress, subject, body }) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function renderButtonLink({ label, href, className = 'button' }) {
  return `<a href="${href}" class="${className}">${label}</a>`;
}

export function trackEvent(action, category, label, extraData = {}) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    page_path: window.location.pathname,
    ...extraData,
  });
}

export function trackPageView(pathname) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('config', 'G-2JLLHJ2TSD', {
    page_path: pathname,
    page_title: document.title,
  });
}

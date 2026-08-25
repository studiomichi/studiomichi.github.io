export function trackEvent(action, category, extraData = {}) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    page_path: window.location.pathname,
    ...extraData,
  });
}

export function trackPageView(pathname) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  const isLocalDev = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  window.gtag('config', 'G-2JLLHJ2TSD', {
    page_path: pathname,
    page_title: document.title,
    ...(isLocalDev ? { debug_mode: true } : {}),
  });
}

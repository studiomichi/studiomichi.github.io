'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

const GA_ID = 'G-2JLLHJ2TSD';

export function trackEvent(action, category, extraData = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    page_path: window.location.pathname,
    ...extraData,
  });
}

export function trackPageView(pathname) {
  if (typeof window === 'undefined' || !window.gtag) return;

  const isLocalDev = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  window.gtag('config', GA_ID, {
    page_path: pathname,
    page_title: document.title,
    ...(isLocalDev ? { debug_mode: true } : {}),
  });
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;

    const url = pathname + (searchParams && searchParams.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

import { useEffect } from 'react';

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) return undefined;

    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      window.dataLayer.push(args);
    }

    window.gtag = window.gtag || gtag;
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.dataset.googleAnalytics = measurementId;
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return null;
}

"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.getAttribute('data-delay');
          if (delay) {
            setTimeout(() => {
              el.classList.add('revealed');
            }, parseInt(delay, 10));
          } else {
            el.classList.add('revealed');
          }
          // Unobserve once revealed for performance
          observer.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    });

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => {
      // If already in viewport or previously revealed, keep revealed
      if (!el.classList.contains('revealed')) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

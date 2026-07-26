"use client";

import { useEffect } from "react";

export function ScrollRevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (elements.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.classList.remove("is-reveal-pending");
        element.classList.add("is-revealed");
        observer.unobserve(element);
      }
    }, { rootMargin: "0px 0px -28% 0px", threshold: 0.01 });

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.72) {
        element.classList.add("is-revealed");
        return;
      }
      element.classList.add("is-reveal-pending");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

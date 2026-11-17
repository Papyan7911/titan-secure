"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const motionTargets = [
  ".trust-strip",
  ".services-section",
  ".service-card",
  ".about-band",
  ".projects-section",
  ".project-card",
  ".testimonial",
  ".final-cta",
  ".page-intro-inner",
  ".detail-service",
  ".story-image",
  ".story-copy",
  ".value-card",
  ".service-area-band",
  ".product-card",
  ".gallery-note",
  ".gallery-card",
  ".quote-form-wrap",
  ".quote-aside",
  ".contact-quick-card",
  ".contact-message-layout",
  ".faq-aside",
  ".faq-item",
  ".legal-aside",
  ".legal-copy",
].join(", ");

export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = document.querySelectorAll<HTMLElement>(motionTargets);
    const hero = document.querySelector<HTMLElement>(".hero");
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const revealEverything = () => {
      document.documentElement.classList.remove("motion-ready");
      observer?.disconnect();
      observer = null;
      targets.forEach((target) => target.classList.add("motion-visible"));
    };

    const enableMotion = () => {
      document.documentElement.classList.add("motion-ready");
      observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("motion-visible");
            currentObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
      );
      targets.forEach((target) => observer?.observe(target));
    };

    const configureMotion = () => {
      if (preference.matches) revealEverything();
      else enableMotion();
    };

    const updateParallax = () => {
      frame = 0;
      if (!hero || preference.matches) return;
      const offset = Math.max(-85, Math.min(0, hero.getBoundingClientRect().top * 0.14));
      hero.style.setProperty("--hero-scroll-y", `${offset}px`);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!hero || preference.matches || event.pointerType !== "mouse" || window.innerWidth < 801) return;
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * -12;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
      hero.style.setProperty("--hero-pointer-x", `${x}px`);
      hero.style.setProperty("--hero-pointer-y", `${y}px`);
    };

    const clearPointer = () => {
      hero?.style.removeProperty("--hero-pointer-x");
      hero?.style.removeProperty("--hero-pointer-y");
    };

    configureMotion();
    updateParallax();
    preference.addEventListener("change", configureMotion);
    window.addEventListener("scroll", onScroll, { passive: true });
    hero?.addEventListener("pointermove", onPointerMove, { passive: true });
    hero?.addEventListener("pointerleave", clearPointer);

    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configureMotion);
      window.removeEventListener("scroll", onScroll);
      hero?.removeEventListener("pointermove", onPointerMove);
      hero?.removeEventListener("pointerleave", clearPointer);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}

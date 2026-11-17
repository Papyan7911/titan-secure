"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";

const slides = [
  {
    image: "photo-1557597774-9d273605dfa9",
    alt: "Security cameras monitoring a brick wall",
    kicker: "PROTECTION THAT FEELS PERSONAL",
    title: <>Peace of mind.<br />By design<span className="hero-period">.</span></>,
    description: "Thoughtful security for the places and people you care about. Designed around you, installed by experts, supported for life.",
    action: "Let’s talk security",
    href: "/quote",
  },
  {
    image: "photo-1600607687939-ce8a6c25118c",
    alt: "A warmly lit home, thoughtfully protected",
    kicker: "FEEL SAFER RIGHT AT HOME",
    title: <>Your home.<br />Your sanctuary<span className="hero-period">.</span></>,
    description: "Feel more at ease in the place that matters most. We’ll help find the right fit for you and your family.",
    action: "Protect your home",
    href: "/quote",
  },
  {
    image: "photo-1497366811353-6870744d04b2",
    alt: "A bright, modern office protected with smart security",
    kicker: "LOOK AFTER WHAT YOU’VE BUILT",
    title: <>Business, meet<br />peace of mind<span className="hero-period">.</span></>,
    description: "Straightforward security for your workplace, your team, and everything you’ve worked hard to build.",
    action: "Secure your business",
    href: "/quote",
  },
  {
    image: "photo-1581092160562-40aa08e78837",
    alt: "A security professional working with technical equipment",
    kicker: "EXPERTS IN YOUR CORNER",
    title: <>Good people.<br />Security that lasts<span className="hero-period">.</span></>,
    description: "Careful installation, straightforward advice, and ongoing support from the same friendly local team.",
    action: "Meet your security team",
    href: "/about",
  },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const transitionTimeout = useRef<number | null>(null);
  const slide = slides[activeIndex];

  const goToSlide = useCallback((index: number) => {
    const nextIndex = (index + slides.length) % slides.length;
    if (nextIndex === activeIndex) return;

    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);
    if (transitionTimeout.current !== null) window.clearTimeout(transitionTimeout.current);
    transitionTimeout.current = window.setTimeout(() => {
      setPreviousIndex(null);
      transitionTimeout.current = null;
    }, 750);
  }, [activeIndex]);

  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => () => {
    if (transitionTimeout.current !== null) window.clearTimeout(transitionTimeout.current);
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setAutoPlayEnabled(!motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!autoPlayEnabled || isPaused) return;

    const timer = window.setInterval(goToNext, 6000);
    return () => window.clearInterval(timer);
  }, [activeIndex, autoPlayEnabled, goToNext, isPaused]);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Titan Alarm & Electronics security solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) setIsPaused(false);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const startX = touchStartX.current;
        const endX = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (startX === null || endX === undefined || Math.abs(endX - startX) < 50) return;
        if (endX < startX) goToNext();
        else goToPrevious();
      }}
    >
      {previousIndex !== null && (
        <div className="hero-photo hero-photo-outgoing" key={`outgoing-${slides[previousIndex].image}`} aria-hidden="true">
          <Image
            src={`https://images.unsplash.com/${slides[previousIndex].image}?auto=format&fit=crop&w=1800&q=85`}
            alt=""
            fill
            sizes="(max-width: 850px) 100vw, 55vw"
          />
        </div>
      )}
      <div className="hero-photo hero-photo-current" key={`current-${slide.image}`}>
        <Image
          src={`https://images.unsplash.com/${slide.image}?auto=format&fit=crop&w=1800&q=85`}
          alt={slide.alt}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 850px) 100vw, 55vw"
        />
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-copy" key={slide.image} aria-live="polite" aria-atomic="true">
          <span className="hero-kicker"><span className="live-dot" /> {slide.kicker}</span>
          <h1>{slide.title}</h1>
          <p>{slide.description}</p>
          <div className="hero-actions">
            <Link href={slide.href} className="button button-silver">{slide.action} <Icon name="arrow" size={18} /></Link>
            <Link href="/services" className="hero-secondary">Explore our services <Icon name="arrow" size={16} /></Link>
          </div>
          <div className="hero-proof">
            <span><Icon name="check" size={15} /> No-pressure advice</span>
            <span><Icon name="check" size={15} /> Professionally installed</span>
            <span><Icon name="check" size={15} /> Here when you need us</span>
          </div>
        </div>
        <div className="hero-status"><span className="status-icon"><Icon name="shield" size={20} /></span><span><strong>You’re in good hands.</strong><small>Trusted local security experts</small></span><span className="status-online" aria-label="Online" /></div>
        <div className="hero-controls" aria-label="Slide controls">
          <span className="hero-counter" aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} <span>/</span> {String(slides.length).padStart(2, "0")}</span>
          <div className="hero-dots" aria-label="Choose a slide">
            {slides.map((item, index) => (
              <button
                key={item.image}
                type="button"
                className={`hero-dot${index === activeIndex ? " is-active" : ""}`}
                aria-label={`Go to slide ${index + 1} of ${slides.length}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <button type="button" className="hero-arrow" aria-label="Previous slide" onClick={goToPrevious}><Icon name="arrow" size={17} className="arrow-previous" /></button>
          <button type="button" className="hero-arrow" aria-label="Next slide" onClick={goToNext}><Icon name="arrow" size={17} /></button>
        </div>
      </div>
    </section>
  );
}

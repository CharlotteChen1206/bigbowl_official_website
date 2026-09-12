"use client";

import { Oswald } from "next/font/google";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const pageHeroTitleFont = Oswald({
  subsets: ["latin"],
  weight: "500"
});

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  mobileBackgroundImage?: string;
};

export function PageHero({
  eyebrow,
  title,
  backgroundImage = "/menu-photos/subpage-banner-desktop-v2.webp",
  mobileBackgroundImage = "/menu-photos/subpage-banner-mobile-v2.webp"
}: PageHeroProps) {
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const alignBackground = () => {
      // Fixed backgrounds use viewport coordinates; align to the banner's
      // bottom at scroll zero, then leave that position fixed during scrolling.
      const bottom = card.getBoundingClientRect().bottom + window.scrollY;
      const imageHeight = document.documentElement.clientWidth * (1086 / 1448);
      card.style.setProperty("--desktop-banner-top", `${bottom - imageHeight}px`);
    };
    alignBackground();
    const observer = new ResizeObserver(alignBackground);
    observer.observe(card);
    window.addEventListener("resize", alignBackground);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", alignBackground);
    };
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setHeroTextVisible(true);
    }, 260);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <section className="subpage-hero">
      <div
        ref={cardRef}
        className="subpage-hero-card food-banner"
        style={{
          "--page-hero-background": `url("${backgroundImage}")`,
          "--page-hero-mobile-background": `url("${mobileBackgroundImage}")`,
        } as CSSProperties}
      >
        <div className="subpage-hero-overlay" />
        <div className="subpage-hero-copy">
          <div className={`subpage-hero-copy-inner${heroTextVisible ? " is-visible" : ""}`}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className={pageHeroTitleFont.className}>{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Oswald } from "next/font/google";
import { useEffect, useState, type CSSProperties } from "react";
import textureHeroImage from "@/images/background 3.png";

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

export function PageHero({ eyebrow, title, backgroundImage, mobileBackgroundImage }: PageHeroProps) {
  const [heroTextVisible, setHeroTextVisible] = useState(false);

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
        className="subpage-hero-card"
        style={{
          "--page-hero-background": `url("${backgroundImage ?? textureHeroImage.src}")`,
          "--page-hero-mobile-background": `url("${mobileBackgroundImage ?? backgroundImage ?? textureHeroImage.src}")`,
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

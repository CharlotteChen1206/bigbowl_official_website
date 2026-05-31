"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import heroImage from "@/images/hero horizontal.png";
import outsideViewImage from "@/images/outside view bg.png";
import redBackgroundImage from "@/images/red bg.png";
import { OrderOnlineSection } from "@/app/components/OrderOnlineSection";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { processSteps } from "@/app/site-data";

export default function Home() {
  const heroShellRef = useRef<HTMLElement | null>(null);
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const howStepsRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frameId = 0;

    const updateHero = () => {
      const heroShell = heroShellRef.current;
      const heroCard = heroCardRef.current;

      if (!heroShell || !heroCard) {
        return;
      }

      const shellRect = heroShell.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollRange = Math.max(heroShell.offsetHeight - viewportHeight, 1);
      const progress = Math.min(Math.max(-shellRect.top / totalScrollRange, 0), 1);
      const isMobile = window.innerWidth <= 720;
      const imageProgress = 1 - Math.pow(1 - progress, 1.05);
      const imageStartShift = 0;
      const imageEndShift = isMobile ? -72 : -80;
      const imageShift = imageStartShift + (imageEndShift - imageStartShift) * imageProgress;
      const imageScale = (isMobile ? 1.08 : 1.06) - imageProgress * 0.03;
      const fadeStart = 0.03;
      const fadeEnd = 0.28;
      const holdEnd = 0.78;
      const textFadeProgress = Math.min(Math.max((progress - fadeStart) / (fadeEnd - fadeStart), 0), 1);
      const textFadeEased = 1 - Math.pow(1 - textFadeProgress, 1.8);
      const textExitProgress = Math.min(Math.max((progress - holdEnd) / (1 - holdEnd), 0), 1);
      const textExitEased = Math.pow(textExitProgress, 1.8);
      const copyOpacity = textFadeEased * (1 - textExitEased * 0.08);
      const copyShift = (isMobile ? 120 : 136) * progress;
      const blur = (1 - textFadeEased) * 8 + textExitEased * 1;
      const glow = 0.08 + textFadeEased * 0.14;
      const titleGlow = 0.05 + textFadeEased * 0.1;
      const overlayStrength = 0.86 + imageProgress * 0.18;

      heroCard.style.setProperty("--hero-image-shift", `${imageShift}px`);
      heroCard.style.setProperty("--hero-image-scale", `${imageScale}`);
      heroCard.style.setProperty("--hero-copy-shift", `${copyShift}px`);
      heroCard.style.setProperty("--hero-copy-opacity", `${copyOpacity}`);
      heroCard.style.setProperty("--hero-blur", `${blur}px`);
      heroCard.style.setProperty("--hero-welcome-opacity", `${copyOpacity}`);
      heroCard.style.setProperty("--hero-title-opacity", `${copyOpacity}`);
      heroCard.style.setProperty("--hero-gold-glow", `${glow}`);
      heroCard.style.setProperty("--hero-title-glow", `${titleGlow}`);
      heroCard.style.setProperty("--hero-overlay-strength", `${overlayStrength}`);
    };

    const handleScroll = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(updateHero);
    };

    updateHero();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const isTouchLike = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const howStepsRow = howStepsRowRef.current;

    if (!isTouchLike || !howStepsRow) {
      return;
    }

    howStepsRow.classList.add("touch-animated");

    const stepCards = Array.from(howStepsRow.querySelectorAll<HTMLElement>(".how-step"));

    if (stepCards.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          target.classList.add("is-visible");
          observer.unobserve(target);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    stepCards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main id="top">
      <section className="hero-shell" ref={heroShellRef}>
        <SiteHeader currentPath="/" />

        <div className="hero-card" ref={heroCardRef}>
          <Image
            className="hero-image"
            src={heroImage}
            alt="Big Bowl Hot Pot dining experience"
            priority
          />
          <div className="hero-overlay" />
          <div className="hero-copy">
            <p className="hero-welcome">Welcome to</p>
            <h1 className="hero-title">BIG BOWL</h1>
          </div>
        </div>
      </section>

      <section className="intro-grid">
        <article className="intro-panel copy-panel">
          <h2 className="about-heading">
            <span>ABOUT</span>
            <span>US</span>
          </h2>
          <div className="about-copy">
            <p>
              MalaTang is a popular dish originating from China and is often
              described as a personalized hot pot experience.
            </p>
            <p>
              Whether you&apos;re craving a hearty meal, something light, or a little bit of
              everything, MalaTang lets you customize your bowl exactly the way you like it.
            </p>
            <p>
              With over 60 fresh ingredients and 9 unique soup bases to choose from, you can
              create a bowl that perfectly matches your taste and mood.
            </p>
          </div>
          <Link className="solid-button about-button" href="/menu">
            Explore Menu
          </Link>
        </article>

        <article className="intro-panel image-panel about-image-panel">
          <Image
            className="about-image-background"
            src={redBackgroundImage}
            alt=""
            aria-hidden="true"
          />
          <div className="about-image-foreground">
            <Image src={outsideViewImage} alt="Exterior view of Big Bowl Hot Pot" />
          </div>
        </article>
      </section>

      <section className="experience-section" id="experience">
        <div className="how-it-works-layout">
          <div className="how-top-panel">
            <article className="how-copy-panel">
              <h2 className="how-heading horizontal">
                <span>HOW IT WORKS</span>
              </h2>
              <div className="how-copy">
                <p>Pick up a bowl and tongs beside the refrigerated display and choose your favorite ingredients.</p>
                <p>
                  All ingredients are priced by weight at <strong>$3.99 per 100g.</strong> You can share a bowl with friends or enjoy one all to yourself.
                </p>
                <p>
                  Choose one soup base per bowl, and we&apos;ll cook it and bring it to you once
                  it&apos;s ready.
                </p>
              </div>
            </article>
          </div>

          <div className="how-steps-row" ref={howStepsRowRef}>
            {processSteps.map((step, index) => (
              <article className="how-step" key={step.title} style={{ transitionDelay: `${index * 90}ms` }}>
                <Image src={step.image} alt={step.title} />
                <div className="how-step-copy">
                  <span className="how-step-number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <OrderOnlineSection />

      <SiteFooter />
    </main>
  );
}


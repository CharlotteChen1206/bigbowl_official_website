"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logoImage from "@/images/Logo-removebg.png";
import { siteConfig } from "@/app/lib/site-config";
import { navItems } from "@/app/site-data";

type SiteHeaderProps = {
  currentPath?: string;
};

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="site-header page-header">
        <Link className="brand" href="/" aria-label="Big Bowl Hot Pot home">
          <Image src={logoImage} alt="Big Bowl Hot Pot" priority />
        </Link>

        <div className="header-main">
          <p className="header-tagline">
            {siteConfig.name} {siteConfig.chineseName} | Best Self-Served Hot Pot in Calgary
          </p>

          <nav className="site-nav" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={currentPath === item.href ? "is-active" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="header-actions">
          <Link className="solid-button header-reserve-button" href="/reservation">
            Reserve
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${mobileMenuOpen ? " is-open" : ""}`}>
        <div className="mobile-menu-inner">
          <p className="mobile-menu-tagline">
            {siteConfig.name} {siteConfig.chineseName} | Best Self-Served Hot Pot in Calgary
          </p>
          <nav className="mobile-menu-nav" aria-label="Mobile Primary">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/reservation" onClick={() => setMobileMenuOpen(false)}>
              Reservation
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

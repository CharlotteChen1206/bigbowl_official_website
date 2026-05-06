import Image from "next/image";
import Link from "next/link";
import heroImage from "@/images/hero horizontal.png";
import logoImage from "@/images/Logo-removebg.png";
import { siteConfig } from "@/app/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Image className="footer-background" src={heroImage} alt="" aria-hidden="true" />
      <div className="footer-overlay" />
      <div className="footer-content">
        <Image className="footer-logo" src={logoImage} alt="Big Bowl Hot Pot" />
        <p className="footer-kicker">Warm bowls, slow evenings, one last invitation</p>
        <h2>LET&apos;S EAT.</h2>
        <p>Create your perfect bowl and enjoy the flavors of MalaTang.</p>
        <Link className="solid-button footer-button" href="/reservation">
          Reserve Table
        </Link>
        <div className="footer-contact">
          <span>Or Call Us : {siteConfig.phone}</span>
        </div>
        <div className="footer-icons" aria-label="Social and contact links">
          <a href={siteConfig.social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.5 21v-7.2h2.4l.36-2.8H13.5V9.21c0-.81.22-1.36 1.38-1.36H16.5V5.34c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.91 1.42-3.91 4.03V11H7.8v2.8h2.45V21h3.25Z" />
            </svg>
          </a>
          <a href={siteConfig.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.25 3h9.5A4.25 4.25 0 0 1 21 7.25v9.5A4.25 4.25 0 0 1 16.75 21h-9.5A4.25 4.25 0 0 1 3 16.75v-9.5A4.25 4.25 0 0 1 7.25 3Zm0 1.8A2.45 2.45 0 0 0 4.8 7.25v9.5a2.45 2.45 0 0 0 2.45 2.45h9.5a2.45 2.45 0 0 0 2.45-2.45v-9.5A2.45 2.45 0 0 0 16.75 4.8h-9.5Zm9.95 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.6A4.4 4.4 0 1 1 7.6 12 4.4 4.4 0 0 1 12 7.6Zm0 1.8A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4Z" />
            </svg>
          </a>
          <a href={siteConfig.social.maps} aria-label="Google Map" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5a6.75 6.75 0 0 0-6.75 6.75c0 4.85 6.1 11.47 6.36 11.75a.53.53 0 0 0 .78 0c.26-.28 6.36-6.9 6.36-11.75A6.75 6.75 0 0 0 12 2.5Zm0 9.5a2.75 2.75 0 1 1 2.75-2.75A2.75 2.75 0 0 1 12 12Z" />
            </svg>
          </a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Gmail">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.5 5h15A2.5 2.5 0 0 1 22 7.5v9A2.5 2.5 0 0 1 19.5 19h-15A2.5 2.5 0 0 1 2 16.5v-9A2.5 2.5 0 0 1 4.5 5Zm0 1.8a.7.7 0 0 0-.39.12L12 12.28l7.89-5.36a.7.7 0 0 0-.39-.12h-15Zm15.7 2.07-7.7 5.23a.9.9 0 0 1-1 0L3.8 8.87v7.63c0 .39.31.7.7.7h15c.39 0 .7-.31.7-.7V8.87Z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="footer-meta">
        <span>Copyright © 2026 {siteConfig.legalName}</span>
        <span>{siteConfig.url}</span>
      </div>
    </footer>
  );
}

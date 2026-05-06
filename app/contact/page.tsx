import type { Metadata } from "next";
import { PageHero } from "@/app/components/PageHero";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { contactDetails } from "@/app/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find Big Bowl Hot Pot in Calgary, check opening hours, call the restaurant, or get directions to 1211 Edmonton Trail.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader currentPath="/contact" />
      <PageHero
        eyebrow="Get in touch"
        title="CONTACT"
      />

      <section className="contact-page-section page-section">
        <div className="contact-info-layout">
          <article className="contact-info-panel">
            <div className="contact-info-group">
              <h2>Contact Info</h2>
              <dl className="contact-info-list">
                <div>
                  <dt>Phone</dt>
                  <dd className="contact-phone">{contactDetails.phone}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{contactDetails.email}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{contactDetails.address}</dd>
                </div>
              </dl>
            </div>

            <div className="contact-info-group">
              <h2>Opening Hours</h2>
              <dl className="contact-info-list">
                {contactDetails.hours.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>

          <div className="contact-image-panel" aria-hidden="true">
            <img src="/contact/dining-area-bg.png" alt="" />
          </div>
        </div>

        <div className="contact-map-shell">
          <iframe
            title="Big Bowl Hot Pot location map"
            src="https://maps.google.com/maps?q=1211%20Edmonton%20Trail%20%23130%2C%20Calgary%2C%20AB%20T2E%206X4&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

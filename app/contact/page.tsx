import type { Metadata } from "next";
import { PageHero } from "@/app/components/PageHero";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { absoluteUrl, siteConfig } from "@/app/lib/site-config";
import { contactDetails } from "@/app/site-data";

export const metadata: Metadata = {
  title: "Contact & Parking",
  description:
    "Find Big Bowl Hot Pot in Calgary, get directions, check opening hours, and view free rear parking details for Big Bowl Hot Pot.",
  keywords: [
    "Big Bowl Hot Pot parking",
    "big bowl hot pot parking",
    "Big Bowl Hot Pot Calgary parking",
    "Big Bowl Hot Pot contact",
    "Calgary hot pot parking"
  ],
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "Contact & Parking | Big Bowl Hot Pot",
    description:
      "Get directions to Big Bowl Hot Pot in Calgary and see where free parking is available behind the restaurant.",
    url: "/contact",
    images: [
      {
        url: absoluteUrl("/contact/big-bowl-hot-pot-parking-map.png"),
        width: 666,
        height: 677,
        alt: "Big Bowl Hot Pot parking map showing free rear parking and the liquor store no-parking zone"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Parking | Big Bowl Hot Pot",
    description:
      "Get directions to Big Bowl Hot Pot in Calgary and see free rear parking details.",
    images: [absoluteUrl("/contact/big-bowl-hot-pot-parking-map.png")]
  }
};

export default function ContactPage() {
  const parkingDescription =
    "Free parking is available behind Big Bowl Hot Pot. Please use the rear parking stalls shown in green and do not park in the liquor store no-parking zone shown with the orange X.";

  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluteUrl("/contact#big-bowl-hot-pot"),
    name: siteConfig.name,
    url: absoluteUrl("/contact"),
    telephone: contactDetails.phone,
    email: contactDetails.email,
    image: absoluteUrl("/contact/big-bowl-hot-pot-parking-map.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "1211 Edmonton Trail #130",
      addressLocality: "Calgary",
      addressRegion: "AB",
      postalCode: "T2E 6X4",
      addressCountry: "CA"
    },
    hasMap: siteConfig.social.maps,
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Free rear parking",
        value: true,
        description: parkingDescription
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />
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

        <section className="parking-section" id="parking" aria-labelledby="parking-title">
          <div className="parking-copy">
            <p className="parking-eyebrow">Big Bowl Hot Pot parking</p>
            <h2 id="parking-title">Free Parking</h2>
            <p>{parkingDescription}</p>
          </div>
          <figure className="parking-map-card">
            <img
              src="/contact/big-bowl-hot-pot-parking-map.png"
              alt="Big Bowl Hot Pot parking map showing free parking behind the restaurant and the liquor store no-parking zone"
              width="666"
              height="677"
            />
            <figcaption>
              Use the rear parking area behind Big Bowl Hot Pot. Avoid the marked liquor store no-parking zone.
            </figcaption>
          </figure>
        </section>

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

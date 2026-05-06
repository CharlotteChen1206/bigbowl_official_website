import type { Metadata } from "next";
import Image from "next/image";
import menuBrothsImage from "@/images/menu-broths.png";
import menuSpecialsImage from "@/images/menu-specials.png";
import { PageHero } from "@/app/components/PageHero";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore Big Bowl Hot Pot's self-served MalaTang menu, including broths, ingredients, add-ons, and specials in Calgary.",
  alternates: {
    canonical: "/menu"
  }
};

export default function MenuPage() {
  return (
    <main>
      <SiteHeader currentPath="/menu" />
      <PageHero eyebrow="Explore our" title="MENU" />

      <section className="menu-gallery page-section" aria-label="Menu Posters">
        <article className="menu-poster-card">
          <Image
            className="menu-poster-image"
            src={menuBrothsImage}
            alt="Big Bowl Hot Pot broth menu poster"
          />
        </article>

        <article className="menu-poster-card">
          <Image
            className="menu-poster-image"
            src={menuSpecialsImage}
            alt="Big Bowl Hot Pot special menu poster"
          />
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { NewsMedia } from "@/app/components/NewsMedia";
import { PageHero } from "@/app/components/PageHero";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { newsArticles } from "@/app/site-data";

export const metadata: Metadata = {
  title: "News",
  description:
    "Read the latest Big Bowl Hot Pot updates, seasonal menu news, drink features, and restaurant announcements.",
  alternates: {
    canonical: "/news"
  }
};

export default function NewsPage() {
  return (
    <main>
      <SiteHeader currentPath="/news" />
      <PageHero
        eyebrow="Check our latest"
        title="NEWS"
      />

      <section className="news-section page-section">
        <div className="news-grid">
          {newsArticles.map((item) => (
            <article className="news-card article-card news-article-card" key={item.slug}>
              <div className="news-thumb-shell">
                <NewsMedia src={item.mediaSrc} title={item.title} />
              </div>
              <div className="news-card-copy">
                <span className="news-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link href={`/news/${item.slug}`}>Read More</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

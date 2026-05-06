import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NewsMedia } from "@/app/components/NewsMedia";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { newsArticles } from "@/app/site-data";

type NewsArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug
  }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/news/${article.slug}`
    },
    openGraph: {
      title: `${article.title} | Big Bowl Hot Pot`,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      type: "article",
      publishedTime: article.date
    }
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = newsArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <SiteHeader currentPath="/news" />

      <article className="news-article-page page-section">
        <header className="news-article-header">
          <span className="news-date">{article.date}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
        </header>

        <div className="news-article-hero">
          <NewsMedia src={article.mediaSrc} title={article.title} />
        </div>

        <div className="news-article-body">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

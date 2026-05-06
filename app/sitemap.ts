import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/app/lib/site-config";
import { newsArticles } from "@/app/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/menu", "/news", "/contact", "/reservation"];
  const newsRoutes = newsArticles.map((article) => `/news/${article.slug}`);

  return [...staticRoutes, ...newsRoutes].map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
    changeFrequency: route.startsWith("/news/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : 0.7
  }));
}

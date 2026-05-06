import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/app/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/reservation-admin", "/api/"]
    },
    sitemap: absoluteUrl("/sitemap.xml")
  };
}

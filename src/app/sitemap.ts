import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Generates the XML sitemap for the portfolio.
 * Helps search engines discover the content and structure of the site.
 *
 * @returns {MetadataRoute.Sitemap} The sitemap configuration
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.baseUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

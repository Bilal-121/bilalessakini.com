import type { MetadataRoute } from "next";

const base = "https://bilalessakini.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work/deskivo`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/work/herts-navigation`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}

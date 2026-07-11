import type { MetadataRoute } from "next";
import { ALL_COMBOS } from "@/lib/combos";
import { HUB_SLUGS } from "@/lib/hub-copy";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacesplits.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const hubPages = Object.values(HUB_SLUGS).map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const calculatorPages = ALL_COMBOS.map((combo) => ({
    url: `${siteUrl}/pace-calculator/${combo.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/calculators`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...hubPages,
    ...calculatorPages,
  ];
}

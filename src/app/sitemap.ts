import { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Generate language alternates for a given path
 */
function generateLanguageAlternates(path: string = ""): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }

  return languages;
}

/**
 * Generate sitemap entries for all locales
 */
function generateLocalizedEntries(
  path: string,
  options: {
    lastModified?: Date;
    changeFrequency: SitemapEntry["changeFrequency"];
    priority: number;
  },
): SitemapEntry[] {
  const alternates = generateLanguageAlternates(path);

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: options.lastModified || new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: {
        ...alternates,
        "x-default": `${SITE_URL}/${defaultLocale}${path}`,
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Home pages for each locale with hreflang
  const homePages = generateLocalizedEntries("", {
    changeFrequency: "daily",
    priority: 1,
  });

  // Game pages with hreflang
  const gameSlugs = ["scary-shawarma-kiosk"];

  const gamePages = gameSlugs.flatMap((slug) =>
    generateLocalizedEntries(`/games/${slug}`, {
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  return [...homePages, ...gamePages];
}

import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://robloxhub.com';

  // Home pages for each locale
  const homePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale === 'en' ? '' : locale}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // Game pages
  const gamePages = locales.flatMap((locale) =>
    ['scary-shawarma-kiosk'].map((game) => ({
      url: `${baseUrl}/${locale === 'en' ? '' : locale}/games/${game}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...homePages, ...gamePages];
}

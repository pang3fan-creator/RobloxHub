import { locales, defaultLocale, type Locale } from './i18n';

export const SITE_URL = 'https://www.bloxguides.com';

/**
 * Generate canonical URL and hreflang alternates for SEO
 */
export function generateAlternates(path: string = '') {
  const normalizedPath = path.startsWith('/') ? path : path ? `/${path}` : '';

  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = `${SITE_URL}/${locale}${normalizedPath}`;
  }

  languages['x-default'] = `${SITE_URL}/${defaultLocale}${normalizedPath}`;

  return {
    languages,
  };
}

/**
 * Generate canonical URL for current page
 */
export function generateCanonical(locale: Locale, path: string = '') {
  const normalizedPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `${SITE_URL}/${locale}${normalizedPath}`;
}

export interface JsonLdProps {
  type: 'WebSite' | 'ItemList' | 'HowTo';
  data: any;
}

export function generateJsonLd({ type, data }: JsonLdProps): string {
  const base = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return JSON.stringify(base);
}

export function generateWebSiteJsonLd() {
  return generateJsonLd({
    type: 'WebSite',
    data: {
      name: 'BloxGuides - Roblox Game Guides & Walkthroughs',
      url: SITE_URL,
      description:
        'Your ultimate destination for Roblox game tips, codes, and strategies',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  });
}

export function generateItemListJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return generateJsonLd({
    type: 'ItemList',
    data: {
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: item.name,
          url: item.url,
        },
      })),
    },
  });
}

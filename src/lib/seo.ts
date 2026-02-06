import { locales, defaultLocale, type Locale } from './i18n';
import type { GamePost } from './games';

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

/**
 * Generate Organization Schema for E-E-A-T
 */
export function generateOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BloxGuides',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Your ultimate destination for Roblox game tips, codes, and strategies',
    sameAs: [],
  };
}

/**
 * Generate Article Schema for game guides
 */
export function generateArticleSchema(
  post: GamePost,
  locale: Locale
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage?.startsWith('http')
      ? post.coverImage
      : `${SITE_URL}${post.coverImage}`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author || 'BloxGuides Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BloxGuides',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${locale}/games/${post.slug}`,
    },
  };
}

/**
 * Generate HowTo Schema for tutorial steps
 */
export function generateHowToSchema(
  name: string,
  steps: Array<{ title: string; desc: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.desc,
    })),
  };
}

/**
 * Generate FAQPage Schema for common questions
 */
export function generateFAQPageSchema(
  items: Array<{ q: string; a: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList Schema for navigation
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate ItemList Schema for game listings on homepage
 */
export function generateGameListSchema(
  posts: GamePost[],
  locale: Locale
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Roblox Game Guides',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        name: post.title,
        url: `${SITE_URL}/${locale}/games/${post.slug}`,
        description: post.excerpt,
      },
    })),
  };
}

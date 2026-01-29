import { GameMetadata } from './games';

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
      name: 'RobloxHub - Game Guides & Walkthroughs',
      url: 'https://robloxhub.com',
      description: 'Your ultimate destination for Roblox game tips, codes, and strategies',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://robloxhub.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  });
}

export function generateItemListJsonLd(items: Array<{ name: string; url: string }>) {
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

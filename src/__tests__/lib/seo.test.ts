import { generateJsonLd, generateWebSiteJsonLd, generateItemListJsonLd } from '@/lib/seo';

describe('SEO Utilities', () => {
  describe('generateJsonLd', () => {
    it('should generate valid JSON-LD string', () => {
      const result = generateJsonLd({
        type: 'WebSite',
        data: { name: 'Test Site' },
      });

      expect(typeof result).toBe('string');
    });

    it('should include context and type', () => {
      const result = generateJsonLd({
        type: 'ItemList',
        data: { itemListElement: [] },
      });

      const parsed = JSON.parse(result);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@type']).toBe('ItemList');
    });

    it('should merge data correctly', () => {
      const result = generateJsonLd({
        type: 'WebSite',
        data: {
          name: 'Test Site',
          url: 'https://example.com',
        },
      });

      const parsed = JSON.parse(result);
      expect(parsed.name).toBe('Test Site');
      expect(parsed.url).toBe('https://example.com');
    });
  });

  describe('generateWebSiteJsonLd', () => {
    it('should generate WebSite JSON-LD with correct structure', () => {
      const result = generateWebSiteJsonLd();
      const parsed = JSON.parse(result);

      expect(parsed['@type']).toBe('WebSite');
      expect(parsed.name).toBe('RobloxHub - Game Guides & Walkthroughs');
      expect(parsed.url).toBe('https://robloxhub.com');
    });

    it('should include search action', () => {
      const result = generateWebSiteJsonLd();
      const parsed = JSON.parse(result);

      expect(parsed.potentialAction['@type']).toBe('SearchAction');
      expect(parsed.potentialAction.target).toContain('search?q=');
    });
  });

  describe('generateItemListJsonLd', () => {
    it('should generate ItemList with correct structure', () => {
      const items = [
        { name: 'Item 1', url: 'https://example.com/1' },
        { name: 'Item 2', url: 'https://example.com/2' },
      ];

      const result = generateItemListJsonLd(items);
      const parsed = JSON.parse(result);

      expect(parsed['@type']).toBe('ItemList');
      expect(parsed.itemListElement).toHaveLength(2);
    });

    it('should assign correct positions to items', () => {
      const items = [
        { name: 'Item 1', url: 'https://example.com/1' },
        { name: 'Item 2', url: 'https://example.com/2' },
        { name: 'Item 3', url: 'https://example.com/3' },
      ];

      const result = generateItemListJsonLd(items);
      const parsed = JSON.parse(result);

      expect(parsed.itemListElement[0].position).toBe(1);
      expect(parsed.itemListElement[1].position).toBe(2);
      expect(parsed.itemListElement[2].position).toBe(3);
    });

    it('should handle empty items array', () => {
      const result = generateItemListJsonLd([]);
      const parsed = JSON.parse(result);

      expect(parsed.itemListElement).toHaveLength(0);
    });
  });
});

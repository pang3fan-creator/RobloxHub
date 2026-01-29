import { locales, defaultLocale, localeNames, localeFlags } from '@/lib/i18n';

describe('i18n Configuration', () => {
  describe('locales', () => {
    it('should contain all required locales', () => {
      expect(locales).toEqual(['en', 'zh', 'es']);
    });

    it('should be a readonly array', () => {
      expect(locales).toHaveLength(3);
    });
  });

  describe('defaultLocale', () => {
    it('should have English as default locale', () => {
      expect(defaultLocale).toBe('en');
    });

    it('should be included in locales array', () => {
      expect(locales).toContain(defaultLocale);
    });
  });

  describe('localeNames', () => {
    it('should have names for all locales', () => {
      expect(Object.keys(localeNames)).toHaveLength(locales.length);
    });

    it('should have correct names', () => {
      expect(localeNames.en).toBe('English');
      expect(localeNames.zh).toBe('中文');
      expect(localeNames.es).toBe('Español');
    });
  });

  describe('localeFlags', () => {
    it('should have flags for all locales', () => {
      expect(Object.keys(localeFlags)).toHaveLength(locales.length);
    });

    it('should have correct flags', () => {
      expect(localeFlags.en).toBe('🇺🇸');
      expect(localeFlags.zh).toBe('🇨🇳');
      expect(localeFlags.es).toBe('🇪🇸');
    });
  });

  describe('locale consistency', () => {
    it('should have matching keys across locale objects', () => {
      const nameKeys = Object.keys(localeNames).sort();
      const flagKeys = Object.keys(localeFlags).sort();

      expect(nameKeys).toEqual(flagKeys);
    });
  });
});

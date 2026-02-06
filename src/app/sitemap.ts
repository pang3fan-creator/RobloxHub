import { MetadataRoute } from 'next';
import { locales, defaultLocale, Locale } from '@/lib/i18n';
import { getAllGamePosts, getGameSlugs } from '@/lib/games';
import { SITE_URL } from '@/lib/seo';

// 确保 SITE_URL 没有尾部斜杠
const baseUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * 辅助函数：生成各语言版本的 URL
 */
function getLocalizedUrl(path: string, locale: string): string {
  return `${baseUrl}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 获取所有语言的现有 Slug 列表，用于存在性检查
  // 使用 Set 提供 O(1) 查找性能，用于快速判断某语言版本是否存在
  const zhSlugs = new Set(getGameSlugs('zh'));
  const esSlugs = new Set(getGameSlugs('es'));

  // 获取英文版（主数据源）的所有文章信息（用于获取 lastModified 时间）
  const allPosts = getAllGamePosts('en');

  // ---------------------------------------------------------------------------
  // 2. 生成静态页面 (首页)
  // 假设首页总是支持所有定义在 i18n 中的语言
  // ---------------------------------------------------------------------------
  const homeEntries: SitemapEntry[] = locales.flatMap((locale) => {
    // 为当前语言构建 alternates (hreflang)
    const languages: Record<string, string> = {};
    locales.forEach((l) => {
      languages[l] = getLocalizedUrl('', l);
    });
    languages['x-default'] = getLocalizedUrl('', defaultLocale);

    return {
      url: getLocalizedUrl('', locale),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: { languages },
    };
  });

  // ---------------------------------------------------------------------------
  // 3. 生成动态游戏详情页 (Games)
  // 仅生成已存在的翻译版本，避免 404 或重复内容
  // ---------------------------------------------------------------------------
  const gameEntries: SitemapEntry[] = allPosts.flatMap((post) => {
    const slug = post.slug;
    const lastModified = post.date ? new Date(post.date) : new Date();

    // 确定该游戏实际存在的语言版本
    const availableLocales: Locale[] = ['en']; // 英文总是存在 (作为 Base)
    if (zhSlugs.has(slug)) availableLocales.push('zh');
    if (esSlugs.has(slug)) availableLocales.push('es');

    // 构建该游戏所有可用版本的 Alternate Map
    // 只有存在的版本才会被列入 hreflang，告诉 Google 哪些语言是可用的
    const alternatesMap: Record<string, string> = {};
    availableLocales.forEach((l) => {
      alternatesMap[l] = getLocalizedUrl(`/games/${slug}`, l);
    });
    alternatesMap['x-default'] = getLocalizedUrl(`/games/${slug}`, defaultLocale);

    // 为每个存在的语言版本生成一个 Sitemap 条目
    return availableLocales.map((locale) => ({
      url: getLocalizedUrl(`/games/${slug}`, locale),
      lastModified: lastModified,
      changeFrequency: 'weekly', // 游戏攻略通常按周更新
      priority: 0.8, // 略低于首页，但高于其他页面
      alternates: {
        languages: alternatesMap,
      },
    }));
  });

  return [...homeEntries, ...gameEntries];
}

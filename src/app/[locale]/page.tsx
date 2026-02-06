import { getTranslations } from 'next-intl/server';
import { FloatingNav } from '@/components/FloatingNav';
import { Footer } from '@/components/Footer';
import { HeroSearch } from '@/components/HeroSearch';
import { FeaturedGameCard } from '@/components/FeaturedGameCard';
import { TrendingNow } from '@/components/TrendingNow';
import { RecentUpdates } from '@/components/RecentUpdates';
import { JsonLd } from '@/components/JsonLd';
import {
  generateAlternates,
  generateCanonical,
  generateOrganizationSchema,
  generateGameListSchema,
} from '@/lib/seo';
import { getFeaturedPosts, getRecentUpdates } from '@/lib/games';
import { Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('title'),
    alternates: {
      canonical: generateCanonical(locale as Locale),
      ...generateAlternates(),
    },
  };
}

// Trending games (can be moved to config or CMS later)
const trendingGames = [
  { slug: 'sorcerer-ascent', name: 'Sorcerer Ascent' },
  { slug: 'scary-shawarma-kiosk', name: 'Scary Shawarma Kiosk' },
  { slug: 'dress-to-impress', name: 'Dress to Impress' },
  { slug: 'blue-lock-rivals', name: 'Blue Lock Rivals' },
  { slug: 'fisch', name: 'Fisch' },
  { slug: 'murder-mystery-2', name: 'Murder Mystery 2' },
  { slug: 'blox-fruits', name: 'Blox Fruits' },
];

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const featuredPosts = getFeaturedPosts(locale, 3);
  const recentPosts = getRecentUpdates(locale, 5);

  // Generate structured data schemas for SEO
  const schemas = [
    generateOrganizationSchema(),
    generateGameListSchema(featuredPosts, locale as Locale),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={schemas} />
      <FloatingNav locale={locale} />

      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-12 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl mb-4">
            {t('title')}
          </h1>
          <p className="text-lg leading-8 text-slate-700 dark:text-slate-300 mb-8">
            {t('subtitle')}
          </p>

          {/* Search Box */}
          <HeroSearch locale={locale} />
        </div>
      </section>

      {/* Featured Games */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
            <span aria-hidden="true">🔥</span>
            {t('featured.title')}
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <FeaturedGameCard key={post.slug} game={post} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TrendingNow locale={locale} games={trendingGames} />
        </div>
      </section>

      {/* Recent Updates */}
      <section className="px-6 pb-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RecentUpdates locale={locale} posts={recentPosts} />
        </div>
      </section>

      <Footer locale={locale} />
    </div>
  );
}

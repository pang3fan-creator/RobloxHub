import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { FloatingNav } from '@/components/FloatingNav';
import { Footer } from '@/components/Footer';
import { generateAlternates, generateCanonical } from '@/lib/seo';
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

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <div className="min-h-screen">
      <FloatingNav locale={locale} />

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Featured Game */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-white mb-8">
            {t('hero.featured')}
          </h2>
          <Link
            href={`/${locale}/games/scary-shawarma-kiosk`}
            className="block group relative overflow-hidden rounded-2xl bg-slate-900 p-8 shadow-xl transition-transform hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-slate-900/50" />
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-2">
                Scary Shawarma Kiosk
              </h3>
              <p className="text-slate-300 mb-4">
                Complete anomaly list, all endings, and event walkthroughs
              </p>
              <span className="inline-flex items-center text-purple-400 font-medium">
                {t('hero.viewGuide')} →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-white mb-8">Categories</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              title={t('categories.anomalies')}
              description="Find all anomalies and secrets"
              emoji="👻"
            />
            <CategoryCard
              title={t('categories.codes')}
              description="Redeem codes for rewards"
              emoji="🎁"
            />
            <CategoryCard
              title={t('categories.tiers')}
              description="Character and item rankings"
              emoji="📊"
            />
            <CategoryCard
              title={t('categories.fixes')}
              description="Technical fixes and tips"
              emoji="🔧"
            />
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </div>
  );
}

function CategoryCard({
  title,
  description,
  emoji,
}: {
  title: string;
  description: string;
  emoji: string;
}) {
  return (
    <div className="rounded-xl bg-slate-900 p-6 shadow-lg transition-transform hover:scale-105">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

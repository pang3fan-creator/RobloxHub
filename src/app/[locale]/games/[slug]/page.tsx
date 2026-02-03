import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { FloatingNav } from '@/components/FloatingNav';
import { GameMDX } from '@/components/GameMDX';
import { Footer } from '@/components/Footer';
import { getGamePostBySlug } from '@/lib/games';
import { generateAlternates, generateCanonical } from '@/lib/seo';
import { Locale } from '@/lib/i18n';
import { RiskLevel } from '@/components/QuickCard';
const anomaliesData = [
  {
    id: 'strange-stickers',
    title: 'Strange Stickers',
    description: 'Looks normal in person, but appears as a skeleton on security camera',
    riskLevel: 'high' as RiskLevel,
    location: 'Security Camera',
    trigger: 'Check CCTV footage',
    details: 'This customer appears normal at first glance. When viewed on security camera, their true form is revealed as a skeleton. Close window immediately.',
    beforeImage: 'https://placehold.co/800x400/1e293b/94a3b8?text=Normal+Person',
    afterImage: 'https://placehold.co/800x400/581c87/c4b5fd?text=Skeleton+Form',
  },
  {
    id: 'black-holes',
    title: 'Black Holes',
    description: 'Strange black holes covering the back, visible on camera',
    riskLevel: 'high' as RiskLevel,
    location: 'Back View',
    trigger: 'Check rear camera',
    details: 'The customer stumbles towards you. Black holes cover their back in CCTV footage. Close window immediately.',
    beforeImage: 'https://placehold.co/800x400/1e293b/94a3b8?text=Normal+Back',
    afterImage: 'https://placehold.co/800x400/020617/64748b?text=Black+Holes',
  },
  {
    id: 'headless-man',
    title: 'Headless Man',
    description: 'Customer without a head, says he can\'t feel his head anymore',
    riskLevel: 'extreme' as RiskLevel,
    location: 'Service Window',
    trigger: 'Approaches counter',
    details: 'A customer without a head walks towards you. The situation is clear - absolutely do not serve him.',
    beforeImage: 'https://placehold.co/800x400/1e293b/94a3b8?text=Normal+Customer',
    afterImage: 'https://placehold.co/800x400/0f172a/dc2626?text=No+Head',
  },
  {
    id: 'nightvision-missing',
    title: 'Nightvision Missing',
    description: 'Completely disappears in night vision mode',
    riskLevel: 'medium' as RiskLevel,
    location: 'All Views',
    trigger: 'Switch to night vision',
    details: 'Normal in person and regular camera. Switch to night vision mode and customer completely disappears. Close window immediately.',
    beforeImage: 'https://placehold.co/800x400/1e293b/94a3b8?text=Visible',
    afterImage: 'https://placehold.co/800x400/020617/64748b?text=Invisible',
  },
  {
    id: 'screamer',
    title: 'Screamer',
    description: 'Camera shows static, then suddenly screams in your face',
    riskLevel: 'extreme' as RiskLevel,
    location: 'Security Camera',
    trigger: 'View CCTV footage',
    details: 'Most terrifying anomaly. Camera shows static, then sudden jumpscare scream. Lower your volume beforehand!',
    beforeImage: 'https://placehold.co/800x400/1e293b/94a3b8?text=Normal+Feed',
    afterImage: 'https://placehold.co/800x400/0f172a/dc2626?text=STATIC+SCREAM',
  },
];

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'game' });

  // Load game post to get excerpt for description
  const gamePost = getGamePostBySlug(slug, locale);
  const description = gamePost?.excerpt || '';

  return {
    title: `Scary Shawarma Kiosk - ${t('quickGuide')} | BloxGuides`,
    description,
    alternates: {
      canonical: generateCanonical(locale as Locale, `/games/${slug}`),
      ...generateAlternates(`/games/${slug}`),
    },
  };
}

export default async function GameDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  // Validate slug
  // if (slug !== 'scary-shawarma-kiosk') {
  //   notFound();
  // }

  // Load MDX content with locale support
  const gamePost = getGamePostBySlug(slug, locale);
  if (!gamePost) {
    notFound();
  }

  const { title, content } = gamePost;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <FloatingNav locale={locale} />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <header className="mb-12">
          <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-medium rounded-full mb-4 border border-purple-500/30">
            Featured Game
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last updated: Jan 2026
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              30 min read
            </span>
          </div>
        </header>

        {/* Main MDX Content */}
        <section className="mb-16">
          <GameMDX source={content} />
        </section>

        {/* Progress Tracker - Only for Scary Shawarma Kiosk */}
        {slug === 'scary-shawarma-kiosk' && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-200">📊 Your Progress</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-300">Anomalies Discovered</span>
                <span className="text-2xl font-bold text-purple-400">0 / {anomaliesData.length}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" style={{ width: '0%' }} id="progress-bar" />
              </div>
              <p className="text-xs text-slate-500 mt-2">Check off anomalies as you find them to track your progress</p>
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="text-center py-8 border-t border-slate-800">
          <a href={`/${locale}`} className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer locale={locale} />
    </main>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { GamePost } from '@/lib/games';

interface RecentUpdatesProps {
  locale: string;
  posts: GamePost[];
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

export function RecentUpdates({ locale, posts }: RecentUpdatesProps) {
  const t = useTranslations('home.recent');

  return (
    <section className="py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span aria-hidden="true">📝</span>
          {t('title')}
        </h2>
        <span className="text-slate-400 dark:text-slate-600 text-sm font-medium cursor-not-allowed">
          {t('viewAll')} →
        </span>
      </div>

      {/* Updates List */}
      <div className="divide-y divide-slate-200 dark:divide-slate-700/50 rounded-2xl bg-slate-100/30 dark:bg-slate-800/30 overflow-hidden">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/games/${post.slug}`}
            className="
              flex items-center gap-4 p-4
              bg-slate-100/40 dark:bg-slate-800/40 hover:bg-slate-200/60 dark:hover:bg-slate-700/60
              transition-all duration-200
              hover:translate-x-1
            "
          >
            {/* Thumbnail */}
            <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-900 to-slate-800" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-slate-900 dark:text-white font-medium truncate">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-slate-600 dark:text-slate-400 text-sm truncate">
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Time */}
            <span className="text-slate-500 dark:text-slate-500 text-sm flex-shrink-0">
              {formatRelativeTime(post.date)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

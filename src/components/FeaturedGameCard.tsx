'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { GamePost } from '@/lib/games';

interface FeaturedGameCardProps {
  game: GamePost;
  locale: string;
}

export function FeaturedGameCard({ game, locale }: FeaturedGameCardProps) {
  const t = useTranslations('home.featured');
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  return (
    <Link
      ref={cardRef}
      href={`/${locale}/games/${game.slug}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        group relative block overflow-hidden rounded-3xl
        bg-white dark:bg-slate-900 border-2 border-transparent
        shadow-xl shadow-purple-500/10
        transition-all duration-300 ease-out
        hover:shadow-2xl hover:shadow-purple-500/20
        before:absolute before:inset-0 before:rounded-3xl before:p-[2px]
        before:bg-gradient-to-r before:from-purple-500 before:via-cyan-500 before:to-pink-500
        before:opacity-0 before:transition-opacity before:duration-300
        hover:before:opacity-100 hover:before:animate-gradient
        before:-z-10
      "
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {game.coverImage ? (
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-200 dark:from-purple-900 to-slate-200 dark:to-slate-900" />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-slate-900 via-slate-100/50 dark:via-slate-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6 -mt-16 z-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
          {game.title}
        </h3>

        {game.excerpt && (
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
            {game.excerpt}
          </p>
        )}

        <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
          {t('viewGuide')}
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface HeroSearchProps {
  locale: string;
}

export function HeroSearch({ locale }: HeroSearchProps) {
  const t = useTranslations('home.search');
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div
        className={`
          relative flex items-center gap-3 px-6 py-4
          bg-slate-800/60 backdrop-blur-md
          border-2 rounded-full
          transition-all duration-300
          ${isFocused
            ? 'border-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 p-[2px] scale-105'
            : 'border-slate-600 hover:border-slate-500'
          }
        `}
      >
        <div className={`
          ${isFocused ? 'flex items-center gap-3 w-full bg-slate-800 rounded-full px-6 py-4' : 'contents'}
        `}>
          {/* Search Icon */}
          <svg
            className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isFocused ? 'animate-bounce-subtle' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t('placeholder')}
            className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-lg"
          />

          {/* Search Button */}
          {query && (
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-full transition-colors"
            >
              {t('button')}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

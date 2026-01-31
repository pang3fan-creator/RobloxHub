'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface HeroSearchProps {
  locale: string;
}

export function HeroSearch({ locale }: HeroSearchProps) {
  const t = useTranslations('home.search');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 搜索功能暂时禁用
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div
        className={`
          relative flex items-center gap-3 px-6 py-4
          bg-slate-800/60 backdrop-blur-md
          border-2 rounded-full
          transition-all duration-300
          opacity-70 cursor-not-allowed
          ${isFocused
            ? 'border-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 p-[2px] scale-105'
            : 'border-slate-600'
          }
        `}
      >
        <div className={`
          ${isFocused ? 'flex items-center gap-3 w-full bg-slate-800 rounded-full px-6 py-4' : 'contents'}
        `}>
          {/* Search Icon */}
          <svg
            className="w-5 h-5 text-slate-500 flex-shrink-0"
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
            disabled
            placeholder={t('placeholder')}
            className="flex-1 bg-transparent text-slate-500 placeholder-slate-600 outline-none text-lg cursor-not-allowed"
          />
        </div>
      </div>
      <p className="text-center text-slate-600 text-sm mt-3">搜索功能即将上线</p>
    </form>
  );
}

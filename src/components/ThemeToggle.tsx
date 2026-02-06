'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * ThemeToggle - 主题切换按钮
 *
 * 圆形图标按钮，支持暗色/浅色模式切换。
 * 带平滑过渡动画，避免 SSR 闪烁。
 *
 * Design tokens:
 * - Size: 40px (w-10 h-10)
 * - Border-radius: rounded-full
 * - Animation: rotate-180 duration-500
 * - Dark mode: show Sun icon (切换到浅色)
 * - Light mode: show Moon icon (切换到暗色)
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 避免 SSR hydration 不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 占位符，避免布局偏移
    return (
      <button
        className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        aria-label="Toggle theme"
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-300 dark:border-slate-700 hover:border-purple-500/50 text-slate-700 dark:text-slate-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm dark:shadow-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun icon (暗色模式下显示) */}
      <svg
        className={`w-5 h-5 transition-all duration-500 ${
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon (浅色模式下显示) */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-500 ${
          isDark
            ? '-rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-full bg-purple-500/10 dark:bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </button>
  );
}

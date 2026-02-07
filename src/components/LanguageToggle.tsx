'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import {
  locales,
  localeNames,
  localeFlags,
  type Locale,
  defaultLocale,
} from '@/lib/i18n';

/**
 * LanguageToggle - 语言切换按钮
 *
 * 圆形图标按钮，支持 en/zh/es 三语言切换。
 * 带下拉菜单，点击展开/收起，支持 ESC 键和点击外部关闭。
 *
 * Design tokens:
 * - Size: 40px (w-10 h-10)
 * - Border-radius: rounded-full
 * - Position: fixed top-6 right-20 (ThemeToggle 左侧)
 * - Animation: animate-fade-in-down 200ms
 */
export function LanguageToggle() {
  const t = useTranslations('components.languageToggle');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 获取不带语言前缀的内部路径
  // usePathname() 返回的可能是带前缀的路径（如 /zh/games/sorcerer-ascent）
  // 也可能是不带前缀的路径（如 /games/sorcerer-ascent，在 as-needed 模式下的默认语言）
  const getInternalPathname = () => {
    const segments = pathname.split('/');
    // 检查第一段是否是语言代码
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      // 移除语言前缀，返回 /games/sorcerer-ascent
      return '/' + segments.slice(2).join('/');
    }
    // 如果没有语言前缀（默认语言 as-needed 模式），直接返回
    return pathname;
  };

  // 构建指定语言的完整 URL 路径
  const getLocalizedPath = (targetLocale: Locale) => {
    const internalPath = getInternalPathname();
    // 在 as-needed 模式下，默认语言不需要前缀
    if (targetLocale === defaultLocale) {
      return internalPath;
    }
    // 其他语言需要前缀
    return `/${targetLocale}${internalPath}`;
  };

  // 语言切换处理函数
  // 设置 Cookie 并跳转，因为 next-intl 中间件优先使用 Cookie 来确定语言
  const handleLanguageChange = (targetLocale: Locale) => {
    const targetPath = getLocalizedPath(targetLocale);
    setIsOpen(false);

    // 设置 NEXT_LOCALE Cookie，让中间件使用目标语言
    // Cookie 格式: NEXT_LOCALE=en; Path=/; Max-Age=31536000 (1年)
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;

    // 完整页面跳转到目标路径
    window.location.href = window.location.origin + targetPath;
  };

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        buttonRef.current &&
        menuRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // ESC 键关闭
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className="relative">
      {/* 主按钮 */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-300 dark:border-slate-700 hover:border-purple-500/50 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm dark:shadow-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        aria-label={t('switchLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* 当前语言国旗 */}
        <span className="text-lg" aria-hidden="true">
          {localeFlags[locale]}
        </span>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-purple-500/10 dark:bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in-down z-50"
          role="listbox"
          aria-label={t('selectLanguage')}
        >
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors focus:outline-none focus:bg-purple-50 dark:focus:bg-purple-900/20 ${
                locale === loc
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              role="option"
              aria-selected={locale === loc}
            >
              {/* 国旗 */}
              <span className="text-xl" aria-hidden="true">
                {localeFlags[loc]}
              </span>

              {/* 语言名 */}
              <span className="flex-1 font-medium">{localeNames[loc]}</span>

              {/* 选中指示器 */}
              {locale === loc && (
                <svg
                  className="w-5 h-5 text-purple-600 dark:text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

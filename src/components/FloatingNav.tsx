'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

/**
 * FloatingNav - Mobile-first pill-shaped floating navigation
 *
 * Signature component for RobloxHub mobile experience.
 * Bottom-centered floating pill with glassmorphism effect.
 *
 * Design tokens from system.md:
 * - Height: 48px
 * - Width: min(200px, 80vw)
 * - Background: rgba(15, 23, 42, 0.8) + backdrop-blur-md
 * - Border-radius: radius-full (pill shape)
 * - Shadow: none (borders-only strategy)
 */
export function FloatingNav({ locale = 'en' }: { locale?: string }) {
  const t = useTranslations('components.floatingNav');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Navigation items
  const navItems: NavItem[] = [
    { label: t('home'), href: `/${locale}`, icon: '🏠' },
    { label: t('games'), href: '#', icon: '🎮' },
    { label: t('codes'), href: '#', icon: '🎁' },
    { label: t('guides'), href: '#', icon: '📖' },
    { label: t('settings'), href: '#', icon: '⚙️' },
  ];

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close modal on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Pill Button */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-20'
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center gap-2 px-6 h-12 bg-slate-900/80 backdrop-blur-md border-2 border-purple-500/50 hover:border-purple-400 rounded-full text-slate-200 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl animate-pulse-subtle"
          style={{
            width: 'min(200px, 80vw)',
            height: '48px',
          }}
          aria-label={t('menu')}
          aria-expanded={isOpen}
        >
          {/* Menu icon */}
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>

          {/* Label */}
          <span className="font-medium text-sm">{isOpen ? t('close') : t('menu')}</span>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-full bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </button>
      </div>

      {/* Semi-screen Modal Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div className="fixed inset-x-0 top-0 z-50 bg-slate-900 border-b border-slate-800 rounded-b-3xl shadow-2xl animate-slide-down">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-slate-700 rounded-full" />
            </div>

            {/* Navigation Grid */}
            <nav className="px-6 pb-8 pt-2">
              <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all hover:scale-105 active:scale-95 min-w-[120px] ${
                        isActive
                          ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                          : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:border-purple-500/50 text-slate-300 hover:text-white hover:from-purple-900/30 hover:to-slate-800/50'
                      }`}
                    >
                      {/* Icon */}
                      <span className="text-3xl filter drop-shadow-lg">{item.icon}</span>

                      {/* Label */}
                      <span className="text-sm font-medium">{item.label}</span>

                      {/* Active indicator */}
                      {isActive && (
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1" />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Close button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-slate-300 hover:text-white font-medium transition-all hover:scale-105 active:scale-95"
                >
                  {t('close')}
                </button>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slide-down 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  );
}

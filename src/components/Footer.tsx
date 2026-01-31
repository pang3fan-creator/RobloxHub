import { getTranslations } from 'next-intl/server';

interface FooterProps {
  locale?: string;
}

/**
 * Footer - 网站页脚组件
 *
 * 包含网站 logo、导航链接和版权信息。
 * 设计风格与整体深色主题一致。
 */
export async function Footer({ locale = 'en' }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'components.footer' });

  const navLinks = [
    { label: t('home'), href: `/${locale}` },
    { label: t('games'), href: '#', disabled: true },
    { label: t('codes'), href: '#', disabled: true },
    { label: t('guides'), href: '#', disabled: true },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
          {/* Logo & Description */}
          <div className="flex-1 max-w-sm">
            <a
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-xl font-bold text-white mb-3"
            >
              <span className="text-2xl">🎮</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                RobloxHub
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-6">
            {navLinks.map((link) =>
              (link as any).disabled ? (
                <span
                  key={link.label}
                  className="text-sm text-slate-600 cursor-not-allowed"
                >
                  {link.label}
                </span>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-purple-400 transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-slate-500">
              © {currentYear} RobloxHub. {t('rights')}
            </p>

            {/* Disclaimer */}
            <p className="text-xs text-slate-600">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

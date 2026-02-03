/**
 * QuickReference - 快速导航组件
 *
 * 用于在 MDX 内容中展示页面章节导航卡片。
 */
export interface QuickReferenceItem {
  href: string;
  icon: string;
  title: string;
  desc: string;
  color: string;
}

interface QuickReferenceProps {
  items?: QuickReferenceItem[];
}

/**
 * QuickReference - 快速导航组件
 *
 * 用于在 MDX 内容中展示页面章节导航卡片。
 * 支持通过 props 传入自定义导航项，默认为 Scary Shawarma Kiosk 的数据。
 */
export function QuickReference({ items }: QuickReferenceProps) {
  const defaultSections: QuickReferenceItem[] = [
    {
      href: '#how-to-play',
      icon: '🎮',
      title: 'How to Play',
      desc: 'Basic gameplay instructions for beginners',
      color: 'blue',
    },
    {
      href: '#anomalies-that-you-should-not-serve',
      icon: '☠️',
      title: 'Dangerous Anomalies',
      desc: 'Dangerous anomalies to identify and avoid',
      color: 'red',
    },
    {
      href: '#anomalies-that-you-should-serve',
      icon: '✓',
      title: 'Safe Customers',
      desc: 'Strange but safe customers you must serve',
      color: 'emerald',
    },
    {
      href: '#events',
      icon: '⚡',
      title: 'Events',
      desc: 'In-game events you need to handle correctly',
      color: 'amber',
    },
    {
      href: '#jumpscares',
      icon: '😱',
      title: 'Jumpscares',
      desc: 'Terrifying jumpscare events in the game',
      color: 'orange',
    },
    {
      href: '#all-endings-guide',
      icon: '🎭',
      title: 'All Endings Guide',
      desc: 'Complete guide to all 5 possible endings',
      color: 'purple',
    },
    {
      href: '#pro-tips--tricks',
      icon: '💡',
      title: 'Pro Tips & Tricks',
      desc: 'Advanced strategies to master the game',
      color: 'cyan',
    },
    {
      href: '#faq-section',
      icon: '❓',
      title: 'FAQ Section',
      desc: 'Frequently asked questions and answers',
      color: 'pink',
    },
    {
      href: '#roblox-horror-games-similar-to-scary-shawarma-kiosk',
      icon: '🎲',
      title: 'Similar Games',
      desc: 'Similar horror games you might enjoy',
      color: 'violet',
    },
  ];

  const sections = items || defaultSections;

  const colorMap: Record<string, string> = {
    blue: 'text-blue-400 group-hover:text-blue-300 hover:border-blue-500/50',
    red: 'text-red-400 group-hover:text-red-300 hover:border-red-500/50',
    emerald: 'text-emerald-400 group-hover:text-emerald-300 hover:border-emerald-500/50',
    amber: 'text-amber-400 group-hover:text-amber-300 hover:border-amber-500/50',
    orange: 'text-orange-400 group-hover:text-orange-300 hover:border-orange-500/50',
    purple: 'text-purple-400 group-hover:text-purple-300 hover:border-purple-500/50',
    cyan: 'text-cyan-400 group-hover:text-cyan-300 hover:border-cyan-500/50',
    pink: 'text-pink-400 group-hover:text-pink-300 hover:border-pink-500/50',
    violet: 'text-violet-400 group-hover:text-violet-300 hover:border-violet-500/50',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const colors = colorMap[section.color] || colorMap.blue;
          const [textColor, hoverColor, borderColor] = colors.split(' ');
          return (
            <a
              key={section.href}
              href={section.href}
              className={`group p-4 bg-slate-800/50 border border-slate-700 ${borderColor} rounded-lg transition-all`}
            >
              <h3 className={`font-semibold ${textColor} ${hoverColor} mb-1`}>
                {section.icon} {section.title}
              </h3>
              <p className="text-sm text-slate-400">{section.desc}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

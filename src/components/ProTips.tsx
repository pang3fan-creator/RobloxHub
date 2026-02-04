/**
 * ProTips - 游戏技巧提示组件
 *
 * 用于在 MDX 内容中展示游戏的进阶技巧。
 * 包含图标、标题和描述的卡片布局。
 */
export interface ProTipItem {
  icon: string;
  title: string;
  desc: string;
}

interface ProTipsProps {
  items?: ProTipItem[];
}

/**
 * ProTips - 游戏技巧提示组件
 *
 * 用于在 MDX 内容中展示游戏的进阶技巧。
 * 包含图标、标题和描述的卡片布局。
 */
export function ProTips({ items }: ProTipsProps) {
  const defaultTips: ProTipItem[] = [
    {
      icon: "👂",
      title: "Sound Detection",
      desc: "Some anomalies have no visual features - listen carefully",
    },
    {
      icon: "👀",
      title: "Scanning Path",
      desc: "Establish a left-to-right scanning pattern for cameras",
    },
    {
      icon: "⚡",
      title: "Priority Handling",
      desc: "Some anomalies need immediate action, others can wait",
    },
  ];

  const displayTips = items || defaultTips;

  return (
    <div className="grid gap-4 mb-8">
      {displayTips.map((tip, index) => (
        <div
          key={index}
          className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex items-start gap-4"
        >
          <span className="text-3xl">{tip.icon}</span>
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">{tip.title}</h3>
            <p className="text-sm text-slate-400">{tip.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

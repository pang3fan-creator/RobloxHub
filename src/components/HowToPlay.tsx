/**
 * HowToPlay - 游戏玩法说明组件
 *
 * 用于在 MDX 内容中展示游戏的基本玩法说明。
 * 包含三个核心步骤：工作流程、识别异常、生存策略。
 */
export interface HowToPlayItem {
  title: string;
  desc: string;
}

interface HowToPlayProps {
  items?: HowToPlayItem[];
}

/**
 * HowToPlay - 游戏玩法说明组件
 *
 * 用于在 MDX 内容中展示游戏的基本玩法说明。
 * 包含三个核心步骤：工作流程、识别异常、生存策略。
 */
export function HowToPlay({ items }: HowToPlayProps) {
  const defaultItems: HowToPlayItem[] = [
    {
      title: "1. Work Flow",
      desc: 'Greet customers, take orders, prepare shawarma. Complete the "safety check" for each customer.',
    },
    {
      title: "2. Identify Anomalies",
      desc: "Check security cameras from multiple angles. Spot strange behavior, unusual appearances, or paranormal events.",
    },
    {
      title: "3. Survival",
      desc: "Don't serve anomalies. Keep normal customers happy. Survive until 6 AM.",
    },
  ];

  const displayItems = items || defaultItems;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
      <div className={`grid md:grid-cols-${displayItems.length} gap-6`}>
        {displayItems.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold text-purple-400 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * FAQSection - 常见问题解答组件
 *
 * 用于在 MDX 内容中展示 FAQ 问答列表。
 * 使用可折叠的 details 元素呈现问答。
 */
export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  items?: FAQItem[];
}

/**
 * FAQSection - 常见问题解答组件
 *
 * 用于在 MDX 内容中展示 FAQ 问答列表。
 * 使用可折叠的 details 元素呈现问答。
 */
export function FAQSection({ items }: FAQSectionProps) {
  const defaultFaqs: FAQItem[] = [
    {
      q: "Are there any codes for this game?",
      a: "No codes currently available. Follow official Discord for updates.",
    },
    {
      q: "What's the hardest anomaly to spot?",
      a: "Nightvision Missing - completely invisible in night vision mode.",
    },
    {
      q: "Can I play on mobile?",
      a: "Yes! Roblox mobile fully supported, but cameras are harder to check.",
    },
  ];

  const displayFaqs = items || defaultFaqs;

  return (
    <div className="space-y-4 mb-8">
      {displayFaqs.map((faq, index) => (
        <details
          key={index}
          className="bg-slate-900 border border-slate-800 rounded-lg group"
        >
          <summary className="p-5 cursor-pointer flex items-center justify-between hover:bg-slate-800/50 transition-colors">
            <span className="font-semibold text-slate-200">{faq.q}</span>
            <svg
              className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <div className="px-5 pb-5 text-slate-400">{faq.a}</div>
        </details>
      ))}
    </div>
  );
}

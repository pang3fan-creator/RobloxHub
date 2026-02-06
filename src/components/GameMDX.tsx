import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import React from 'react';
import { AnomalySlider } from '@/components/AnomalySlider';
import { QuickCard } from '@/components/QuickCard';
import { HowToPlay } from '@/components/HowToPlay';
import { FAQSection } from '@/components/FAQSection';
import { ProTips } from '@/components/ProTips';
import { QuickReference } from '@/components/QuickReference';
import { Table, THead, TBody, TR, TH, TD } from '@/components/MdxTable';

// 将标题文本转换为 slug 格式
function slugify(text: React.ReactNode): string {
  const str = React.Children.toArray(text)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('');
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * GameMDX - Renders MDX content with custom components
 *
 * This component wraps next-mdx-remote and provides
 * custom components (AnomalySlider, QuickCard) to be used
 * within MDX files.
 */
interface GameMDXProps {
  source: string;
}

const components = {
  AnomalySlider,
  QuickCard,
  HowToPlay,
  FAQSection,
  ProTips,
  QuickReference,
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: TR,
  th: TH,
  td: TD,
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children);
    return (
      <h1
        id={id}
        className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 mt-8 leading-tight scroll-mt-24 text-center"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children);
    return (
      <h2
        id={id}
        className="text-3xl font-bold text-purple-700 dark:text-purple-200 mb-5 mt-7 leading-tight scroll-mt-24 text-center"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children);
    return (
      <h3
        id={id}
        className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 mt-6 leading-tight scroll-mt-24 text-center"
        {...props}
      >
        {children}
      </h3>
    );
  },
};

export function GameMDX({ source }: GameMDXProps) {
  return (
    <div
      className="prose prose-slate prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-slate-100
                    prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:leading-tight prose-h1:font-extrabold
                    prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-7 prose-h2:leading-tight prose-h2:font-bold prose-h2:text-purple-700 dark:prose-h2:text-purple-200
                    prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6 prose-h3:leading-tight prose-h3:font-semibold prose-h3:text-slate-800 dark:prose-h3:text-slate-200
                    prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-5 prose-h4:font-semibold
                    prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-500 dark:hover:prose-a:text-purple-300 prose-a:font-medium
                    prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-semibold
                    prose-code:text-purple-600 dark:prose-code:text-purple-300 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-800 prose-pre:rounded-lg
                    prose-ul:text-slate-700 dark:prose-ul:text-slate-300 prose-li:marker:text-purple-600 dark:prose-li:marker:text-purple-400
                    prose-ol:text-slate-700 dark:prose-ol:text-slate-300 prose-li:marker:text-purple-600 dark:prose-li:marker:text-purple-400
                    prose-td:text-slate-900 dark:prose-td:text-slate-300 prose-th:text-slate-800 dark:prose-th:text-slate-100
                    prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6
                    prose-hr:border-slate-200 dark:prose-hr:border-slate-800 prose-hr:my-8
                    [&>div]:overflow-x-auto [&>div>table]:w-full [&>div>table]:display:[table]"
    >
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}

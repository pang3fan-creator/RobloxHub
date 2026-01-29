import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';

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

const components = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children);
    return (
      <h1 id={id} className="text-4xl font-bold text-white mb-6 scroll-mt-24" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children);
    return (
      <h2 id={id} className="text-3xl font-bold text-white mt-12 mb-4 scroll-mt-24" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children);
    return (
      <h3 id={id} className="text-2xl font-semibold text-white mt-8 mb-3 scroll-mt-24" {...props}>
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-slate-300 mb-4 leading-relaxed" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2" {...props}>{children}</ul>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-slate-300" {...props}>{children}</li>
  ),
};

export function MDXContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote source={content} components={components} />
    </div>
  );
}

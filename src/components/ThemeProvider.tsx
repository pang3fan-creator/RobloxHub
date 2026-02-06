'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * ThemeProvider - 主题提供者组件
 *
 * 基于 next-themes 封装的主题管理系统。
 * 默认暗黑模式，支持用户手动切换和系统主题检测。
 *
 * Design tokens:
 * - defaultTheme: "dark" (保持恐怖游戏氛围)
 * - enableSystem: true (检测用户系统偏好)
 * - attribute: "class" (与 Tailwind darkMode: "class" 配合)
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="robloxhub-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MoyuBall } from '@/components/MoyuBall';
import { NavigationGuard } from '@/components/NavigationGuard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '我的随身写作大师',
  description: '基于大语言模型的沉浸式、伴随式中学生记叙文写作指导专家',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
        {/* 墨玉拟人球 - 全局组件 */}
        <MoyuBall />
        {/* 导航守卫 */}
        <NavigationGuard />
      </body>
    </html>
  );
}

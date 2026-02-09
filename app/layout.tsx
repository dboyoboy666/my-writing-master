import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WritingProvider } from '@/stores/writing';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '我的随身写作大师 | AI驱动的沉浸式写作系统',
  description: '基于qwen-plus大模型的六步登山写作法，提供启发式引导、苏格拉底追问、批判性挑刺三阶认知迭代',
  openGraph: {
    images: ['/og-writing-master.jpg'],
    siteName: '我的随身写作大师',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WritingProvider>
          {children}
        </WritingProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Noto_Sans_KR, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/notion";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "블로그", template: "%s | 블로그" },
  description: "Notion으로 관리하는 개인 블로그",
  openGraph: {
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: string[] = [];
  try {
    categories = await getCategories();
  } catch {
    // Notion 미설정 시 빈 배열
  }

  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Header categories={categories} />
        <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

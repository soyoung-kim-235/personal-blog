import type { Metadata } from "next";
import { Noto_Sans_KR, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/notion";
import { ThemeProvider } from "@/components/ThemeProvider";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Soyoung Kim | Product & Tech Blog", template: "%s | Soyoung Kim" },
  description: "Notion을 CMS로 활용하는 Soyoung Kim의 기술 블로그입니다. 제품 기획과 개발에 관한 인사이트를 공유합니다.",
  keywords: ["Notion Blog", "Next.js", "TypeScript", "Product Manager", "Developer", "Tech Insights"],
  authors: [{ name: "Soyoung Kim" }],
  creator: "Soyoung Kim",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "Soyoung Kim Blog",
    title: "Soyoung Kim | Product & Tech Blog",
    description: "Notion을 CMS로 활용하는 Soyoung Kim의 기술 블로그입니다.",
    images: [
      {
        url: "/og-image.png", // 나중에 이미지가 있으면 연결
        width: 1200,
        height: 630,
        alt: "Soyoung Kim Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soyoung Kim | Product & Tech Blog",
    description: "Notion을 CMS로 활용하는 Soyoung Kim의 기술 블로그입니다.",
    creator: "@soyoung",
  },
  robots: {
    index: true,
    follow: true,
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
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSansKr.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header categories={categories} />
          <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-12">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

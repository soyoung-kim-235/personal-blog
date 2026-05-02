import { Feed } from "feed";
import { getPosts } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await getPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  
  const feed = new Feed({
    title: "Soyoung Kim Blog",
    description: "Personal technical blog about development and insights.",
    id: siteUrl,
    link: siteUrl,
    language: "ko",
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Soyoung Kim`,
    updated: new Date(posts[0]?.updatedAt || new Date()),
    generator: "Next.js RSS Feed Generator",
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
    author: {
      name: "Soyoung Kim",
      link: siteUrl,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/posts/${post.slug}`,
      link: `${siteUrl}/posts/${post.slug}`,
      description: post.description || "",
      content: post.description || "",
      author: [
        {
          name: "Soyoung Kim",
          link: siteUrl,
        },
      ],
      date: new Date(post.date || post.createdAt),
      image: post.cover || undefined,
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

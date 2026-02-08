import { MetadataRoute } from "next";
import { getPosts, getCategories } from "@/lib/notion";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/posts`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];

  try {
    const [posts, categories] = await Promise.all([
      getPosts(),
      getCategories(),
    ]);

    const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${BASE_URL}/posts/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${BASE_URL}/category/${encodeURIComponent(c)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...postUrls, ...categoryUrls];
  } catch {
    return staticPages;
  }
}

/**
 * Notion API 연동
 * - NOTION_API_KEY, NOTION_DATABASE_ID는 환경변수로만 설정 (코드에 하드코딩 금지)
 * - Status 속성이 'Public'인 글만 조회하여 블로그 목록/상세에 사용
 */
import {
  Client,
  isFullPage,
  isFullBlock,
  type BlockObjectResponse,
  type PageObjectResponse,
} from "@notionhq/client";
import type { Post } from "./types";

const CACHE_SECONDS = 60;

function getClient(): Client {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!apiKey || !databaseId) {
    throw new Error(
      "NOTION_API_KEY and NOTION_DATABASE_ID must be set in environment."
    );
  }
  return new Client({ auth: apiKey });
}

function getDatabaseId(): string {
  const id = process.env.NOTION_DATABASE_ID;
  if (!id) throw new Error("NOTION_DATABASE_ID must be set in environment.");
  return id;
}

function parsePageToPost(page: PageObjectResponse): Post {
  const props = page.properties;

  const getTitle = () => {
    const p = props.Title;
    if (p && "title" in p && Array.isArray(p.title) && p.title[0])
      return (p.title[0] as { plain_text: string }).plain_text;
    return "";
  };

  const getRichText = (key: string) => {
    const p = props[key];
    if (p && "rich_text" in p && Array.isArray((p as { rich_text: unknown[] }).rich_text)) {
      const rt = (p as { rich_text: { plain_text: string }[] }).rich_text;
      return rt.length > 0 ? rt[0].plain_text : "";
    }
    return "";
  };

  const getSelect = (key: string) => {
    const p = props[key];
    if (p && "select" in p && (p as { select: { name: string } | null }).select)
      return (p as { select: { name: string } }).select.name;
    return "";
  };

  const getMultiSelect = (key: string): string[] => {
    const p = props[key];
    if (p && "multi_select" in p && Array.isArray((p as { multi_select: { name: string }[] }).multi_select))
      return (p as { multi_select: { name: string }[] }).multi_select.map((x) => x.name);
    return [];
  };

  const getDate = (key: string): string => {
    const p = props[key];
    if (p && "date" in p && (p as { date: { start: string } | null }).date)
      return (p as { date: { start: string } }).date.start;
    return "";
  };

  const status = getSelect("Status") as "Public" | "Private";
  const slug = getRichText("Slug") || getTitle().toLowerCase().replace(/\s+/g, "-");

  return {
    id: page.id,
    title: getTitle(),
    slug,
    status: status === "Public" || status === "Private" ? status : "Private",
    category: getMultiSelect("Category"),
    tags: getMultiSelect("Tags"),
    date: getDate("Date"),
    description: getRichText("Description") || null,
    createdAt: page.created_time,
    updatedAt: page.last_edited_time,
  };
}

const fetchOptions = {
  next: { revalidate: CACHE_SECONDS } as const,
};

/**
 * Public 글 전체 조회 (최신순)
 */
export async function getPosts(): Promise<Post[]> {
  const notion = getClient();
  const databaseId = getDatabaseId();

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      select: { equals: "Public" },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  const posts: Post[] = response.results
    .filter((r): r is PageObjectResponse => "properties" in r && isFullPage(r))
    .map(parsePageToPost)
    .filter((p) => p.slug && p.title);

  return posts;
}

/**
 * Slug로 단일 글 조회 (Public만)
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const notion = getClient();
  const databaseId = getDatabaseId();

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        { property: "Status", select: { equals: "Public" } },
        { property: "Slug", rich_text: { equals: slug } },
      ],
    },
  });

  const page = response.results[0];
  if (!page || !("properties" in page) || !isFullPage(page)) return null;
  return parsePageToPost(page);
}

/**
 * 카테고리 목록 (Public 글에서 사용된 것만)
 */
export async function getCategories(): Promise<string[]> {
  const posts = await getPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.category.forEach((c) => set.add(c)));
  return Array.from(set).sort();
}

/**
 * 카테고리별 글 조회 (최신순)
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((p) =>
    p.category.some((c) => c.toLowerCase() === category.toLowerCase())
  );
}

/**
 * 글 본문 블록 조회 (상세 페이지용)
 * DB 컬럼이 아니라, 각 DB 행(페이지)을 열었을 때 안에 작성한 본문 블록만 가져옵니다.
 * 페이지네이션으로 블록을 전부 가져옵니다.
 */
export async function getPostBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const notion = getClient();
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      start_cursor: cursor,
    });

    const pageBlocks = response.results.filter(
      (b): b is BlockObjectResponse => isFullBlock(b)
    );
    blocks.push(...pageBlocks);
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return blocks;
}

/**
 * Slug로 페이지 ID 조회 (블록 조회용)
 */
export async function getPageIdBySlug(slug: string): Promise<string | null> {
  const post = await getPostBySlug(slug);
  return post?.id ?? null;
}

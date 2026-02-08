/**
 * 블로그 글 (Notion Database row)
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  status: "Public" | "Private";
  category: string[];
  tags: string[];
  date: string;
  description: string | null;
  content?: unknown;
  createdAt: string;
  updatedAt: string;
}

/**
 * PostCard 컴포넌트 props
 */
export interface PostCardProps {
  title: string;
  description: string;
  date: string;
  category: string[];
  slug: string;
  tags?: string[];
}

/**
 * Notion API 응답용 내부 타입
 */
export interface NotionPageRecord {
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: Record<string, unknown>;
}

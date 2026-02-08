/**
 * 날짜 포맷 (YYYY-MM-DD → 읽기 쉬운 형식)
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Slug 유효성 (영문 소문자, 숫자, 하이픈)
 */
export const SLUG_REGEX = /^[a-z0-9-]+$/;

export function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug);
}

/**
 * 빈 문자열/배열 정규화
 */
export function ensureString(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string")
    return value[0];
  return "";
}

export function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value))
    return value.filter((v): v is string => typeof v === "string");
  if (typeof value === "string" && value) return [value];
  return [];
}

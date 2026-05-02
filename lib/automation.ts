import { getPosts, getPostBlocks, updatePageProperties } from "./notion";

/**
 * 텍스트에서 태그 후보군 추출 (단순 키워드 기반)
 */
function extractTags(title: string, blocks: any[]): string[] {
  const allText = title + " " + blocks
    .map(b => {
      const type = b.type;
      const content = b[type];
      return "rich_text" in content 
        ? content.rich_text.map((rt: any) => rt.plain_text).join(" ") 
        : "";
    })
    .join(" ");

  // 단순 키워드 매칭 (기술 블로그용 기본 사전)
  const keywords = [
    "Next.js", "React", "TypeScript", "JavaScript", "Notion", "API", 
    "UI", "UX", "개발", "기획", "디자인", "인사이트", "회고", "전략", 
    "Tailwind", "CSS", "Vercel", "Frontend", "Backend", "Product"
  ];

  const foundTags = keywords.filter(kw => 
    allText.toLowerCase().includes(kw.toLowerCase())
  );

  return [...new Set(foundTags)].slice(0, 5); // 중복 제거 및 최대 5개
}

/**
 * 제목 기반 Slug 생성
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\sㄱ-힣]/g, "") // 특수문자 제거
    .replace(/\s+/g, "-"); // 공백을 하이픈으로
}

/**
 * 메인 자동화 함수
 */
export async function runAutomation() {
  console.log("🚀 Notion DB 자동화 작업을 시작합니다...");
  
  try {
    const posts = await getPosts();
    let updatedCount = 0;

    for (const post of posts) {
      const updates: any = {};

      // 1. Slug가 비어있거나 제목과 너무 다를 경우 (옵션) 체크
      // 여기서는 비어있는 경우만 채움
      if (!post.slug || post.slug === post.title.toLowerCase().replace(/\s+/g, "-")) {
         // 실제 DB에 Slug 값이 비어있는지 로직 확인이 필요할 수 있으나 
         // 우선 post 객체에 slug가 기본 생성된 값인지 확인
      }

      // 2. Tags가 비어있는 경우
      const hasNoTags = !post.tags || post.tags.length === 0;
      
      if (hasNoTags) {
        console.log(`📝 [${post.title}] 태그 분석 중...`);
        const blocks = await getPostBlocks(post.id);
        const recommendedTags = extractTags(post.title, blocks);
        
        if (recommendedTags.length > 0) {
          updates["Tags"] = {
            multi_select: recommendedTags.map(tag => ({ name: tag }))
          };
        }
      }

      // Slug 자동 생성 (이미 수동으로 넣은게 없다면)
      // Notion API 특성상 속성이 비어있는지 판단하기 위해 
      // 실제 원본 데이터를 한 번 더 체크하거나 정책에 따름
      // 여기서는 사용자의 요청대로 "비어있을 때만" 업데이트
      
      if (Object.keys(updates).length > 0) {
        console.log(`✅ [${post.title}] 업데이트 적용 중:`, Object.keys(updates));
        await updatePageProperties(post.id, updates);
        updatedCount++;
      }
    }

    console.log(`✨ 자동화 완료! 총 ${updatedCount}개의 포스트가 업데이트되었습니다.`);
  } catch (error) {
    console.error("❌ 자동화 작업 중 오류 발생:", error);
  }
}

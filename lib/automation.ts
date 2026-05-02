import { getPosts, getPostBlocks, updatePageProperties } from "./notion";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface AnalysisResult {
  tags: string[];
  description: string;
}

/**
 * Gemini API를 사용한 본문 분석 및 메타데이터(Tag, Description) 생성
 */
async function analyzePostWithAI(title: string, blocks: any[]): Promise<AnalysisResult | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ GEMINI_API_KEY가 설정되지 않아 AI 가공을 건너뜁니다.");
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // 속도와 비용면에서 우수한 최신 모델 사용
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const allText = blocks
    .map(b => {
      const type = b.type;
      const content = b[type];
      return "rich_text" in content 
        ? content.rich_text.map((rt: any) => rt.plain_text).join(" ") 
        : "";
    })
    .join("\n");

  if (!allText.trim()) return null;

  // 프롬프트 작성: AI에게 명확한 역할과 JSON 응답 포맷 요구
  const prompt = `
당신은 기술 및 기획 블로그의 수석 에디터입니다.
다음은 "${title}" 이라는 제목의 블로그 글 본문입니다.

본문을 분석하여 다음 2가지를 JSON 형식으로만 응답해주세요.
1. "description": 글의 내용을 가장 잘 요약하는 매력적이고 자연스러운 1~2문장의 소개글 (최대 160자, 독자의 호기심을 유발할 것)
2. "tags": 글의 주제, 기술 스택, 핵심 키워드를 나타내는 태그 목록 (가장 핵심적인 3~5개만)

[본문 시작]
${allText.slice(0, 20000)} // 긴 글은 앞부분 위주로 분석
[본문 끝]

반드시 아래와 같은 JSON 형식으로만 대답하세요. 다른 설명은 붙이지 마세요.
{
  "description": "요약문 내용...",
  "tags": ["태그1", "태그2", "태그3"]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // JSON 파싱 (AI가 마크다운 코드 블록으로 감싸서 줄 경우를 대비)
    const cleaned = response.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    
    return {
      description: parsed.description || "",
      tags: parsed.tags || []
    };
  } catch (error) {
    console.error("❌ AI 분석 중 오류:", error);
    return null;
  }
}

/**
 * 메인 자동화 함수
 */
export async function runAutomation() {
  console.log("🚀 Gemini 기반 Notion CMS 자동화 작업을 시작합니다...");
  
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ .env.local 파일에 GEMINI_API_KEY가 없습니다.");
    return;
  }

  try {
    const posts = await getPosts();
    let updatedCount = 0;

    for (const post of posts) {
      const updates: any = {};

      // Tags나 Description이 비어있는 경우만 AI 동작
      const hasNoTags = !post.tags || post.tags.length === 0;
      const hasNoDescription = !post.description;
      
      if (hasNoTags || hasNoDescription) {
        console.log(`📝 [${post.title}] Gemini가 문맥을 분석 중입니다...`);
        const blocks = await getPostBlocks(post.id);
        
        const aiResult = await analyzePostWithAI(post.title, blocks);
        
        if (aiResult) {
          if (hasNoTags && aiResult.tags.length > 0) {
            updates["Tags"] = {
              multi_select: aiResult.tags.map(tag => ({ name: tag }))
            };
          }

          if (hasNoDescription && aiResult.description) {
            updates["Description"] = {
              rich_text: [{ text: { content: aiResult.description } }]
            };
          }
        }
      }

      // 변경사항이 있다면 Notion DB에 쓰기
      if (Object.keys(updates).length > 0) {
        console.log(`✨ [${post.title}] 분석 완료! Notion DB에 적용합니다:`, Object.keys(updates));
        await updatePageProperties(post.id, updates);
        updatedCount++;
      }
    }

    console.log(`🎉 자동화 완료! 총 ${updatedCount}개의 포스트가 Gemini를 통해 똑똑해졌습니다.`);
  } catch (error) {
    console.error("❌ 자동화 작업 중 오류 발생:", error);
  }
}

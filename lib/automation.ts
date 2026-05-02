import { getPosts, getPostById, getPostBlocks, updatePageProperties, addCommentToPage } from "@/lib/notion";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface AnalysisResult {
  tags: string[];
  description: string;
  feedback?: string;
}

/**
 * Gemini API를 사용한 본문 분석 및 메타데이터(Tag, Description) 생성 및 피드백
 */
async function analyzePostWithAI(title: string, blocks: any[]): Promise<AnalysisResult | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ GEMINI_API_KEY가 설정되지 않아 AI 가공을 건너뜁니다.");
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
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

  const prompt = `
당신은 기술 및 기획 블로그의 수석 에디터입니다.
다음은 "${title}" 이라는 제목의 블로그 글 초안(Private 상태) 본문입니다.

본문을 분석하여 다음 3가지를 JSON 형식으로만 응답해주세요.
1. "description": 글의 내용을 가장 잘 요약하는 매력적이고 자연스러운 1~2문장의 소개글 (최대 160자, 독자의 호기심을 유발할 것)
2. "tags": 글의 주제, 기술 스택, 핵심 키워드를 나타내는 태그 목록 (가장 핵심적인 3~5개만)
3. "feedback": 글의 구성, 문맥, 가독성 등에 대한 에디터로서의 정성스러운 피드백과 개선 제안 (3~4문장)

[본문 시작]
${allText.slice(0, 20000)} // 긴 글은 앞부분 위주로 분석
[본문 끝]

반드시 아래와 같은 JSON 형식으로만 대답하세요. 다른 설명은 붙이지 마세요.
{
  "description": "요약문 내용...",
  "tags": ["태그1", "태그2", "태그3"],
  "feedback": "도입부가 매우 흥미롭습니다. 다만 중반부에 기술적인 설명이 다소 뭉쳐있어 문단을 나누면 가독성이 더 좋아질 것 같습니다. 결론부에..."
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    const cleaned = response.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    
    return {
      description: parsed.description || "",
      tags: parsed.tags || [],
      feedback: parsed.feedback || ""
    };
  } catch (error) {
    console.error("❌ AI 분석 중 오류:", error);
    return null;
  }
}

/**
 * 단일 포스트 처리 (Webhook 연동용)
 */
export async function processSinglePost(pageId: string) {
  const post = await getPostById(pageId);
  
  if (!post) {
    console.log(`⚠️ [Webhook] 페이지를 찾을 수 없습니다. (ID: ${pageId})`);
    return false;
  }

  // Public 상태인 경우 AI 가공을 건너뜁니다. (캐시 초기화를 위해 true를 반환하여 revalidate 하도록 함)
  if (post.status === "Public") {
    console.log(`✅ [Webhook] 이미 Public 상태이므로 AI 분석을 생략합니다. (ID: ${pageId})`);
    return true; 
  }

  const updates: any = {};
  const hasNoTags = !post.tags || post.tags.length === 0;
  const hasNoDescription = !post.description;

  // Private 상태이고, 태그나 요약이 비어있을 때만 AI 가동
  if (hasNoTags || hasNoDescription) {
    console.log(`📝 [${post.title}] Gemini가 초안을 검토하고 분석 중입니다...`);
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
      
      // 피드백이 있다면 노션 페이지에 댓글로 달아주기
      if (aiResult.feedback) {
        const commentText = `🤖 Gemini 수석 에디터의 리뷰 도착!\n\n${aiResult.feedback}`;
        await addCommentToPage(post.id, commentText);
        console.log(`💬 [${post.title}] 노션 페이지에 AI 리뷰 댓글을 달았습니다.`);
      }
    }
  }

  if (Object.keys(updates).length > 0) {
    console.log(`✨ [${post.title}] 초안 가공 완료! Notion DB에 적용합니다:`, Object.keys(updates));
    await updatePageProperties(post.id, updates);
    return true; // 업데이트 발생
  }
  
  return false; // 변경사항 없음
}

/**
 * 전체 메인 자동화 함수 (빌드 또는 수동 실행용)
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
      const isUpdated = await processSinglePost(post.id);
      if (isUpdated) updatedCount++;
    }

    console.log(`🎉 자동화 완료! 총 ${updatedCount}개의 포스트를 확인했습니다.`);
  } catch (error) {
    console.error("❌ 자동화 작업 중 오류 발생:", error);
  }
}

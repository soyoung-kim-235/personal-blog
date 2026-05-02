import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { processSinglePost } from "@/lib/automation";
import crypto from "crypto";

// [선택 사항] 노션에서 제공하는 웹훅 시크릿
// 보안을 위해 노션 Integration 페이지에서 웹훅 시크릿을 발급받아 .env.local에 추가하세요.
const NOTION_WEBHOOK_SECRET = process.env.NOTION_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-notion-signature");
    const bodyText = await req.text(); // raw body for signature verification

    // 1. Signature 검증 (시크릿 키가 설정된 경우에만 수행)
    if (NOTION_WEBHOOK_SECRET && signature) {
      const hmac = crypto.createHmac("sha256", NOTION_WEBHOOK_SECRET);
      hmac.update(bodyText);
      const expectedSignature = hmac.digest("hex");

      // timingSafeEqual를 사용해 안전하게 비교
      const isValid = crypto.timingSafeEqual(
        Buffer.from(`sha256=${expectedSignature}`),
        Buffer.from(signature)
      );

      if (!isValid) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    // 2. 페이로드 파싱
    const payload = JSON.parse(bodyText);
    
    // [중요] 노션 웹훅 구독 인증(Verification) 처리
    // 노션에서 웹훅 URL을 처음 등록할 때 verification_token을 보냅니다.
    if (payload.verification_token) {
      console.log("==========================================");
      console.log("🔔 노션 웹훅 인증 토큰이 도착했습니다!");
      console.log(`🔑 토큰: ${payload.verification_token}`);
      console.log("==========================================");
      
      // 토큰을 그대로 응답해줍니다. (노션 UI에 직접 입력해야 할 수도 있음)
      return NextResponse.json({ 
        verification_token: payload.verification_token 
      });
    }

    // 노션 웹훅은 data.id (혹은 source.id 등 버전에 따라 다름)를 통해 페이지 ID를 전달합니다.
    const eventType = payload?.type;
    let pageId = null;

    if (eventType?.startsWith("page.")) {
      pageId = payload?.data?.id;
    } else {
      return NextResponse.json({ status: "ignored", reason: "not a page event" });
    }

    if (!pageId) {
      return NextResponse.json({ error: "No page ID found in payload" }, { status: 400 });
    }

    // 3. 해당 포스트 1건에 대해 Gemini 분석 및 업데이트 수행
    const isUpdated = await processSinglePost(pageId);

    // 4. 캐시 초기화 (블로그 화면 최신화)
    if (isUpdated) {
      revalidatePath("/");
      revalidatePath("/posts");
    }

    return NextResponse.json({ 
      success: true, 
      processed: isUpdated,
      pageId 
    });

  } catch (error) {
    console.error("❌ Notion Webhook 처리 오류:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

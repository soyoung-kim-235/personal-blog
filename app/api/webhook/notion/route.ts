import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { processSinglePost } from "@/lib/automation";
import crypto from "crypto";

// [선택 사항] 노션에서 제공하는 웹훅 시크릿
// 보안을 위해 노션 Integration 페이지에서 웹훅 시크릿을 발급받아 .env.local에 추가하세요.
const NOTION_WEBHOOK_SECRET = process.env.NOTION_WEBHOOK_SECRET;

async function handleRequest(req: Request) {
  try {
    const signature = req.headers.get("x-notion-signature");
    const bodyText = await req.text(); // raw body for signature verification

    // 1. Signature 검증 (시크릿 키가 설정된 경우에만 수행)
    if (NOTION_WEBHOOK_SECRET && signature) {
      const hmac = crypto.createHmac("sha256", NOTION_WEBHOOK_SECRET);
      hmac.update(bodyText);
      const expectedSignature = hmac.digest("hex");

      const isValid = crypto.timingSafeEqual(
        Buffer.from(`sha256=${expectedSignature}`),
        Buffer.from(signature)
      );

      if (!isValid) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    // 2. 페이로드 파싱 (GET 등 body가 없는 경우 처리)
    let payload: any = {};
    if (bodyText) {
      try {
        payload = JSON.parse(bodyText);
      } catch (e) {
        console.warn("JSON parse error:", e);
      }
    } else {
      // GET 요청의 경우 URL Query Parameter에 token이 있을 수 있습니다.
      const url = new URL(req.url);
      const token = url.searchParams.get("verification_token") || url.searchParams.get("challenge");
      if (token) {
        payload.verification_token = token;
      }
    }
    
    // [중요] 노션 웹훅 구독 인증(Verification) 처리
    if (payload.verification_token) {
      console.log("==========================================");
      console.log("🔔 노션 웹훅 인증 토큰이 도착했습니다!");
      console.log(`🔑 토큰: ${payload.verification_token}`);
      console.log("==========================================");
      
      return NextResponse.json({ 
        verification_token: payload.verification_token 
      });
    }

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

export async function POST(req: Request) { return handleRequest(req); }
export async function PUT(req: Request) { return handleRequest(req); }
export async function GET(req: Request) { return handleRequest(req); }
export async function PATCH(req: Request) { return handleRequest(req); }
export async function DELETE(req: Request) { return handleRequest(req); }

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-notion-signature",
    },
  });
}

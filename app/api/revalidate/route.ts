import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Notion Webhook 또는 수동 트리거 시 캐시 재검증
 * POST /api/revalidate
 * Body: { "secret": "REVALIDATE_SECRET", "path": "/posts" } (path 선택)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = body.secret ?? body.token;
    const expected = process.env.REVALIDATE_SECRET;

    if (expected && secret !== expected) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const path = body.path as string | undefined;
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    revalidatePath("/");
    revalidatePath("/posts");
    revalidatePath("/posts/[slug]", "page");
    revalidatePath("/category/[name]", "page");

    return NextResponse.json({ revalidated: true });
  } catch (e) {
    return NextResponse.json(
      { message: e instanceof Error ? e.message : "Error" },
      { status: 500 }
    );
  }
}

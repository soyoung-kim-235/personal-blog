"use server";

import { getPostBySlug } from "@/lib/notion";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function verifyPostPassword(
    slug: string,
    passwordInput: string
): Promise<{ success: boolean; message?: string }> {
    try {
        const post = await getPostBySlug(slug);

        if (!post) {
            return { success: false, message: "Post not found" };
        }

        if (!post.password) {
            // If no password set, open access. But this action shouldn't be called ideally.
            return { success: true };
        }

        if (post.password === passwordInput) {
            // Set access cookie
            // Name: post-access-{slug}
            // Value: true
            // Options: HttpOnly, Secure, SameSite, MaxAge (e.g., 1 day)
            cookies().set(`post-access-${slug}`, "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            });

            // Reload page to reflect access
            revalidatePath(`/posts/${slug}`);
            return { success: true };
        } else {
            return { success: false, message: "비밀번호가 일치하지 않습니다." };
        }
    } catch (error) {
        console.error("verifyPostPassword error:", error);
        return { success: false, message: "오류가 발생했습니다." };
    }
}

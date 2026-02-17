"use client";

import { useState } from "react";
import { verifyPostPassword } from "@/app/actions";

interface PasswordGateProps {
    slug: string;
    title: string;
}

export default function PasswordGate({ slug, title }: PasswordGateProps) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await verifyPostPassword(slug, password);

        if (!result.success) {
            setError(result.message || "비밀번호가 올바르지 않습니다.");
            setLoading(false);
        } else {
            // Success case handled by server action (revalidatePath)
            // We can just reload to be sure, or let revalidatePath do its job
            // But revalidatePath re-renders the server component.
            // Since we are in a client component, we might need to router.refresh() if revalidatePath doesn't trigger client update automatically?
            // Actually Server Actions + revalidatePath SHOULD update the UI.
            // But if not, we can use router.refresh().
            // Let's add router.refresh() just in case OR simple reload.
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <svg
                            className="h-6 w-6 text-neutral-600 dark:text-neutral-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        비밀글입니다
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                        이 글을 보려면 비밀번호를 입력하세요.
                    </p>
                    <p className="mt-1 font-medium text-neutral-900 dark:text-neutral-200">
                        &quot;{title}&quot;
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:ring-white"
                            placeholder="비밀번호 입력"
                        />
                        {error && (
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-lg bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                        {loading ? "확인 중..." : "확인"}
                    </button>
                </form>
            </div>
        </div>
    );
}

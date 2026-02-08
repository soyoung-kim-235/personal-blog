"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-9xl font-bold text-neutral-200 dark:text-neutral-800">
                500
            </h1>
            <div className="space-y-4 -mt-12 relative z-10">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    문제가 발생했습니다
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                    서버에서 예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                </p>
                <div className="pt-4 space-x-4">
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        </div>
    );
}

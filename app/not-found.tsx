import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-9xl font-bold text-neutral-200 dark:text-neutral-800">
                404
            </h1>
            <div className="space-y-4 -mt-12 relative z-10">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    페이지를 찾을 수 없습니다
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                    요청하신 페이지가 존재하지 않거나, 이름이 변경되었거나, 일시적으로 사용할 수 좋습니다.
                </p>
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                    >
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}

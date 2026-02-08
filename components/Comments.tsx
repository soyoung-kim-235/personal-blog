"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Comments() {
    const [mounted, setMounted] = useState(false);
    // next-themes를 아직 안 쓰므로 일단 os 설정에 따르거나 기본값 사용
    // 추후 다크모드 도입 시 useTheme 사용
    const theme = "preferred_color_scheme";

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`;
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

    if (!repo || !repoId || !category || !categoryId) {
        return null;
    }

    return (
        <div className="mt-20 pt-10 border-t border-neutral-200 dark:border-neutral-800">
            <Giscus
                id="comments"
                repo={repo}
                repoId={repoId}
                category={category}
                categoryId={categoryId}
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme}
                lang="ko"
                loading="lazy"
            />
        </div>
    );
}

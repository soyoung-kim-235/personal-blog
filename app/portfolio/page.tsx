import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "포트폴리오",
    description: "Frontend Developer 포트폴리오",
};

export default function PortfolioPage() {
    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="flex flex-col items-center text-center space-y-6 pt-10">
                <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-neutral-800">
                    {/* Placeholder for profile image */}
                    <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-4xl">
                        🧑‍💻
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-neutral-900 dark:text-white">
                        김소영
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">
                        Frontend Developer
                    </p>
                </div>
                <p className="max-w-xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.
                    <br />
                    깔끔한 코드와 직관적인 인터페이스를 만드는 것을 좋아합니다.
                </p>
                <div className="flex gap-4">
                    <Link
                        href="mailto:contact@example.com"
                        className="px-6 py-3 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                    >
                        Contact Me
                    </Link>
                    <Link
                        href="https://github.com/soyoung-kim-235"
                        target="_blank"
                        className="px-6 py-3 rounded-full bg-neutral-100 text-neutral-900 font-medium hover:bg-neutral-200 transition dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                    >
                        GitHub
                    </Link>
                </div>
            </section>

            {/* Skills Section */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-white">
                    Skills
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "Notion API", "Git", "Figma", "Node.js"].map((skill) => (
                        <div
                            key={skill}
                            className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm text-center font-medium hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section className="space-y-8 map-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-white">
                    Experience
                </h2>
                <div className="space-y-8 max-w-3xl mx-auto relative border-l border-neutral-200 dark:border-neutral-800 ml-4 md:ml-auto pl-8 md:pl-0">
                    {/* Item 1 */}
                    <div className="relative md:pl-8">
                        <div className="absolute top-0 -left-[37px] w-4 h-4 rounded-full bg-neutral-900 ring-4 ring-white dark:bg-white dark:ring-neutral-950 md:-left-[21px]"></div>
                        <div className="space-y-2">
                            <span className="text-sm text-neutral-500 font-medium">2024.01 - Present</span>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Frontend Developer</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 font-medium">Tech Startup A</p>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                Next.js 기반의 서비스 리뉴얼 프로젝트를 주도했습니다. 성능 최적화를 통해 LCP를 1.2초로 단축하고, 컴포넌트 시스템을 구축하여 개발 생산성을 30% 향상시켰습니다.
                            </p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="relative md:pl-8">
                        <div className="absolute top-0 -left-[37px] w-4 h-4 rounded-full bg-neutral-300 ring-4 ring-white dark:bg-neutral-700 dark:ring-neutral-950 md:-left-[21px]"></div>
                        <div className="space-y-2">
                            <span className="text-sm text-neutral-500 font-medium">2022.03 - 2023.12</span>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Junior Developer</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 font-medium">Web Agency B</p>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                다양한 고객사의 반응형 웹사이트를 제작 및 유지보수했습니다. JavaScript와 CSS Animation을 활용한 인터랙티브 웹 구현에 집중했습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-white">
                    Featured Projects
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
                        <div className="aspect-video bg-neutral-100 flex items-center justify-center text-4xl group-hover:bg-neutral-200 transition dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
                            📝
                        </div>
                        <div className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Notion Blog Platform</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Notion을 CMS로 사용하는 개인 블로그입니다. Next.js 14와 Notion API를 연동하여 정적 페이지를 생성합니다.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">Next.js 14</span>
                                <span className="px-3 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">TypeScript</span>
                                <span className="px-3 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">Notion API</span>
                            </div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
                        <div className="aspect-video bg-neutral-100 flex items-center justify-center text-4xl group-hover:bg-neutral-200 transition dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
                            🛒
                        </div>
                        <div className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">E-commerce Dashboard</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                관리자용 대시보드 템플릿입니다. 차트 라이브러리를 활용한 데이터 시각화와 다크모드를 지원합니다.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">React</span>
                                <span className="px-3 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">Tailwind CSS</span>
                                <span className="px-3 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">Recharts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

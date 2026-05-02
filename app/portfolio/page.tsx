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
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Hero Section */}
      <section className="mb-24 flex flex-col items-start gap-10">
        <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-brand-accent shadow-xl shadow-brand-accent/10 sm:h-32 sm:w-32">
          <div className="flex h-full w-full items-center justify-center text-5xl">
            👋
          </div>
        </div>
        <div className="max-w-3xl space-y-8">
          <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-brand-text sm:text-7xl">
            I'm <span className="text-brand-accent">SOYOUNG</span>, <br />
            a Product Manager.
          </h1>
          <p className="text-xl font-medium leading-relaxed text-brand-text-sec sm:text-2xl">
            사용자 경험을 숫자가 아닌 이야기로 해석합니다. 복잡한 문제를 단순하게 정의하고, 팀이 최상의 결과를 낼 수 있는 환경을 만드는 데 집중합니다.
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <Link
              href="mailto:contact@example.com"
              className="rounded-full bg-brand-accent px-10 py-4 text-sm font-black uppercase tracking-widest text-brand-bg transition-all hover:bg-brand-accent-hover"
            >
              GET IN TOUCH
            </Link>
            <Link
              href="https://github.com/soyoung-kim-235"
              target="_blank"
              className="rounded-full bg-brand-bg-sec px-10 py-4 text-sm font-black uppercase tracking-widest text-brand-text transition-all hover:bg-brand-warm/20"
            >
              GITHUB
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-32">
        <h2 className="mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
          Core Expertise
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {["Strategy", "UX Research", "Data Analysis", "Agile", "Notion", "Figma", "React", "Next.js"].map((skill) => (
            <div
              key={skill}
              className="flex items-center justify-center rounded-lg border border-brand-border bg-brand-bg-sec py-6 text-[10px] font-black uppercase tracking-widest text-brand-text transition-all hover:border-brand-accent/30 hover:text-brand-accent"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-32">
        <h2 className="mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
          Selected Projects
        </h2>
        <div className="grid gap-16 sm:grid-cols-2">
          {/* Project 1 */}
          <div className="group space-y-8">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-brand-bg-sec">
              <div className="flex h-full w-full items-center justify-center text-6xl opacity-20 transition-transform duration-700 group-hover:scale-110">
                📈
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold tracking-tight text-brand-text">
                Service Growth Strategy
              </h3>
              <p className="text-lg font-medium leading-relaxed text-brand-text-sec">
                사용자 이탈률 20% 감소를 목표로 한 데이터 기반의 리뉴얼 프로젝트입니다. 유저 저니 맵을 재구성하여 결제 전환율을 15% 개선했습니다.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Data", "Strategy", "UX"].map((tag) => (
                  <span key={tag} className="rounded-full border border-brand-border px-4 py-1 text-[10px] font-black uppercase tracking-widest text-brand-text-sec">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group space-y-8">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-brand-bg-sec">
              <div className="flex h-full w-full items-center justify-center text-6xl opacity-20 transition-transform duration-700 group-hover:scale-110">
                🔗
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold tracking-tight text-brand-text">
                Internal Admin System
              </h3>
              <p className="text-lg font-medium leading-relaxed text-brand-text-sec">
                전사 운영 효율화를 위한 어드민 시스템 설계 및 구축 프로젝트입니다. 반복 업무를 자동화하여 운영 리소스를 주당 10시간 절감했습니다.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Product", "B2B", "Efficiency"].map((tag) => (
                  <span key={tag} className="rounded-full border border-brand-border px-4 py-1 text-[10px] font-black uppercase tracking-widest text-brand-text-sec">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <h2 className="mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
          Work Experience
        </h2>
        <div className="space-y-20">
          <div className="grid gap-6 sm:grid-cols-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-brand-text-sec/60">2024 - PRESENT</div>
            <div className="col-span-3 space-y-4">
              <h3 className="text-3xl font-bold tracking-tight text-brand-text">Tech Startup A</h3>
              <p className="text-xl font-bold text-brand-accent">Senior Product Manager</p>
              <p className="text-lg leading-relaxed text-brand-text-sec">
                핵심 지표 관리 및 서비스 로드맵 수립을 주도하고 있습니다. 크로스 기능팀(Cross-functional team)과의 협업을 통해 분기별 목표를 달성합니다.
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-brand-text-sec/60">2022 - 2023</div>
            <div className="col-span-3 space-y-4">
              <h3 className="text-3xl font-bold tracking-tight text-brand-text">Company B</h3>
              <p className="text-xl font-bold text-brand-accent">Product Researcher</p>
              <p className="text-lg leading-relaxed text-brand-text-sec">
                사용자 인터뷰와 사용성 테스트를 통해 도출된 인사이트를 바탕으로 제품의 초기 가설을 검증하고 설계 방향을 제안했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

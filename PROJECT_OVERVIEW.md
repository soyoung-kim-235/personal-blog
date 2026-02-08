# 📘 Notion Blog Project Overview

이 문서는 프로젝트의 **기획(PRD), 현황(Status), 그리고 향후 계획(Backlog)**을 하나로 통합한 마스터 문서입니다.

---

## 1. 📋 프로젝트 개요 (PRD 요약)

### 목적
- **Notion을 CMS로 활용**하여 글을 작성하고, **Next.js + Vercel**로 배포하는 개인 기술 블로그 구축
- 비개발자도 쉽게 운영 가능, 개발자는 커스터마이징 용이

### 핵심 기능
- **Notion 연동**: `Status=Public`인 글만 가져와서 보여줌
ㅏ- **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원 (Tailwind CSS)
- **SEO 최적화**: 메타태그, Sitemap, Robots.txt 자동 생성
- **배포 자동화**: GitHub Push → Vercel 자동 배포

### 기술 스택
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Style**: Tailwind CSS
- **CMS**: Notion API
- **Infra**: Vercel, GitHub

---

## 2. ✅ 완료된 작업 (Status & History)

### 🚀 Phase 1: 기본 구축 및 배포 (완료)
이미 모든 기능이 구현되어 배포까지 완료되었습니다.

- **프로젝트 셋팅**: Next.js 14, TypeScript, Tailwind, 폰트(Noto Sans KR)
- **Notion 연동**: API 연동, 데이터베이스 스키마 정의, 렌더러 구현
- **페이지 구현**:
  - 메인 (`/`), 글 목록 (`/posts`), 상세 (`/posts/[slug]`), 카테고리 (`/category/[name]`)
- **컴포넌트**: Header(반응형), Footer, PostCard, CategoryFilter
- **배포**: Vercel 배포 완료 및 도메인 연결 성공

---

## 3. 🏃 할 일 목록 (JIRA Backlog)

앞으로 진행할 작업들입니다. **우선순위(Priority)** 순서대로 진행하는 것을 추천합니다.

### 🔥 High Priority (당장 해야 함)

| ID | 제목 | 설명 | 이슈 타입 | 상태 |
|---|---|---|---|---|
| **NB-19** | **댓글 시스템 (Giscus)** | 방문자가 글에 댓글을 남길 수 있도록 GitHub Discussions 연동 | Story | **Done** ✅ |
| **BUG-01** | **카테고리 404 오류** | [일상], [회고] 등 카테고리 클릭 시 404 에러 발생 | Bug | **Done** ✅ |
| **NB-24** | **Notion 이미지 만료 해결** | Notion 이미지가 1시간 뒤 만료되어 엑박(X) 뜨는 문제 해결 (Next/Image 최적화) | Task | **Done** ✅ |
| **NB-15** | **포트폴리오 페이지** | `/portfolio` 경로에 자기소개, 기술 스택, 이력 페이지 구현 | Story | **Done** ✅ |

### ⚡ Medium Priority (곧 해야 함)

| ID | 제목 | 설명 | 이슈 타입 | 상태 |
|---|---|---|---|---|
| **NB-25** | **Callout 블록 개선** | `...`으로 나오는 Callout 블록을 아이콘+내용이 보이도록 렌더러 수정 | Task |
| **NB-26** | **에러 페이지 구현** | `404 Not Found` 및 `500 Error` 페이지 예쁘게 디자인 | Task | **Done** ✅ |
| **NB-27** | **파비콘 추가** | 브라우저 탭에 보일 로고 아이콘(`favicon.ico`) 적용 | Task |
| **NB-16** | **다크 모드** | 사용자 시스템 설정에 따른 라이트/다크 모드 토글 기능 | Story |
| **NB-17** | **검색 기능** | 글 제목이나 내용으로 검색하는 기능 추가 | Story |
| **NB-22** | **Webhook 연동** | Notion 글 수정 시, 배포 없이도 사이트에 즉시 반영되도록(ISR) 설정 | Task |
| **NB-27** | **비밀번호 보호 기능** | 특정 글을 비밀번호를 아는 사람만 볼 수 있도록 제한 | Feature | **Backlog** 📌 |

### 💤 Low Priority (나중에 해도 됨)

| ID | 제목 | 설명 | 이슈 타입 | 상태 |
|---|---|---|---|---|
| **NB-20** | **방문자 분석** | 몇 명이 들어왔는지 확인 (Vercel Analytics 또는 GA4) | Story |
| **NB-21** | **RSS 피드** | RSS 구독 지원 | Story |
| **NB-23** | **보안 취약점 점검** | `npm audit` 경고 해결 | Task |
### 🐛 Issue (버그 수정)

| ID | 제목 | 설명 | 상태 | 해결 방법 |
|---|---|---|---|---|
| **BUG-01** | **카테고리 404 오류** | [일상], [회고] 등 카테고리 클릭 시 404 에러 발생 | **Fixed** ✅ | 유니코드 정규화(NFC) 적용 |

---

## 4. 📂 참고 자료
- [Notion Developers](https://developers.notion.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

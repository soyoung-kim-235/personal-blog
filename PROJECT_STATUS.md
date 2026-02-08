# 프로젝트 현황

## 📌 지금까지 완료한 작업

### 1. 프로젝트 구성
- Next.js 14 (App Router), TypeScript, Tailwind CSS 초기화
- `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `.gitignore`, `.eslintrc.json` 설정
- Geist 폰트 미지원 이슈 → **Noto_Sans_KR**, **JetBrains_Mono** (next/font/google)로 교체

### 2. Notion 연동
- **lib/notion.ts**: 환경변수만 사용 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`), 코드에 하드코딩 없음
- **Status = 'Public'** 인 글만 조회 (목록/상세 공통)
- 본문은 **DB 컬럼이 아니라 각 DB 페이지(행) 안에 작성한 블록**만 사용
- 블록 페이지네이션으로 본문 블록 전부 조회 (100개 제한 제거)
- 함수: `getPosts()`, `getPostBySlug(slug)`, `getCategories()`, `getPostsByCategory(category)`, `getPostBlocks(pageId)`

### 3. 페이지
| 페이지 | 경로 | 비고 |
|--------|------|------|
| 메인 | `/` | 최근 Public 글 5개, 환경 미설정 시 안내 메시지 |
| 전체 글 | `/posts` | Public 전체 + 카테고리 필터 |
| 글 상세 | `/posts/[slug]` | 페이지 본문 블록 렌더링, 본문 없을 때 안내 문구 |
| 카테고리 | `/category/[name]` | 해당 카테고리 글만 |

### 4. 컴포넌트
- **Header**: 로고, 홈/전체 글, 카테고리 링크, 모바일 메뉴
- **Footer**: 저작권, 링크
- **PostCard**: 제목, 날짜, 요약, 카테고리/태그, 링크
- **CategoryFilter**: 전체/카테고리 필터 버튼
- **NotionRenderer**: paragraph, heading 1~3, 리스트, 인용, 코드, 구분선, 이미지, callout, to_do 등 블록 렌더링

### 5. SEO
- 레이아웃/페이지별 메타데이터 (title, description)
- **app/sitemap.ts**: 메인, /posts, 각 글·카테고리 URL
- **app/robots.ts**: allow `/`, disallow `/api/`, sitemap URL

### 6. 기타
- **/api/revalidate**: POST로 캐시 재검증 (선택 시 `REVALIDATE_SECRET` 검증)
- **.env.local.example**: `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `NEXT_PUBLIC_SITE_URL`, `REVALIDATE_SECRET` 예시
- **README.md**, **START.md**: 설치·실행·환경변수 안내
- `.gitignore`에 `.env*.local`, `.env` 포함 → GitHub에 비공개 유지

---

## ✅ PRD 완료 기준 체크

| 항목 | 상태 |
|------|------|
| Notion Database 설정 완료 | ✅ (Integration + DB 공유 완료, DATABASE_ID 반영) |
| 모든 페이지 정상 작동 | ✅ (메인, /posts, /posts/[slug], /category/[name]) |
| Public/Private 필터링 검증 | ✅ (Public만 조회) |
| 반응형 디자인 (모바일/태블릿/데스크톱) | ✅ (Tailwind, 모바일 메뉴) |
| SEO 메타데이터 적용 | ✅ (메타, sitemap, robots) |
| Vercel 배포 성공 | ⬜ 사용자가 진행 |
| 환경 변수 설정 완료 | ✅ (.env.local 사용 중) |
| README.md 작성 | ✅ |

---

## 📋 남은 작업 & 처리 방법

### 1. Vercel 배포 ✅ 가이드 작성됨

**목표**: 실제 도메인에서 블로그 서비스

**진행 방법**: **DEPLOY.md** 참고 (순서: Vercel 로그인 → GitHub 저장소 Import → 환경 변수 설정 → Deploy)

- GitHub 저장소는 이미 연결된 상태이므로, Vercel에서 해당 저장소만 Import 하면 됨
- 환경 변수: `NOTION_API_KEY`, `NOTION_DATABASE_ID` 필수

---

### 2. npm audit 경고 (선택)

**현황**: `npm install` 시 vulnerabilities 안내가 나올 수 있음

**처리 방법** (로컬 터미널에서):
```bash
npm audit fix
```
- `--force` 없이 먼저 실행. 문제 있으면 `npm run build` 로 확인 후 필요 시 `npm audit fix --force`

---

### 3. Node.js DeprecationWarning (선택) ✅ 스크립트 추가됨

**현황**: `url.parse()` 관련 DeprecationWarning (의존성에서 발생)

**처리 방법**:
- 무시해도 동작에는 문제 없음
- 경고 없이 실행하려면: **`npm run dev:quiet`** (package.json에 스크립트 추가됨)

---

### 4. PRD Phase 2 확장 (추후)

| 항목 | 처리 방법 |
|------|-----------|
| 포트폴리오 페이지 | `/portfolio` 등 새 라우트 추가, Notion 또는 정적 데이터로 구성 |
| 검색 기능 | Algolia 또는 Notion API로 제목/본문 검색 후 검색 페이지 구현 |
| 다크 모드 | `next-themes` 등으로 테마 토글, Tailwind dark: 유지 |

---

### 5. PRD Phase 3 확장 (추후)

| 항목 | 처리 방법 |
|------|-----------|
| 댓글 (Giscus) | GitHub Discussions 연동, 상세 페이지에 Giscus 컴포넌트 추가 |
| 조회수 트래킹 | Vercel Analytics 또는 별도 DB/API로 조회수 저장·표시 |
| RSS 피드 | `/feed.xml` 등 라우트에서 Public 글 목록을 RSS 형식으로 반환 |

---

### 6. Notion Webhook 연동 (선택)

**목표**: Notion에서 글 수정 시 자동으로 캐시 갱신

**처리 방법**:
1. Vercel 배포 후 `/api/revalidate` URL 확보
2. Notion Integration에서 Webhook 설정 (공식 Webhook이 있다면) 또는 Zapier/IFTTT 등으로 “Notion 수정 시 → POST /api/revalidate” 호출
3. 요청 시 `REVALIDATE_SECRET`을 body에 포함해 인증

---

## 📁 참고 파일

- **notion-blog-prd.md**: 원본 요구사항
- **README.md**: 설치·실행·배포 요약
- **START.md**: 로컬에서 바로 실행하는 단계
- **DEPLOY.md**: Vercel 배포 순서 (GitHub 연결 후 사용)
- **.env.local.example**: 필요한 환경변수 목록

---

## ▶ 다음에 할 일 (순서)

1. **Vercel 배포**: DEPLOY.md 보면서 Vercel에서 저장소 Import → 환경 변수 입력 → Deploy
2. **(선택)** 로컬에서 `npm audit fix` 실행 후 `npm run build` 로 빌드 확인
3. **(선택)** DeprecationWarning이 거슬리면 `npm run dev:quiet` 로 실행

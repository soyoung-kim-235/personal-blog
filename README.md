# Notion 블로그

Notion을 CMS로 사용하는 Next.js 14 개인 블로그입니다.

## 기능

- **Notion Database**에서 글 작성/수정/삭제
- Public/Private 상태 관리 (Private 글은 노출되지 않음)
- 카테고리·태그 분류
- 메인(최근 5개), 전체 글 목록, 카테고리별 목록, 글 상세 페이지
- 반응형 디자인 (Tailwind CSS)
- SEO: 메타데이터, Open Graph, Sitemap, robots.txt
- ISR(60초 revalidate) 및 선택적 Webhook 재검증 API

## 기술 스택

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Notion API (@notionhq/client)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Notion 설정

1. [Notion Integrations](https://www.notion.so/my-integrations)에서 새 연동 생성 후 **Internal Integration Token** 복사
2. 새 페이지에서 **Database (Full page)** 생성
3. Database 속성 추가 (이름 정확히 일치):

| 속성명     | 타입         | 필수 |
|-----------|--------------|------|
| Title     | Title        | ✅   |
| Slug      | Text         | ✅   |
| Status    | Select       | ✅   (값: Public, Private) |
| Category  | Multi-select | ❌   |
| Tags      | Multi-select | ❌   |
| Date      | Date         | ✅   |
| Description | Text       | ❌   |

4. Database 페이지 우측 상단 `...` → **Connections** → 방금 만든 연동 추가
5. 연동 페이지에서 **Capabilities** → Content, Comments 읽기 권한 확인

### 3. 환경 변수

`.env.local.example`을 복사해 `.env.local` 생성 후 값 입력. **API Key는 반드시 환경변수로만 설정하고 코드에 하드코딩하지 마세요.**

```env
NOTION_API_KEY=secret_xxxxx   # Notion Integration 토큰 (로컬/Vercel에만 설정)
NOTION_DATABASE_ID=3016e63cef5e80ea912fd9cf391bf333  # Database URL에서 ? 앞의 ID
```

- **NOTION_API_KEY**: [Notion Integrations](https://www.notion.so/my-integrations)에서 발급한 Internal Integration의 Secret
- **NOTION_DATABASE_ID**: Database 페이지 URL에서 `?v=` 앞 부분 (예: `https://www.notion.so/.../3016e63cef5e80ea912fd9cf391bf333?v=...` → `3016e63cef5e80ea912fd9cf391bf333`)

이 Database를 조회하며, **Status 속성이 'Public'인 글만** 블로그 목록·상세에 노출됩니다.

### 4. 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속. (Deprecation 경고 없이 실행하려면 `npm run dev:quiet`)

## 배포 (Vercel)

자세한 단계는 **[DEPLOY.md](./DEPLOY.md)** 참고.

1. GitHub에 저장소 푸시 (이미 연결되어 있으면 생략)
2. [Vercel](https://vercel.com)에서 **Import Project** → 해당 저장소 선택
3. **Environment Variables**에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 설정
4. (선택) `NEXT_PUBLIC_SITE_URL`, `REVALIDATE_SECRET` 설정

## 프로젝트 구조

```
app/
  layout.tsx, page.tsx, globals.css
  posts/page.tsx, posts/[slug]/page.tsx
  category/[name]/page.tsx
  api/revalidate/route.ts
  sitemap.ts, robots.ts
lib/
  notion.ts   # Notion API
  types.ts
  utils.ts
components/
  Header, Footer, PostCard, CategoryFilter, NotionRenderer
```

## 라이선스

MIT

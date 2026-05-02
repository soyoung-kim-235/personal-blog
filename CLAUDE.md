# Project Context
Notion 데이터베이스를 CMS로 사용하는 개인용 블로그 및 포트폴리오 사이트입니다. 깔끔하고 현대적인 디자인(Forest Green & White 테마)을 지향하며, Notion의 유연함과 Next.js의 성능을 결합한 것이 핵심입니다.

# Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, @tailwindcss/typography
- **CMS**: Notion API (@notionhq/client)
- **Theme**: next-themes (Dark/Light mode)
- **Comments**: Giscus (@giscus/react)

# Directory Structure
- `app/`: 라우트 정의, 레이아웃, 서버 컴포넌트 및 서버 액션 (`actions.ts`)
- `components/`: 재사용 가능한 UI 컴포넌트 (현재 Flat한 구조)
- `lib/`: Notion SDK 연동 로직 (`notion.ts`), 공통 타입 정의 (`types.ts`), 유틸리티 함수 (`utils.ts`)
- `public/`: 이미지, 파비콘 등 정적 에셋

# Code Conventions
- **Language**: TypeScript (엄격한 타입 정의 지향)
- **Naming**: 
  - 컴포넌트: PascalCase (`PostCard.tsx`)
  - 함수/변수: camelCase (`getPostBySlug`)
  - 페이지 디렉토리: kebab-case 또는 Next.js 규칙 (`[slug]`)
- **Import**: `@/*` 절대 경로 패턴 사용 (`@/lib/...`, `@/components/...`)
- **CSS**: Tailwind CSS 유틸리티 클래스 사용. 프로젝트 전역 테마 컬러(`brand-bg`, `brand-text`, `brand-accent` 등) 활용.

# Component Rules
- **Pattern**: 함수형 컴포넌트 및 `export default` 사용
- **Props**: 컴포넌트 파일 상단에 `interface [ComponentName]Props` 정의 또는 `lib/types.ts`에서 가져옴
- **RSC**: 데이터 페칭이 필요한 경우 서버 컴포넌트(Server Component)를 기본으로 함

# State & Data
- **State**: 클라이언트 상태는 필요한 경우에만 `useState`, `useEffect` 사용 ("use client" 지시어 명시)
- **Fetching**: `lib/notion.ts`의 중앙화된 함수를 통해 데이터 호출
- **Caching**: Next.js의 `revalidate` 옵션을 활용하여 캐시 관리 (기본 60초 등)
- **Error Handling**: `try-catch` 블록을 사용하고, 사용자 친화적인 에러 메시지 또는 `error.tsx` 활용

# DO / DON'T
**DO:**
- 새로운 컴포넌트 생성 시 `@/components`에 위치시키고 PascalCase 적용
- Notion API 호출 시 `lib/notion.ts`에 로직 추가
- 환경변수 사용 시 `process.env.NOTION_API_KEY` 등 명확히 참조

**DON'T:**
- API 키나 데이터베이스 ID를 코드에 하드코딩 금지
- 상대 경로(`../../`) 사용 지양 (절대 경로 `@/*` 선호)
- 복잡한 로직을 페이지(`page.tsx`)에 직접 작성하는 것 지양 (유틸이나 서버 액션으로 분리)

# Known Build Error Patterns (절대 반복하지 말 것)

## [ERROR-001] Next.js 비동기 API 동기 호출
- 원인: Next.js 15+에서 cookies(), headers(), params, searchParams 등이 async로 변경됨
- 증상: `Property 'X' does not exist on type 'Promise<...>'`

DON'T:
  const cookieStore = cookies()
  cookieStore.set('token', value)

DO:
  const cookieStore = await cookies()
  cookieStore.set('token', value)

적용 대상: cookies() / headers() / params / searchParams
→ 이 함수들을 사용하는 모든 Server Component/Route Handler는 반드시 async 함수여야 함

## [ERROR-002] 컴포넌트 Required Props 누락
- 원인: Props 인터페이스에 required로 정의된 값을 호출부에서 전달하지 않음
- 증상: `Type '{}' is not assignable to type 'IntrinsicAttributes & PostCardProps'`

DON'T:
  // cover가 required인데 생략
  <PostCard title={post.title} slug={post.slug} />

DO:
  // 1) 호출부에서 항상 전달하거나
  <PostCard title={post.title} slug={post.slug} cover={post.cover} />
  // 2) Props를 optional로 정의하고 컴포넌트 내부에서 fallback 처리
  cover?: string  // 인터페이스에서 optional로 선언
  <img src={cover ?? '/images/default-cover.png'} />

규칙:
  - 컴포넌트 생성 시 optional vs required를 명시적으로 결정할 것
  - 이미지/미디어 관련 Props는 기본적으로 optional + fallback 처리를 권장
  - 새 페이지에서 기존 컴포넌트를 재사용할 때 Props 인터페이스를 반드시 확인할 것


# Blog-Specific Rules
- **Markdown**: Notion 블록을 `NotionRenderer.tsx`를 통해 HTML로 변환
- **Metadata**: Notion 데이터베이스의 속성(Status, Slug, Category, Date 등)을 기반으로 포스트 관리
- **SEO**: `app/layout.tsx` 또는 각 `page.tsx`에서 Metadata API 활용
- **Security**: 비밀번호가 설정된 포스트는 `PasswordGate.tsx` 및 서버 액션을 통해 보호

# PRD: Next.js + Notion 개인 블로그

## 📋 프로젝트 개요

### 목적
비개발자도 쉽게 콘텐츠를 관리할 수 있는 개인 블로그를 구축합니다. Notion을 CMS로 활용하여 글 작성/관리를 단순화하고, Vercel을 통해 자동 배포 파이프라인을 구축합니다.

### 목표 사용자
- 개인 블로그를 운영하려는 개발자
- Notion으로 콘텐츠를 관리하고 싶은 사람
- 포트폴리오 확장 가능성이 필요한 사람

---

## 🎯 핵심 요구사항

### 1. 기능 요구사항

#### 1.1 콘텐츠 관리 (Notion CMS)
- Notion Database에서 모든 글 작성/수정/삭제
- Public/Private 상태 관리
- 카테고리 및 태그 분류 시스템

#### 1.2 페이지 구성
| 페이지 | URL | 설명 |
|--------|-----|------|
| 메인 | `/` | 최근 글 5개 표시 |
| 전체 글 목록 | `/posts` | Public 글 전체 목록 (최신순) |
| 카테고리별 목록 | `/category/[name]` | 특정 카테고리 글 필터링 |
| 글 상세 | `/posts/[slug]` | 개별 글 전체 내용 |

#### 1.3 콘텐츠 필터링
- Private 글은 절대 노출 안 됨
- Public 글만 API로 조회
- 카테고리별 필터링 지원

#### 1.4 SEO 기본 요구사항
- 페이지별 메타데이터 (title, description)
- Open Graph 태그
- Sitemap 자동 생성
- Robots.txt

### 2. 비기능 요구사항

#### 2.1 성능
- 초기 로딩 시간 < 3초
- 이미지 최적화 (Next.js Image)
- Server-Side Rendering 활용

#### 2.2 반응형 디자인
- 모바일 우선 (Mobile-First)
- 태블릿/데스크톱 대응
- Tailwind CSS 활용

#### 2.3 확장성
- 포트폴리오 페이지 추가 가능한 구조
- 댓글 시스템 추가 가능
- 검색 기능 추가 가능

---

## 🏗️ 기술 스택

### Frontend
- **Next.js 14 (App Router)**: React 기반 풀스택 프레임워크
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크

### CMS & API
- **Notion API**: Headless CMS
- **@notionhq/client**: Notion 공식 SDK
- **react-notion-x** (옵션): Notion 블록 렌더링

### Deployment
- **Vercel**: 호스팅 및 CI/CD
- **GitHub**: 버전 관리

---

## 📊 Notion Database 스키마

### 필드 정의

| 필드명 | 타입 | 필수 | 설명 | 예시 |
|--------|------|------|------|------|
| Title | 제목 | ✅ | 글 제목 | "Next.js 시작하기" |
| Slug | 텍스트 | ✅ | URL용 고유 식별자 | "nextjs-intro" |
| Status | 선택 | ✅ | 공개 상태 | Public / Private |
| Category | 다중 선택 | ❌ | 카테고리 | "개발", "일상" |
| Tags | 다중 선택 | ❌ | 태그 | "React", "Tutorial" |
| Date | 날짜 | ✅ | 작성일 | 2025-02-08 |
| Description | 텍스트 | ❌ | SEO 요약 | "Next.js 기초..." |
| Content | 페이지 본문 | ✅ | 실제 글 내용 | (Notion 블록들) |

### 데이터 규칙
- **Slug**: 영문 소문자, 숫자, 하이픈만 허용 (`^[a-z0-9-]+$`)
- **Slug**: Database 내 중복 불가
- **Status**: "Public" 또는 "Private"만 허용
- **Date**: 미래 날짜 허용 (예약 발행 가능)

---

## 📁 프로젝트 구조

```
my-blog/
├── app/
│   ├── layout.tsx                  # 전역 레이아웃
│   ├── page.tsx                    # 메인 페이지
│   ├── globals.css                 # 전역 스타일
│   ├── posts/
│   │   ├── page.tsx                # 전체 글 목록
│   │   └── [slug]/
│   │       └── page.tsx            # 글 상세 페이지
│   ├── category/
│   │   └── [name]/
│   │       └── page.tsx            # 카테고리별 목록
│   └── api/
│       └── revalidate/route.ts     # Webhook용 재검증 API
├── lib/
│   ├── notion.ts                   # Notion API 함수
│   ├── types.ts                    # TypeScript 타입
│   └── utils.ts                    # 유틸리티 함수
├── components/
│   ├── PostCard.tsx                # 글 카드
│   ├── Header.tsx                  # 헤더
│   ├── Footer.tsx                  # 푸터
│   ├── CategoryFilter.tsx          # 카테고리 필터
│   └── NotionRenderer.tsx          # Notion 콘텐츠 렌더러
├── public/
│   ├── images/
│   └── favicon.ico
├── .env.local                      # 환경 변수 (Git 제외)
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🔧 핵심 구현 사양

### 1. Notion API 연동 (`lib/notion.ts`)

```typescript
// 주요 함수 목록
- getPosts(): Promise<Post[]>           // Public 글 전체 조회
- getPostBySlug(slug): Promise<Post>    // Slug로 단일 글 조회
- getCategories(): Promise<string[]>    // 카테고리 목록
- getPostsByCategory(category): Promise<Post[]>  // 카테고리별 조회
```

### 2. 페이지별 사양

#### 메인 페이지 (`app/page.tsx`)
- 최근 Public 글 5개 표시
- PostCard 컴포넌트로 렌더링
- "전체 보기" 링크

#### 전체 글 목록 (`app/posts/page.tsx`)
- Public 글 전체 (최신순 정렬)
- 카테고리 필터 UI
- 무한 스크롤 또는 페이지네이션 (옵션)

#### 글 상세 페이지 (`app/posts/[slug]/page.tsx`)
- Notion 콘텐츠 렌더링
- SEO 메타데이터 자동 생성
- 이전/다음 글 네비게이션 (옵션)

### 3. 컴포넌트 사양

#### PostCard
```typescript
interface PostCardProps {
  title: string;
  description: string;
  date: string;
  category: string[];
  slug: string;
}
```

#### Header
- 로고/사이트명
- 네비게이션 (홈, 전체 글, 카테고리)
- 반응형 모바일 메뉴

---

## 🚀 배포 프로세스

### 환경 변수
```env
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
```

### GitHub → Vercel 자동 배포
1. GitHub Repository 생성
2. Vercel 프로젝트 연결
3. 환경 변수 설정
4. `main` 브랜치 푸시 시 자동 배포

### Notion Webhook (선택사항)
- Notion에서 글 수정 시 Vercel 재배포 트리거
- `/api/revalidate` 엔드포인트 구현

---

## 📈 성능 최적화 전략

1. **정적 생성 (Static Generation)**
   - 빌드 타임에 모든 Public 글 미리 렌더링
   - ISR(Incremental Static Regeneration) 활용

2. **이미지 최적화**
   - Next.js Image 컴포넌트 사용
   - Notion 이미지 프록시 처리

3. **캐싱 전략**
   - Notion API 응답 캐싱 (60초)
   - Vercel Edge Network 활용

---

## ✅ 완료 기준 (Definition of Done)

- [x] Notion Database 설정 완료
- [x] 모든 페이지 정상 작동
- [x] Public/Private 필터링 검증
- [x] 반응형 디자인 확인 (모바일/태블릿/데스크톱)
- [x] SEO 메타데이터 적용
- [ ] Vercel 배포 성공 (사용자 진행)
- [x] 환경 변수 설정 완료
- [x] README.md 작성

> 상세 현황·남은 작업 정리는 **PROJECT_STATUS.md** 참고.

---

## 🔮 향후 확장 계획

### Phase 2
- [ ] 포트폴리오 페이지 추가
- [ ] 검색 기능 (Algolia 또는 Notion API)
- [ ] 다크 모드

### Phase 3
- [ ] 댓글 시스템 (Giscus)
- [ ] 조회수 트래킹
- [ ] RSS 피드

---

## 📚 참고 문서

- [Next.js Documentation](https://nextjs.org/docs)
- [Notion API Reference](https://developers.notion.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**문서 버전**: 1.0  
**작성일**: 2025-02-08  
**담당자**: Senior Frontend Developer

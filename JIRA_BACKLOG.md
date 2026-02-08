# JIRA Backlog 구성안

이 문서는 **Notion 블로그 프로젝트**를 JIRA로 관리하기 위한 백로그 구성안입니다.
현재 완료된 작업과 앞으로 해야 할 작업을 Epic(큰 단위)과 Story(작은 단위)로 나누어 정리했습니다.

---

## 📌 JIRA 계층 구조 제안

- **Project**: Notion Blog (Key: `NB`)
- **Issue Types**:
  - **Epic**: 큰 기능 단위 (예: 초기 세팅, 페이지 구현, 기능 확장)
  - **Story**: 사용자가 경험하는 구체적인 기능 (예: 글 목록 보기, 카테고리 필터링)
  - **Task**: 기술적인 작업 (예: 라이브러리 설치, 환경변수 설정)

---

## ✅ 완료된 작업 (Done)
*이미 구현되어 배포까지 완료된 항목들입니다. JIRA에 입력 후 바로 'Done' 처리하시면 됩니다.*

### 🚀 Epic 1: 프로젝트 초기 설정 및 배포 (NB-E1)
| 이슈 키 | 타입 | 제목 | 상태 |
|---|---|---|---|
| NB-1 | Task | Next.js 14 + TypeScript + Tailwind CSS 프로젝트 초기화 | Done |
| NB-2 | Task | 폰트 설정 (Noto Sans KR, JetBrains Mono) | Done |
| NB-3 | Task | 환경변수 설정 (.env.local) 및 Notion API 키 발급 | Done |
| NB-4 | Task | Github 레포지토리 생성 및 연동 | Done |
| NB-5 | Task | Vercel 프로젝트 생성 및 배포 파이프라인 구축 | Done |

### 📚 Epic 2: Notion CMS 연동 (NB-E2)
| 이슈 키 | 타입 | 제목 | 상태 |
|---|---|---|---|
| NB-6 | Story | Notion 데이터베이스 스키마 설계 및 생성 | Done |
| NB-7 | Task | Notion API 연동 모듈 구현 (`lib/notion.ts`) | Done |
| NB-8 | Story | 'Public' 상태인 글 목록만 조회하는 API 구현 | Done |
| NB-9 | Story | Notion 블록을 HTML로 변환하는 렌더러 컴포넌트 구현 | Done |

### 🎨 Epic 3: UI/UX 및 페이지 구현 (NB-E3)
| 이슈 키 | 타입 | 제목 | 상태 |
|---|---|---|---|
| NB-10 | Story | 공통 레이아웃 (Header, Footer) 구현 및 반응형 적용 | Done |
| NB-11 | Story | 메인 페이지 (`/`) 구현: 최신 글 5개 노출 | Done |
| NB-12 | Story | 전체 글 목록 페이지 (`/posts`) 및 카테고리 필터 구현 | Done |
| NB-13 | Story | 글 상세 페이지 (`/posts/[slug]`) 구현 | Done |
| NB-14 | Story | SEO 메타태그 및 Sitemap, Robots.txt 설정 | Done |

---

## 🏃 앞으로 해야 할 작업 (Backlog / To Do)
*앞으로 진행할 작업들입니다. 우선순위에 따라 Sprint에 배정하여 진행하세요.*

### ✨ Epic 4: 기능 확장 및 개선 (Phase 2) (NB-E4)
| 이슈 키 | 타입 | 제목 | 우선순위 | 설명 |
|---|---|---|---|---|
| NB-15 | Story | **포트폴리오 페이지 구현** | High | `/portfolio` 경로에 정적 프로필 페이지 제작 |
| NB-16 | Story | **다크 모드 지원** | Medium | `next-themes` 사용하여 라이트/다크 모드 토글 기능 추가 |
| NB-17 | Story | **검색 기능 구현** | Medium | 글 제목 및 요약 내용으로 검색 기능 추가 |
| NB-18 | Task | **디자인 커스터마이징** | Low | 개인 취향에 맞는 컬러셋 및 폰트 스타일 조정 |

### 💬 Epic 5: 커뮤니티 및 분석 (Phase 3) (NB-E5)
| 이슈 키 | 타입 | 제목 | 우선순위 | 설명 |
|---|---|---|---|---|
| NB-19 | Story | **댓글 시스템 도입 (Giscus)** | High | Github Discussions 기반의 댓글 기능 연동 |
| NB-20 | Story | **방문자 분석 (Analytics)** | Low | Vercel Analytics 또는 GA4 연동 |
| NB-21 | Story | **RSS 피드 발행** | Low | 블로그 구독을 위한 RSS.xml 생성 기능 |

### 🛠 Epic 6: 유지보수 및 최적화 (NB-E6)
| 이슈 키 | 타입 | 제목 | 우선순위 | 설명 |
|---|---|---|---|---|
| NB-22 | Task | **Notion Webhook 연동** | Medium | Notion 글 수정 시 자동으로 배포(ISR) 갱신되도록 설정 |
| NB-23 | Task | **npm audit 보안 취약점 해결** | Low | 의존성 패키지 버전 업데이트 및 보안 점검 |
| NB-24 | Task | **Notion 이미지 만료 문제 해결** | High | `next/image` 최적화 적용 또는 프록시 API 구현하여 이미지 엑박 방지 |
| NB-25 | Task | **Callout 블록 렌더링 개선** | Medium | 현재 `...`으로 나오는 Callout 내용을 제대로 표시하도록 수정 |
| NB-26 | Task | **에러 및 로딩 페이지 구현** | Medium | `not-found.tsx`, `error.tsx`, `loading.tsx` 추가하여 사용자 경험 개선 |
| NB-27 | Task | **파비콘 (Favicon) 추가** | Medium | 브라우저 탭에 표시될 아이콘 파일(`favicon.ico`) 추가 |
| NB-28 | Story | **Open Graph 이미지 동적 생성** | Low | SNS 공유 시 보일 썸네일 자동 생성 (`opengraph-image.tsx`) |

---

## 💡 JIRA 활용 팁 (초보자용)
1. **백로그 만들기**: 위 목록을 보면서 JIRA > 'Create' 버튼을 눌러 이슈를 생성하세요.
2. **스프린트 시작**: 1~2주 단위로 '이번 주에 할 일'을 골라 스프린트를 시작하세요. (예: 이번 주는 '포트폴리오 페이지' 만들기!)
3. **상태 변경**: 일을 시작하면 `In Progress`, 완료하면 `Done`으로 옮기는 재미를 느껴보세요.

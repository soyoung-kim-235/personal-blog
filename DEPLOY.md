# Vercel 배포 가이드

GitHub 저장소가 연결되어 있다면, 아래 순서대로 진행하면 됩니다.

---

## 1. Vercel 로그인

1. [https://vercel.com](https://vercel.com) 접속
2. **Sign Up** 또는 **Log In** → **Continue with GitHub** 선택
3. GitHub 권한 허용

---

## 2. 프로젝트 Import

1. Vercel 대시보드에서 **Add New...** → **Project**
2. **Import Git Repository**에서 연결해 둔 GitHub 저장소 선택
3. **Import** 클릭

---

## 3. 환경 변수 설정

**Configure Project** 화면에서 **Environment Variables** 섹션으로 이동 후 아래 추가:

| Name | Value | 비고 |
|------|--------|------|
| `NOTION_API_KEY` | (Notion 연동 Secret) | 필수. [Notion 연동](https://www.notion.so/my-integrations)에서 복사 |
| `NOTION_DATABASE_ID` | `3016e63cef5e80ea912fd9cf391bf333` | 필수 |

**선택** (나중에 추가해도 됨):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | 배포 후 나오는 URL (예: `https://블로그이름.vercel.app`) — sitemap/OG용 |
| `REVALIDATE_SECRET` | 아무 비밀 문자열 (재검증 API 보안용) |

---

## 4. 배포 실행

1. **Deploy** 버튼 클릭
2. 빌드가 끝나면 **Visit** 로 배포된 사이트 확인

---

## 5. 배포 후 (선택)

- **사이트 URL 변경**: Project → **Settings** → **Domains**에서 커스텀 도메인 연결 가능
- **재검증**: Notion 글 수정 후 캐시 갱신이 필요하면  
  `POST https://블로그주소.vercel.app/api/revalidate`  
  body: `{ "secret": "REVALIDATE_SECRET에 넣은 값" }`

---

## 로컬에서 배포 전 확인

배포 전에 로컬에서 빌드가 되는지 확인하려면:

```bash
npm run build
```

에러 없이 완료되면 Vercel에서도 동일하게 빌드됩니다.

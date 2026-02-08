# 지금 할 일 (localhost:3000 보려면)

## 1. 패키지 설치

터미널을 열고 프로젝트 폴더로 이동한 뒤:

```bash
cd /Users/yongk/Downloads/blog
npm install
```

## 2. 환경 변수 파일 만들기

프로젝트 폴더에 **`.env.local`** 파일을 새로 만들고 아래 내용 넣기 (값만 본인 걸로 바꾸기):

```
NOTION_API_KEY=여기에_Notion_연동_시크릿_붙여넣기
NOTION_DATABASE_ID=3016e63cef5e80ea912fd9cf391bf333
```

- **NOTION_API_KEY**: [Notion → 설정 → 연동](https://www.notion.so/my-integrations) 에서 만든 연동의 **Secret** 복사해서 붙여넣기

## 3. 개발 서버 실행

같은 터미널에서:

```bash
npm run dev
```

`Ready in ...` 같은 메시지가 나오면 성공.

## 4. 브라우저에서 열기

브라우저 주소창에 **http://localhost:3000** 입력 후 접속.

---

정리: **`npm install` → `.env.local` 만들고 키 넣기 → `npm run dev` → http://localhost:3000**

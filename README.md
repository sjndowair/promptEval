# 🤖 프롬프트 평가 서비스

AI를 활용한 프롬프트 품질 평가 및 개선 서비스입니다.

## ✨ 주요 기능

### 🎯 토큰 기반 사용량 관리
- 매일 10개 토큰 자동 충전 (00:00 리셋)
- 평가당 5토큰 소모
- 종합 평가 시 3개 함수 동시 실행 (5토큰 사용)
- 실시간 토큰 상태 표시

### 🔐 사용자 인증
- Firebase Authentication을 통한 안전한 로그인/회원가입
- Zustand를 활용한 효율적인 상태 관리
- 한국어 에러 메시지 지원

### 🤖 AI 프롬프트 평가
- **종합 평가**: 명확성, 관련성, 창의성, 정확성 등 다면적 평가
- **품질 평가**: 프롬프트의 구체성과 효과성 분석
- **안전성 검사**: 부적절한 콘텐츠 및 잠재적 위험 요소 탐지
- **성능 평가**: AI 모델과의 호환성 및 응답 품질 예측

### 💡 스마트 개선 제안
- AI 기반 프롬프트 개선 방안 자동 생성
- 목표 기반 맞춤형 최적화 제안
- 실제 사용 사례에 맞춘 구체적인 가이드라인

### 📊 상세한 분석 리포트
- 시각적 점수 표시 및 진단 결과
- 카테고리별 세부 평가 및 피드백
- 개선 전후 비교 분석

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel
- **State Management**: Zustand, TanStack Query
- **Authentication**: Firebase Auth
- **AI Service**: Google Gemini AI
- **Package Manager**: pnpm

## 📦 설치 및 실행

### 1. 저장소 클론
\`\`\`bash
git clone <repository-url>
cd prompt-evaluator
\`\`\`

### 2. 의존성 설치
\`\`\`bash
pnpm install
\`\`\`

### 3. 환경 변수 설정
\`.env.local\` 파일을 생성하고 다음 내용을 추가하세요:

\`\`\`bash
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Google Gemini AI API 키
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
\`\`\`

### 4. API 키 설정 방법

#### Firebase 설정
1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Authentication > Sign-in method에서 이메일/비밀번호 활성화
3. 프로젝트 설정에서 웹 앱 구성 정보 복사

#### Google Gemini AI API 키
1. [Google AI Studio](https://aistudio.google.com/app/apikey) 방문
2. "Create API Key" 버튼 클릭
3. 생성된 API 키를 환경 변수에 추가

### 5. 개발 서버 실행
\`\`\`bash
pnpm dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 🎯 사용 방법

### 1. 회원가입/로그인
- 헤더의 로그인 버튼을 클릭하여 계정을 생성하거나 로그인하세요
- Firebase Authentication을 통한 안전한 인증 시스템

### 2. 프롬프트 평가
1. **평가 페이지** 이동 (네비게이션에서 "평가" 클릭)
2. 평가할 **프롬프트 입력**
3. **평가 유형 선택** (종합, 품질, 안전성, 성능)
4. 목표 설정 (선택사항)
5. **"평가하기"** 버튼 클릭

### 3. 개선 제안 받기
- 평가 결과를 확인한 후 **"개선 제안"** 버튼 클릭
- AI가 생성한 개선된 프롬프트와 구체적인 개선 방안 확인

### 4. 안전성 검사
- **"안전성 검사"** 버튼으로 잠재적 위험 요소 확인
- 부적절한 콘텐츠나 편향성 여부 분석

## 📁 프로젝트 구조

\`\`\`
prompt-evaluator/
├── app/                    # Next.js App Router
│   ├── evaluate/          # AI 평가 페이지
│   ├── api/               # API 라우트
│   └── layout.tsx         # 전역 레이아웃
├── components/            # React 컴포넌트
│   ├── ui/               # UI 컴포넌트 (shadcn/ui)
│   ├── auth-provider.tsx # 인증 프로바이더
│   └── header.tsx        # 헤더 컴포넌트
├── lib/                  # 유틸리티 및 서비스
│   ├── ai-service.ts     # AI 서비스 로직
│   ├── ai-queries.ts     # AI 관련 TanStack Query
│   ├── auth-service.ts   # Firebase 인증 서비스
│   ├── auth-queries.ts   # 인증 관련 TanStack Query
│   └── store.ts          # Zustand 상태 관리
└── styles/               # 스타일 파일
\`\`\`

## 🔧 주요 라이브러리

- **@google/generative-ai**: Google Gemini AI 연동
- **firebase**: 사용자 인증 및 데이터베이스
- **@tanstack/react-query**: 서버 상태 관리
- **zustand**: 클라이언트 상태 관리
- **framer-motion**: 애니메이션
- **lucide-react**: 아이콘

## 🤝 기여 방법

1. 이 저장소를 포크하세요
2. 새로운 기능 브랜치를 생성하세요 (\`git checkout -b feature/amazing-feature\`)
3. 변경사항을 커밋하세요 (\`git commit -m 'Add some amazing feature'\`)
4. 브랜치에 푸시하세요 (\`git push origin feature/amazing-feature\`)
5. Pull Request를 생성하세요

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 \`LICENSE\` 파일을 참조하세요.

## 🙋‍♂️ 문의 및 지원

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

**🎯 비전**: AI 시대에 모든 사용자가 더 나은 프롬프트를 작성할 수 있도록 돕는 것이 저희의 목표입니다.

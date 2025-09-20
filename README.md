# 출석체크 앱 (Attendance App)

간단한 웹 기반 출석체크 시스템입니다. 120명 정도의 인원이 참여하는 모임에서 사용할 수 있습니다.

## 🎯 프로젝트 요구사항

### 기본 정보
- **대상 인원**: 약 120명
- **플랫폼**: 주로 모바일 환경
- **배포**: Vercel
- **보안**: 로그인 없는 간단한 시스템

### 📋 프로세스 흐름

1. **사전 준비**
   - 관리자가 미리 120명의 이름을 데이터베이스에 등록

2. **출석 체크**
   - 사용자들이 Vercel 배포 링크를 클릭하여 웹페이지 진입
   - 페이지 진입 시 모달 또는 입력창이 바로 표시
   - 자신의 이름을 입력하여 출석 처리

3. **결석 처리**
   - 2분 후 출석하지 않은 인원은 자동으로 결석 처리
   - 결석 인원 목록 페이지에서 확인 가능

4. **결석 사유 입력**
   - 결석한 사람의 친구들이 결석 사유를 대신 입력 가능
   - 결석 사유를 한눈에 확인할 수 있는 인터페이스 제공

5. **주차별 관리**
   - 매주 새로운 출석 세션 생성
   - 예: "9월 20일 출석 명단", "9월 27일 출석 명단"
   - 과거 출석 기록 조회 가능

## 🗄️ 데이터베이스 스키마

### Members 테이블
```sql
- id: 고유 식별자
- name: 멤버 이름
- created_at: 생성 일시
```

### AttendanceSessions 테이블
```sql
- id: 고유 식별자
- date: 출석 날짜 (YYYY-MM-DD)
- title: 세션 제목 (예: "9월 20일 출석")
- created_at: 생성 일시
```

### Attendances 테이블
```sql
- id: 고유 식별자
- session_id: 출석 세션 ID (FK)
- member_id: 멤버 ID (FK)
- status: 출석 상태 ('present', 'absent')
- absence_reason: 결석 사유 (선택사항)
- checked_at: 출석 체크 시간
```

## 🎨 화면 구성

### 1. 메인 출석 페이지 (`/`)
- 모바일 최적화된 반응형 디자인
- 페이지 진입 시 이름 입력 모달 자동 표시
- 간단한 이름 입력 폼
- 출석 완료 후 확인 메시지

### 2. 결석자 목록 페이지 (`/absent`)
- 현재 세션의 결석자 목록 표시
- 각 결석자별 사유 입력/수정 기능
- 모바일 친화적인 카드 형태 레이아웃

### 3. 관리 페이지 (`/admin`)
- 주차별 출석 현황 조회
- 새로운 출석 세션 생성
- 전체 출석률 통계

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase
- **Deployment**: Vercel
- **Mobile-First**: 반응형 디자인

## 🚀 개발 및 배포

### 1. 의존성 설치
```bash
npm install
```

### 2. Supabase 데이터베이스 설정

#### 2-1. Supabase SQL Editor에서 스키마 실행
1. [Supabase Dashboard](https://app.supabase.com) 접속
2. 프로젝트 선택
3. 왼쪽 메뉴에서 **SQL Editor** 클릭
4. **New query** 버튼 클릭
5. `supabase-schema.sql` 파일의 내용을 복사하여 붙여넣기
6. **Run** 버튼 클릭하여 실행

#### 2-2. 또는 Supabase CLI 사용 (선택사항)
```bash
# Supabase CLI 설치
npm install -g supabase

# 프로젝트 초기화
supabase init

# 스키마 적용
supabase db reset
```

### 3. 환경 변수 설정
`.env.local` 파일이 이미 설정되어 있습니다:
```
NEXT_PUBLIC_SUPABASE_URL=https://lwqkxjjpsqcorknngwko.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```

### 5. 빌드 및 배포
```bash
# 빌드
npm run build

# 프로덕션 실행
npm start
```

## 🚀 Vercel 배포 가이드

### 1. GitHub 저장소 생성 및 푸시
```bash
git add .
git commit -m "Initial attendance app setup"
git branch -M main
git remote add origin https://github.com/your-username/attendance-app.git
git push -u origin main
```

### 2. Vercel 배포 단계
1. **Vercel 계정 생성**: [vercel.com](https://vercel.com) 방문
2. **GitHub 연결**: "Import Git Repository" 선택
3. **저장소 선택**: 방금 생성한 저장소 선택
4. **환경 변수 설정**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://lwqkxjjpsqcorknngwko.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_uYyr1kIZuRbpt3PlewAAJQ_Os1Y9shr
   ```
5. **Deploy 버튼 클릭**

### 3. 환경 변수 설정 방법
- Vercel Dashboard → 프로젝트 선택 → Settings → Environment Variables
- 또는 배포 시 바로 추가 가능

### 4. 자동 배포 설정
- GitHub에 push할 때마다 자동으로 Vercel에 배포됨
- `main` 브랜치는 프로덕션 환경에 배포
- 다른 브랜치는 프리뷰 환경에 배포

### 5. Supabase 연동 확인
- ✅ **데이터베이스 변경사항은 즉시 반영됨**
- Supabase에서 데이터 수정 → Vercel 앱에서 바로 확인 가능
- 별도 재배포 불필요 (데이터는 실시간 연결)

## 📱 모바일 최적화

- Touch-friendly 인터페이스
- 큰 터치 영역
- 모바일 키보드 최적화
- 빠른 로딩 시간
- 간단하고 직관적인 UX

## 🎯 핵심 기능

- [x] 간단한 이름 입력으로 출석 체크
- [x] 2분 후 자동 결석 처리
- [x] 결석 사유 입력 기능
- [x] 주차별 출석 관리
- [x] 모바일 최적화된 UI/UX
- [x] 보안 없는 간단한 시스템
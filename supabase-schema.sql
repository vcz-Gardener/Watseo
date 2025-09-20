-- Members 테이블: 120명의 사용자 정보
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AttendanceSessions 테이블: 주차별 출석 세션
CREATE TABLE attendance_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  title VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendances 테이블: 출석 기록
CREATE TABLE attendances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES attendance_sessions(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent')),
  absence_reason TEXT,
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, member_id)
);

-- 인덱스 생성
CREATE INDEX idx_attendances_session_id ON attendances(session_id);
CREATE INDEX idx_attendances_member_id ON attendances(member_id);
CREATE INDEX idx_attendances_status ON attendances(status);

-- RLS (Row Level Security) 비활성화 (간단한 시스템이므로)
ALTER TABLE members DISABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE attendances DISABLE ROW LEVEL SECURITY;

-- 샘플 데이터 (테스트용)
INSERT INTO members (name) VALUES
('김철수'), ('이영희'), ('박민수'), ('정수진'), ('한지민');

-- 오늘 날짜로 출석 세션 생성
INSERT INTO attendance_sessions (date, title) VALUES
(CURRENT_DATE, CURRENT_DATE || ' 출석');
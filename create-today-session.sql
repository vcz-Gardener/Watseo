-- 오늘 날짜의 출석 세션 생성
INSERT INTO attendance_sessions (date, title) VALUES
(CURRENT_DATE, CURRENT_DATE || ' 출석')
ON CONFLICT DO NOTHING;
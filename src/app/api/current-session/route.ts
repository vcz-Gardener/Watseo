import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getKoreanDate } from '@/lib/utils'

export async function GET() {
  try {
    // 한국시간 기준 오늘 날짜
    const today = getKoreanDate()

    // 오늘 날짜의 출석 세션 찾기
    const { data: session, error: sessionError } = await supabase
      .from('attendance_sessions')
      .select('id, title, date')
      .eq('date', today)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({
        exists: false,
        message: '오늘의 출석 세션이 없습니다.'
      })
    }

    return NextResponse.json({
      exists: true,
      session: session
    })

  } catch (error) {
    console.error('현재 세션 조회 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
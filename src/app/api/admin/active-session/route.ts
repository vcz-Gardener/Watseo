import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// 활성 세션 조회
export async function GET() {
  try {
    const { data: activeSession, error } = await supabase
      .from('attendance_sessions')
      .select('*')
      .eq('is_active', true)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116: no rows returned
      return NextResponse.json({ error: '활성 세션 조회 오류' }, { status: 500 })
    }

    return NextResponse.json({
      activeSession: activeSession || null
    })

  } catch (error) {
    console.error('활성 세션 조회 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

// 활성 세션 설정
export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: '세션 ID가 필요합니다.' }, { status: 400 })
    }

    // PostgreSQL 함수를 사용하여 단일 활성 세션 설정
    const { error } = await supabase.rpc('set_single_active_session', {
      session_id: sessionId
    })

    if (error) {
      console.error('활성 세션 설정 오류:', error)
      return NextResponse.json({ error: '활성 세션 설정 실패' }, { status: 500 })
    }

    // 업데이트된 활성 세션 정보 반환
    const { data: activeSession } = await supabase
      .from('attendance_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    return NextResponse.json({
      message: '활성 세션이 설정되었습니다.',
      activeSession
    })

  } catch (error) {
    console.error('활성 세션 설정 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
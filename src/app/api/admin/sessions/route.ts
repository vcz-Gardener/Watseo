import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // 모든 출석 세션 조회
    const { data: sessions, error: sessionsError } = await supabase
      .from('attendance_sessions')
      .select('*')
      .order('date', { ascending: false })

    if (sessionsError) {
      return NextResponse.json({ error: '세션 목록 조회 오류' }, { status: 500 })
    }

    // 각 세션별 출석 통계 계산
    const sessionsWithStats = await Promise.all(
      (sessions || []).map(async (session) => {
        // 전체 멤버 수
        const { count: totalMembers } = await supabase
          .from('members')
          .select('*', { count: 'exact', head: true })

        // 출석한 멤버 수
        const { count: presentCount } = await supabase
          .from('attendances')
          .select('*', { count: 'exact', head: true })
          .eq('session_id', session.id)
          .eq('status', 'present')

        // 결석한 멤버 수
        const { count: absentCount } = await supabase
          .from('attendances')
          .select('*', { count: 'exact', head: true })
          .eq('session_id', session.id)
          .eq('status', 'absent')

        // 아직 체크하지 않은 멤버들은 결석으로 간주
        const uncheckedCount = (totalMembers || 0) - (presentCount || 0) - (absentCount || 0)

        return {
          ...session,
          present_count: presentCount || 0,
          absent_count: (absentCount || 0) + uncheckedCount,
          total_count: totalMembers || 0
        }
      })
    )

    return NextResponse.json({ sessions: sessionsWithStats })

  } catch (error) {
    console.error('세션 목록 조회 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json()

    if (!title) {
      return NextResponse.json({ error: '세션 제목이 필요합니다.' }, { status: 400 })
    }

    // 오늘 날짜로 새 세션 생성
    const today = new Date().toISOString().split('T')[0]
    const { data: newSession, error: createError } = await supabase
      .from('attendance_sessions')
      .insert({
        date: today,
        title: title.trim()
      })
      .select()
      .single()

    if (createError) {
      console.error('Supabase 세션 생성 오류:', createError)
      return NextResponse.json({
        error: '세션 생성 오류',
        details: createError.message
      }, { status: 500 })
    }

    return NextResponse.json({
      message: '새 출석 세션이 생성되었습니다.',
      session: newSession
    })

  } catch (error) {
    console.error('세션 생성 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
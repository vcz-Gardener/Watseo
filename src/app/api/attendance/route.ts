import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json({ error: '이름이 필요합니다.' }, { status: 400 })
    }

    // 활성 출석 세션 찾기
    const { data: session, error: sessionError } = await supabase
      .from('attendance_sessions')
      .select('id, title')
      .eq('is_active', true)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({
        error: '활성화된 출석 세션이 없습니다. 관리자가 먼저 세션을 활성화해야 합니다.'
      }, { status: 404 })
    }

    // 멤버 찾기
    const { data: member, error: memberError } = await supabase
      .from('members')
      .select('id, name')
      .eq('name', name)
      .single()

    if (memberError || !member) {
      return NextResponse.json({ error: '등록되지 않은 이름입니다.' }, { status: 404 })
    }

    // 이미 출석했는지 확인
    const { data: existingAttendance } = await supabase
      .from('attendances')
      .select('id')
      .eq('session_id', session.id)
      .eq('member_id', member.id)
      .single()

    if (existingAttendance) {
      return NextResponse.json({ error: '이미 출석 처리되었습니다.' }, { status: 400 })
    }

    // 출석 기록 생성
    const { error: attendanceError } = await supabase
      .from('attendances')
      .insert({
        session_id: session.id,
        member_id: member.id,
        status: 'present',
        checked_at: new Date().toISOString()
      })

    if (attendanceError) {
      return NextResponse.json({ error: '출석 처리 중 오류가 발생했습니다.' }, { status: 500 })
    }

    return NextResponse.json({ message: '출석이 완료되었습니다!', member: member.name })

  } catch (error) {
    console.error('출석 처리 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
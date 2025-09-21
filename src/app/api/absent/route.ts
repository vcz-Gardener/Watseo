import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // 활성 출석 세션 찾기
    const { data: session, error: sessionError } = await supabase
      .from('attendance_sessions')
      .select('id')
      .eq('is_active', true)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ error: '활성화된 출석 세션을 찾을 수 없습니다.' }, { status: 404 })
    }

    // 모든 멤버 조회
    const { data: allMembers, error: membersError } = await supabase
      .from('members')
      .select('id, name')

    if (membersError) {
      return NextResponse.json({ error: '멤버 목록 조회 오류' }, { status: 500 })
    }

    // 모든 출석 기록 조회 (출석자와 결석자 모두)
    const { data: allAttendances, error: attendanceError } = await supabase
      .from('attendances')
      .select('member_id, status, absence_reason')
      .eq('session_id', session.id)

    if (attendanceError) {
      return NextResponse.json({ error: '출석 기록 조회 오류' }, { status: 500 })
    }

    // 출석한 멤버 ID 목록 (status가 'present'인 사람들)
    const presentMemberIds = new Set(
      allAttendances?.filter(a => a.status === 'present').map(a => a.member_id) || []
    )

    // 결석한 멤버들 필터링 (출석하지 않은 모든 사람)
    const absentMembers = allMembers?.filter(member => !presentMemberIds.has(member.id)) || []

    // 결석 사유가 있는 경우 추가 (status가 'absent'인 기록에서 사유 가져오기)
    const absentMembersWithReasons = absentMembers.map(member => {
      const attendanceRecord = allAttendances?.find(a => a.member_id === member.id)
      return {
        ...member,
        absence_reason: attendanceRecord?.absence_reason || null
      }
    })

    return NextResponse.json({ absentMembers: absentMembersWithReasons })

  } catch (error) {
    console.error('결석자 목록 조회 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { memberId, reason } = await request.json()

    if (!memberId) {
      return NextResponse.json({ error: '멤버 ID가 필요합니다.' }, { status: 400 })
    }

    // 활성 출석 세션 찾기
    const { data: session, error: sessionError } = await supabase
      .from('attendance_sessions')
      .select('id')
      .eq('is_active', true)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ error: '활성화된 출석 세션을 찾을 수 없습니다.' }, { status: 404 })
    }

    // 기존 출석 기록이 있는지 확인
    const { data: existingAttendance } = await supabase
      .from('attendances')
      .select('id')
      .eq('session_id', session.id)
      .eq('member_id', memberId)
      .single()

    if (existingAttendance) {
      // 기존 기록 업데이트
      const { error: updateError } = await supabase
        .from('attendances')
        .update({ absence_reason: reason })
        .eq('id', existingAttendance.id)

      if (updateError) {
        return NextResponse.json({ error: '결석 사유 업데이트 오류' }, { status: 500 })
      }
    } else {
      // 새로운 결석 기록 생성
      const { error: insertError } = await supabase
        .from('attendances')
        .insert({
          session_id: session.id,
          member_id: memberId,
          status: 'absent',
          absence_reason: reason,
          checked_at: new Date().toISOString()
        })

      if (insertError) {
        return NextResponse.json({ error: '결석 기록 생성 오류' }, { status: 500 })
      }
    }

    return NextResponse.json({ message: '결석 사유가 저장되었습니다.' })

  } catch (error) {
    console.error('결석 사유 저장 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
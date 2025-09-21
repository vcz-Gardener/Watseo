'use client'

import { useState, useEffect } from 'react'

interface AttendanceSession {
  id: string
  date: string
  title: string
  is_active: boolean
  present_count: number
  absent_count: number
  total_count: number
}

export default function AdminPage() {
  const [sessions, setSessions] = useState<AttendanceSession[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [newSessionTitle, setNewSessionTitle] = useState('')
  const [activeSession, setActiveSession] = useState<AttendanceSession | null>(null)

  useEffect(() => {
    fetchSessions()
    fetchActiveSession()
  }, [])

  const fetchActiveSession = async () => {
    try {
      const response = await fetch('/api/admin/active-session')
      const data = await response.json()
      setActiveSession(data.activeSession)
    } catch (error) {
      console.error('활성 세션 조회 오류:', error)
    }
  }

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/admin/sessions')
      if (response.ok) {
        const data = await response.json()
        setSessions(data.sessions)
      }
    } catch (error) {
      console.error('세션 목록 조회 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createNewSession = async () => {
    if (!newSessionTitle.trim()) return

    setIsCreating(true)
    try {
      const response = await fetch('/api/admin/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newSessionTitle.trim()
        }),
      })

      if (response.ok) {
        setNewSessionTitle('')
        fetchSessions()
      }
    } catch (error) {
      console.error('세션 생성 오류:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const setActiveSessionHandler = async (sessionId: string) => {
    try {
      const response = await fetch('/api/admin/active-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setActiveSession(data.activeSession)
        fetchSessions() // 세션 목록 새로고침
      }
    } catch (error) {
      console.error('활성 세션 설정 오류:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    })
  }

  const getAttendanceRate = (present: number, total: number) => {
    if (total === 0) return 0
    return Math.round((present / total) * 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">관리자 페이지</h1>

          <div className="flex justify-between items-center mb-6">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← 메인 페이지로 돌아가기
            </a>
          </div>

          {/* 현재 활성 세션 표시 */}
          <div className="border-t pt-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">현재 활성 세션</h2>
            {activeSession ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">{activeSession.title}</p>
                    <p className="text-sm text-green-600">{formatDate(activeSession.date)}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    활성
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">활성화된 출석 세션이 없습니다.</p>
                <p className="text-sm text-yellow-600">아래에서 세션을 생성하고 활성화하세요.</p>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">새 출석 세션 생성</h2>
            <div className="flex space-x-3">
              <input
                type="text"
                value={newSessionTitle}
                onChange={(e) => setNewSessionTitle(e.target.value)}
                placeholder="예: 9월 27일 출석"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isCreating}
              />
              <button
                onClick={createNewSession}
                disabled={!newSessionTitle.trim() || isCreating}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isCreating ? '생성 중...' : '생성'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">출석 세션 현황</h2>

          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">아직 생성된 출석 세션이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className={`border rounded-lg p-4 ${
                  session.is_active ? 'border-green-400 bg-green-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {session.title}
                      </h3>
                      {session.is_active && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          활성
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">
                        {formatDate(session.date)}
                      </span>
                      {!session.is_active && (
                        <button
                          onClick={() => setActiveSessionHandler(session.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                          활성화
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {session.present_count}
                      </div>
                      <div className="text-sm text-green-800">출석</div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {session.absent_count}
                      </div>
                      <div className="text-sm text-red-800">결석</div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {session.total_count}
                      </div>
                      <div className="text-sm text-blue-800">총 인원</div>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {getAttendanceRate(session.present_count, session.total_count)}%
                      </div>
                      <div className="text-sm text-purple-800">출석률</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${getAttendanceRate(session.present_count, session.total_count)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
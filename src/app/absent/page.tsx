'use client'

import { useState, useEffect } from 'react'

interface AbsentMember {
  id: string
  name: string
  absence_reason?: string
}

export default function AbsentPage() {
  const [absentMembers, setAbsentMembers] = useState<AbsentMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingReason, setEditingReason] = useState('')

  useEffect(() => {
    fetchAbsentMembers()
  }, [])

  const fetchAbsentMembers = async () => {
    try {
      const response = await fetch('/api/absent')
      if (response.ok) {
        const data = await response.json()
        setAbsentMembers(data.absentMembers)
      }
    } catch (error) {
      console.error('결석자 목록 조회 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditReason = (member: AbsentMember) => {
    setEditingId(member.id)
    setEditingReason(member.absence_reason || '')
  }

  const handleSaveReason = async (memberId: string) => {
    try {
      const response = await fetch('/api/absent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId,
          reason: editingReason.trim()
        }),
      })

      if (response.ok) {
        setAbsentMembers(prev =>
          prev.map(member =>
            member.id === memberId
              ? { ...member, absence_reason: editingReason.trim() }
              : member
          )
        )
        setEditingId(null)
        setEditingReason('')
      }
    } catch (error) {
      console.error('결석 사유 저장 오류:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingReason('')
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
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">결석자 명단</h1>
          <p className="text-gray-600 mb-4">
            총 {absentMembers.length}명이 결석했습니다.
          </p>

          <div className="flex justify-center">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← 출석 페이지로 돌아가기
            </a>
          </div>
        </div>

        {absentMembers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-green-600 text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              모든 분들이 출석했습니다!
            </h2>
            <p className="text-gray-600">결석자가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {absentMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    결석
                  </span>
                </div>

                {editingId === member.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={editingReason}
                      onChange={(e) => setEditingReason(e.target.value)}
                      placeholder="결석 사유를 입력하세요..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveReason(member.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-600">결석 사유:</span>
                      <p className="mt-1 text-gray-800 min-h-[1.5rem]">
                        {member.absence_reason || '사유가 입력되지 않았습니다.'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditReason(member)}
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                    >
                      {member.absence_reason ? '사유 수정' : '사유 입력'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
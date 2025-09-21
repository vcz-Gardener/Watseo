'use client'

import { useState, useEffect } from 'react'
import AttendanceModal from '@/components/AttendanceModal'
import PasswordModal from '@/components/PasswordModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [currentSession, setCurrentSession] = useState<string | null>(null)
  const [sessionExists, setSessionExists] = useState(true)

  useEffect(() => {
    fetchCurrentSession()
  }, [])

  const fetchCurrentSession = async () => {
    try {
      const response = await fetch('/api/current-session')
      const data = await response.json()

      if (data.exists) {
        setCurrentSession(data.session.title)
        setSessionExists(true)
        setIsModalOpen(true)
      } else {
        setCurrentSession(null)
        setSessionExists(false)
        setMessage('활성화된 출석 세션이 없습니다. 관리자가 세션을 활성화해야 합니다.')
        setIsSuccess(false)
      }
    } catch (error) {
      console.error('세션 조회 오류:', error)
      setMessage('세션 정보를 불러올 수 없습니다.')
      setIsSuccess(false)
    }
  }

  const handleAttendance = async (name: string) => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`${data.member}님의 출석이 완료되었습니다!`)
        setIsSuccess(true)
        setIsModalOpen(false)
      } else {
        setMessage(data.error || '오류가 발생했습니다.')
        setIsSuccess(false)
      }
    } catch (error) {
      setMessage('네트워크 오류가 발생했습니다.')
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleReopenModal = () => {
    setIsModalOpen(true)
    setMessage('')
  }

  const handlePasswordSuccess = () => {
    setIsPasswordModalOpen(false)
    window.location.href = '/admin'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">출석체크</h1>
          {currentSession && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-blue-800 font-medium">{currentSession}</p>
            </div>
          )}
          <p className="text-gray-600 mb-6">
            {sessionExists ? '출석을 체크해주세요' : '활성화된 출석 세션이 없습니다'}
          </p>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              isSuccess
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          {!isModalOpen && sessionExists && (
            <button
              onClick={handleReopenModal}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              출석 체크하기
            </button>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-center space-x-4 text-sm">
              <a
                href="/absent"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                결석자 목록 보기
              </a>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                관리자 페이지
              </button>
            </div>
          </div>
        </div>
      </div>

      {sessionExists && (
        <AttendanceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAttendance}
          isLoading={isLoading}
        />
      )}

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
      />
    </div>
  )
}
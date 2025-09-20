// 한국 시간 유틸리티 함수
export function getKoreanDate(): string {
  const now = new Date()
  const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)) // UTC + 9시간
  return koreanTime.toISOString().split('T')[0]
}

export function formatKoreanDate(dateString: string): string {
  const date = new Date(dateString)
  const koreanDate = new Date(date.getTime() + (9 * 60 * 60 * 1000))

  return koreanDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  })
}
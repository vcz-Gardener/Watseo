// src/screens/SignUpFunnel/styles/Step.styles.ts
export const stepStyles = {
  // 배경 그라데이션 + 전체 패딩
  container:
    'flex-1 items-center justify-center bg-gradient-to-br from-white to-gray-100 p-8',

  // 카드 형태로 감싸기
  card: 'w-full max-w-md bg-white rounded-3xl shadow-xl p-6',

  // 큰 제목
  title: 'text-3xl font-bold text-indigo-600 mb-8 text-center',

  // 입력창: 라이트 그레이 배경 + 섀도우
  input:
    'w-full border border-gray-200 rounded-lg px-5 py-3 bg-gray-50 mb-6 shadow-sm',

  // 버튼 베이스
  button: 'w-full py-3 rounded-lg shadow-lg',
  enabled: 'bg-indigo-600',
  disabled: 'bg-gray-300',

  // 버튼 텍스트
  btnText: 'text-center text-white text-lg font-semibold',
};

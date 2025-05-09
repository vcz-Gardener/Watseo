module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Expo 기본 프리셋 + NativeWind JSX 처리기 지정
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      // NativeWind 바벨 트랜스폼을 프리셋으로 등록
      'nativewind/babel',
    ],
    // plugins 는 모두 presets 로 옮겼습니다
  };
};

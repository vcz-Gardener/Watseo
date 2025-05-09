const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, {
  input: './global.css', // CSS 파일을 번들에 포함시키려면 지정
});

import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/color';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primaryBlue,
    borderRadius: 8,
    paddingBottom: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
  },
  logoImage: {
    height: 140,
    marginBottom: 40,
    resizeMode: 'contain',
    width: 140, // 이미지를 비율 유지하면서 줄이기
  },
  logoText: {
    color: COLORS.darkBlue,
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
});

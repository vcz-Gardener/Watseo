import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingBottom: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
    color: '#2563eb',
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
});

import React from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ImagePaths } from '../constants/imagePaths';
import { styles } from '../styles/landingScreen.styles';
import { LandingScreenNavigationProps } from '@navigation/types';

export default function LandingScreen({
  navigation,
}: LandingScreenNavigationProps) {
  return (
    <View style={styles.container}>
      <Image source={ImagePaths.logo} style={styles.logoImage} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUpFunnel')}
      >
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

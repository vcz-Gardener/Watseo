import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { StepProps } from '@screens/SignUpFunnel/types';
import { stepStyles as cs } from '@screens/SignUpFunnel/styles/Step.styles';

export default function ChurchStep({ onNext }: StepProps<'church'>) {
  const [church, setChurch] = useState('');
  const isValid = church.trim().length > 0;

  const handleNext = () => {
    if (!isValid) {
      Alert.alert('입력 오류', '교회를 입력해주세요.');
      return;
    }
    onNext({ church: church.trim() });
  };

  return (
    <View className={cs.container}>
      <View className={cs.card}>
        <Text className={cs.title}>🔥 교회 입력</Text>

        <TextInput
          placeholder="예) 사랑의교회"
          value={church}
          onChangeText={setChurch}
          className={cs.input}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          className={`${cs.button} ${isValid ? cs.enabled : cs.disabled}`}
          disabled={!isValid}
        >
          <Text className={cs.btnText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

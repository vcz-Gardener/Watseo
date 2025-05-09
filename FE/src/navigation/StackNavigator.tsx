import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@navigation/types';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '@screens/LoginScreen';
import SignUpFunnel from '@screens/SignUpFunnel/steps';
import TabNavigator from '@navigation/TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUpFunnel" component={SignUpFunnel} />
    </Stack.Navigator>
  );
}

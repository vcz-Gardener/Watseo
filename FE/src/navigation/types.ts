import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  SignUpFunnel: undefined;
  Tab: NavigatorScreenParams<TabParamList>;
};

export type TabParamList = {
  sanding: undefined;
};

export type LandingScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Landing'
>;

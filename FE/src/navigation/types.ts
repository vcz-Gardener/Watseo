import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type LandingScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Landing'
>;

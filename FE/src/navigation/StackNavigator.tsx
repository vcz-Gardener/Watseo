import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <StackNavigator screenOptions={{ headerShown: false }}></StackNavigator>
  );
}

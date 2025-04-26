import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

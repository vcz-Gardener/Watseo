import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabNavigatorOptions } from '../styles/tabNavigator.options';
import { Ionicons } from '@expo/vector-icons';
import { TabParamList } from '@navigation/types';
import LandingScreen from '@screens/LandingScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={tabNavigatorOptions}>
      <Tab.Screen
        name="sanding"
        component={LandingScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabNavigatorOptions } from '../styles/tabNavigator.options';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={tabNavigatorOptions}>
      <Tab.Screen
        name={'Home'}
        //Components 추가
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        //Components 추가
        options={{
          tabBarLabel: '프로필',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

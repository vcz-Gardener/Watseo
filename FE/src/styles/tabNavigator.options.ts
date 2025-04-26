import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export const tabNavigatorOptions: BottomTabNavigationOptions = {
  tabBarStyle: {
    backgroundColor: 'white',
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb', // gray-200},
  },
  tabBarLabelStyle: {
    fontSize: 12,
    marginBottom: 8,
  },
  tabBarActiveTintColor: '#2563eb', // blue-600
  tabBarInactiveTintColor: '#9ca3af', // gray-400
};

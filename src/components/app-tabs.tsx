import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';
import HomeIcon from './icons/HomeIcon';
import SettingsIcon from './icons/SettingsIcon';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 100,
          paddingBottom: 5,
          paddingTop:5,
          backgroundColor: colors.backgroundElement,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon
              size={16}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => (
            <SettingsIcon
              size={16}
            />
          ),
        }}
      />
    </Tabs>
  );
}
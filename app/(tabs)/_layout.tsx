import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { height: screenHeight } = Dimensions.get('window');

  const tabBarHeight = screenHeight * 0.08;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [
          { position: 'absolute' },
           { height: tabBarHeight },
         ],
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Search for Ricky and Morty Characters',
          tabBarIcon: () => null,
          tabBarLabelStyle: {
            fontSize: 16,
            marginTop: -15,
          }          
        }}
      />
    </Tabs>
  );
}

// app/_layout.js
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FavoritesProvider } from '../components/context/FavoritesContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function RootNavigator() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="recipe/[id]" options={{headerShown: false, animation: 'slide_from_right'}} />
        <Stack.Screen name="recipe/[id]/cook" options={{headerShown: false, animation: 'slide_from_right'}} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <FavoritesProvider>
          <RootNavigator />
        </FavoritesProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
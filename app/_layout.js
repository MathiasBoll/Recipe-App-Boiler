// app/_layout.js
import { Stack } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FavoritesProvider } from '../components/context/FavoritesContext';
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <FavoritesProvider>
        <Stack>
        
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="recipe/[id]" options={{headerShown: false, animation: 'slide_from_right'}} />
      
          
          <Stack.Screen name="+not-found" />
        </Stack>
    </FavoritesProvider>
    </GestureHandlerRootView>
  );
}
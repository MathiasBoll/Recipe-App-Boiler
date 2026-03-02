// app/_layout.js
import { Stack } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
<<<<<<< HEAD
import { FavoritesProvider } from '../components/context/FavoritesContext';
=======
import { FavoritesProvider } from '../context/FavoritesContext';
>>>>>>> 801b16471eca3b330dfce1b3b97d4c46743aef18
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
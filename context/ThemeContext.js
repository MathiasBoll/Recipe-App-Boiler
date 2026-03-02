import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext(null);
const STORAGE_KEY = '@recipe_theme_mode';

const lightTheme = {
  mode: 'light',
  background: '#F9F8F4',
  surface: '#FFFFFF',
  text: '#222222',
  textMuted: '#666666',
  border: '#EBE9E0',
  tabInactive: '#999999',
  accent: '#35794A',
  accentText: '#FFFFFF',
  danger: '#E25D5D',
  icon: '#222222',
};

const darkTheme = {
  mode: 'dark',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#F5F5F5',
  textMuted: '#B0B0B0',
  border: '#2D2D2D',
  tabInactive: '#8A8A8A',
  accent: '#5BAA70',
  accentText: '#FFFFFF',
  danger: '#E25D5D',
  icon: '#F5F5F5',
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedMode === 'light' || savedMode === 'dark') {
          setMode(savedMode);
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const nextMode = mode === 'light' ? 'dark' : 'light';
    setMode(nextMode);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, nextMode);
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  const value = useMemo(() => {
    const isDark = mode === 'dark';

    return {
      mode,
      isDark,
      theme: isDark ? darkTheme : lightTheme,
      toggleTheme,
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}

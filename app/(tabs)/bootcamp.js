import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, Alert, Vibration, Switch, Linking, Platform } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Accelerometer } from 'expo-sensors';
import ScreenHeader from '../../components/ui/ScreenHeader';
import { useTheme } from '../../context/ThemeContext';

const QUOTES = [
  'Yes, absolutely.',
  'Not now.',
  'Try again later.',
  'It is very likely.',
  'Focus and ask again.',
  'The signs point to yes.',
  'No, but keep cooking.',
];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function BootcampScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [avatarUri, setAvatarUri] = useState(null);
  const [coords, setCoords] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [quote, setQuote] = useState('❓');
  const [timerMessage, setTimerMessage] = useState('No active oven timer.');

  const lastShakeAt = useRef(0);

  useEffect(() => {
    const notificationSub = Notifications.addNotificationReceivedListener(() => {
      Vibration.vibrate(300);
    });

    const accelSub = Accelerometer.addListener((data) => {
      const force = Math.sqrt((data.x * data.x) + (data.y * data.y) + (data.z * data.z));
      const now = Date.now();

      if (force > 1.75 && now - lastShakeAt.current > 1200) {
        lastShakeAt.current = now;
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
      }
    });

    Accelerometer.setUpdateInterval(250);

    return () => {
      notificationSub.remove();
      accelSub.remove();
    };
  }, []);

  const pickFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow photo library access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow camera access.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const getMyLocation = async () => {
    setLocationError('');

    const permission = await Location.requestForegroundPermissionsAsync();

    if (!permission.granted) {
      setLocationError('Location permission denied.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    setCoords({
      latitude,
      longitude,
    });

    const label = encodeURIComponent('I am here');
    const nativeMapUrl = Platform.select({
      ios: `http://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
      default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    });

    const webMapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    if (nativeMapUrl && (await Linking.canOpenURL(nativeMapUrl))) {
      await Linking.openURL(nativeMapUrl);
      return;
    }

    await Linking.openURL(webMapUrl);
  };

  const startOvenTimer = async () => {
    const permission = await Notifications.requestPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow notifications first.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'BING!',
        body: 'Kagen er færdig!',
        sound: 'default',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      },
    });

    setTimerMessage('Timer started: you will get a notification in 5 seconds.');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}> 
      <ScreenHeader title="Bootcamp Tasks" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}> 
          <Text style={[styles.title, { color: theme.text }]}>1) Profile avatar</Text>
          <Pressable onPress={pickFromLibrary}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatar} contentFit="cover" />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder, { borderColor: theme.border }]}> 
                <Text style={[styles.avatarPlaceholderText, { color: theme.textMuted }]}>Tap to pick photo</Text>
              </View>
            )}
          </Pressable>
          <View style={styles.row}>
            <Pressable style={[styles.button, { backgroundColor: theme.accent }]} onPress={pickFromLibrary}>
              <Text style={[styles.buttonText, { color: theme.accentText }]}>Open gallery</Text>
            </Pressable>
            <Pressable style={[styles.button, { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1 }]} onPress={takePhoto}>
              <Text style={[styles.buttonText, { color: theme.text }]}>Open camera</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}> 
          <Text style={[styles.title, { color: theme.text }]}>2) Where am I?</Text>
          <Pressable style={[styles.button, { backgroundColor: theme.accent }]} onPress={getMyLocation}>
            <Text style={[styles.buttonText, { color: theme.accentText }]}>Where am I?</Text>
          </Pressable>
          {coords && (
            <Text style={[styles.bodyText, { color: theme.textMuted }]}>Lat: {coords.latitude.toFixed(6)} | Lng: {coords.longitude.toFixed(6)}</Text>
          )}
          {!!locationError && <Text style={[styles.bodyText, { color: theme.danger }]}>{locationError}</Text>}
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}> 
          <Text style={[styles.title, { color: theme.text }]}>3) Oven timer (5 sec)</Text>
          <Pressable style={[styles.button, { backgroundColor: theme.accent }]} onPress={startOvenTimer}>
            <Text style={[styles.buttonText, { color: theme.accentText }]}>Put cake in oven</Text>
          </Pressable>
          <Text style={[styles.bodyText, { color: theme.textMuted }]}>{timerMessage}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}> 
          <Text style={[styles.title, { color: theme.text }]}>4) Shake quote</Text>
          <Text style={[styles.magicText, { color: theme.text }]}>{quote}</Text>
          <Text style={[styles.bodyText, { color: theme.textMuted }]}>Shake your phone to get a random answer.</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}> 
          <View style={styles.themeRow}>
            <Text style={[styles.title, { color: theme.text }]}>5) Dark mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              thumbColor={isDark ? theme.accent : '#FFFFFF'}
              trackColor={{ false: '#CFCFCF', true: '#2D5B39' }}
            />
          </View>
          <Text style={[styles.bodyText, { color: theme.textMuted }]}>Toggle app theme for the whole Recipe App.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 14,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 130,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  avatarPlaceholder: {
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 12,
    textAlign: 'center',
  },
  magicText: {
    fontSize: 22,
    fontWeight: '700',
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

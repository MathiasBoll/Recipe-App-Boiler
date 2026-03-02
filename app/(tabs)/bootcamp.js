import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, Alert, Vibration, Switch, Linking, Platform, TextInput } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Accelerometer } from 'expo-sensors';
import ScreenHeader from '../../components/ui/ScreenHeader';
import { useTheme } from '../../context/ThemeContext';

const QUOTES = [
  'Funny: Pasta is just spaghetti waiting for confidence.',
  'Funny: If garlic says 1 clove, your heart says 4.',
  'Funny: Stirring dramatically does not count as cardio.',
  'Info: Salt added early helps vegetables release water faster.',
  'Info: Resting cooked meat keeps more juices inside.',
  'Info: A pinch of acid (lemon/vinegar) can brighten dull flavors.',
  'Info: Medium heat usually gives better browning than high heat.',
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
  const [ovenHours, setOvenHours] = useState('0');
  const [ovenMinutes, setOvenMinutes] = useState('0');
  const [ovenSeconds, setOvenSeconds] = useState('5');

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

  const clearPhoto = () => {
    setAvatarUri(null);
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
    const parsedHours = Number.parseInt(ovenHours || '0', 10);
    const parsedMinutes = Number.parseInt(ovenMinutes || '0', 10);
    const parsedSeconds = Number.parseInt(ovenSeconds || '0', 10);

    const safeHours = Number.isFinite(parsedHours) ? Math.max(0, parsedHours) : 0;
    const safeMinutes = Number.isFinite(parsedMinutes) ? Math.min(59, Math.max(0, parsedMinutes)) : 0;
    const safeSeconds = Number.isFinite(parsedSeconds) ? Math.min(59, Math.max(0, parsedSeconds)) : 0;

    const totalSeconds = (safeHours * 3600) + (safeMinutes * 60) + safeSeconds;

    if (totalSeconds <= 0) {
      Alert.alert('Set timer', 'Please enter at least 1 second.');
      return;
    }

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
        seconds: totalSeconds,
      },
    });

    setTimerMessage(`Timer started: ${String(safeHours).padStart(2, '0')}:${String(safeMinutes).padStart(2, '0')}:${String(safeSeconds).padStart(2, '0')}.`);
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
            <Pressable style={[styles.button, { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1 }]} onPress={clearPhoto}>
              <Text style={[styles.buttonText, { color: theme.text }]}>Remove photo</Text>
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
          <Text style={[styles.title, { color: theme.text }]}>3) Oven timer</Text>
          <View style={styles.timerInputRow}>
            <View style={styles.timerColumn}>
              <Text style={[styles.timerInputLabel, { color: theme.textMuted }]}>Hours</Text>
              <TextInput
                value={ovenHours}
                onChangeText={setOvenHours}
                keyboardType="number-pad"
                maxLength={2}
                style={[styles.timerInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.background }]}
                placeholder="00"
                placeholderTextColor={theme.textMuted}
              />
            </View>

            <Text style={[styles.timerColon, { color: theme.text }]}>:</Text>

            <View style={styles.timerColumn}>
              <Text style={[styles.timerInputLabel, { color: theme.textMuted }]}>Minutes</Text>
              <TextInput
                value={ovenMinutes}
                onChangeText={setOvenMinutes}
                keyboardType="number-pad"
                maxLength={2}
                style={[styles.timerInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.background }]}
                placeholder="00"
                placeholderTextColor={theme.textMuted}
              />
            </View>

            <Text style={[styles.timerColon, { color: theme.text }]}>:</Text>

            <View style={styles.timerColumn}>
              <Text style={[styles.timerInputLabel, { color: theme.textMuted }]}>Seconds</Text>
              <TextInput
                value={ovenSeconds}
                onChangeText={setOvenSeconds}
                keyboardType="number-pad"
                maxLength={2}
                style={[styles.timerInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.background }]}
                placeholder="00"
                placeholderTextColor={theme.textMuted}
              />
            </View>
          </View>
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
    flexWrap: 'wrap',
  },
  timerInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  timerColumn: {
    gap: 6,
    alignItems: 'center',
  },
  timerInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 72,
    alignItems: 'center',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  timerInputLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  timerColon: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 18,
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

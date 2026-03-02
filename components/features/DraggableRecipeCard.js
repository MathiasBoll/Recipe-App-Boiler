import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, useAnimatedStyle, withSpring,
  LinearTransition, FadeIn, FadeOut 
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useFavorites } from '../context/FavoritesContext';
import { Image } from "expo-image";
import { useTheme } from '../../context/ThemeContext';


const SCREEN_HEIGHT = Dimensions.get('window').height


export default function DraggableRecipeCard({ recipe, isDraggingGlobal }) {
const { toggleFavorite } = useFavorites();
const { theme } = useTheme();
const router = useRouter();


const translateX = useSharedValue(0)
const translateY = useSharedValue(0)
const scale = useSharedValue(1)
const zIndex = useSharedValue(1)


const pan = Gesture.Pan()
.activateAfterLongPress(200)
.runOnJS(true)
.onStart(() => {
    isDraggingGlobal.value = withSpring(1);
    zIndex.value = 100;
    scale.value = withSpring(1.1)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
})
.onUpdate((e) => {
    translateX.value = e.translationX;
    translateY.value = e.translationY;


    if (e.absoluteY > SCREEN_HEIGHT - 180) {
        if (isDraggingGlobal.value !== 1.5) {
            isDraggingGlobal.value= withSpring(1.5);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }
    } else {
        isDraggingGlobal.value = withSpring(1)
    }
})
.onEnd((e) => {
    isDraggingGlobal.value = withSpring(0);
    scale.value = withSpring(1);
    zIndex.value = 1;

    if (e.absoluteY > SCREEN_HEIGHT - 180) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        toggleFavorite(recipe)
    } else {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
    }
})


const tap = Gesture.Tap().runOnJS(true).onStart(() => router.push(`/recipe/${recipe.id}`))

const gesture = Gesture.Exclusive(pan, tap)


const animatedStyle = useAnimatedStyle(() => ({
    transform: [
        { translateX : translateX.value },
        { translateY : translateY.value },
        { scale: scale.value }
    ],
    zIndex: zIndex.value
}))


return (
    <Animated.View
    layout={LinearTransition.springify()}
    entering={FadeIn}
    exiting={FadeOut}
    style={[styles.cardContainer, animatedStyle]}
    >
        <GestureDetector gesture={gesture}>
            <View>
                <View style={styles.imageContainer}>
                    <Image
                    source={recipe.image}
                    style={styles.image}
                    contentFit="cover"
                    transition={200}
                    />
                </View>

                <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={2}>{recipe.title}</Text>

                <View style={styles.statsContainer}>
                    <Ionicons name="time-outline" size={14} color={theme.textMuted} />
                    <Text style={[styles.statsText, { color: theme.textMuted }]}>{recipe.time}</Text>
                    <Ionicons name="flame-outline" size={14} color={theme.textMuted} style={{ marginLeft: 8}} />
                    <Text style={[styles.statsText, { color: theme.textMuted }]}>{recipe.calories}</Text>
                </View>
            </View>





        </GestureDetector>





    </Animated.View>
)


}


const styles = StyleSheet.create({
  cardContainer: { width: '48%', marginBottom: 25 },
  imageContainer: { width: '100%', aspectRatio: 1, borderRadius: 20, overflow: 'hidden', marginBottom: 10 },
  image: { width: '100%', height: '100%' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#222', marginBottom: 6 },
  statsContainer: { flexDirection: 'row', alignItems: 'center' },
  statsText: { fontSize: 12, color: '#666', marginLeft: 4 },
});
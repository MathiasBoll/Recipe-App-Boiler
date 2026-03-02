import { View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring, WithSpring } from 'react-native-reanimated'
import { useSafeAreaInsets } from "react-native-safe-area-context";



export default function TrashButton({ isDraggingGlobal }) {
    const insets = useSafeAreaInsets();


    const trashAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {scale: isDraggingGlobal.value === 0 ? 0 : isDraggingGlobal.value},
            { translateY: withSpring(isDraggingGlobal.value === 0 ? 50 : 0)}
        ],
        opacity: isDraggingGlobal.value === 0 ? 0 : 1
    }));



    return (
        <Animated.View style={[styles.container, trashAnimatedStyle, { bottom: insets.bottom + 90}]}>
            <View style={styles.circle}>
                <Ionicons name="trash-outline" size={32} color={"#f9f8f4"} />
            </View>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
 container: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1000,
 },
 circle: {
    width: 64, 
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E25D5D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E25D5D',
    shadowOffset: { width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 10
 }
})
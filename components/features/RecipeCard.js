import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import * as Haptics from 'expo-haptics'
import { useRouter } from "expo-router";
import {useFavorites} from '../context/FavoritesContext'


export default function RecipeCard({recipe}) {
    const { toggleFavorite, isFavorite} = useFavorites();
    const saved = isFavorite(recipe.id)
    const router = useRouter();


    const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .runOnJS(true)
    .onStart(() => {
        toggleFavorite(recipe)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    })



    const singleTap = Gesture.Tap()
    .numberOfTaps(1)
    .runOnJS(true)
    .onStart(() => {
        router.push(`/recipe/${recipe.id}`)
    })

    const taps = Gesture.Exclusive(doubleTap, singleTap)


    const handleHeartPress = () => {
        toggleFavorite(recipe)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }



    return (
        <View style={styles.cardContainer}>
            <GestureDetector gesture={taps}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image
                        source={recipe.image}
                        style={styles.image}
                        contentFit="cover"
                        transition={200}
                        />

                        {recipe.isNew && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>NEW & IMPROVED</Text>
                             </View> 
                        )}
                    </View>
                    
                    <Text style={styles.cardTitle} numberOfLines={2}>{recipe.title}</Text>

                    <View style={styles.statsContainer}>
                        <Ionicons name="time-outline" size={14} color="#666" />
                        <Text style={styles.statsText}>{recipe.time}</Text>

                        <Ionicons name="flame-outline" size={14} color="#666" style={{marginLeft: 8}} />
                        <Text style={styles.statsText}>{recipe.calories}</Text>

                        <Ionicons name="nutrition-outline" size={14} color="#666" style={{marginLeft: 8}} />
                        <Text style={styles.statsText}>{recipe.protein}</Text>
                    </View>
                </View>
            </GestureDetector>

            <Pressable style={({pressed}) => [styles.heartIcon, { opacity: pressed ? 0.5 : 1}]} onPress={handleHeartPress}>
                  <Ionicons
                  name={saved ? "heart" : "heart-outline"}
                  size={24}
                  color={saved ? "#E25D5D" : "#f9f8f4"}
                  />      
            </Pressable>

        </View>
    )




}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginHorizontal: 7.5,
        marginBottom: 25
},
imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
},
image: {
    width: '100%',
    height: '100%'
},
badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#35794A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
},
badgeText: {
    color: '#f9f8f4',
    fontSize: 9,
    fontWeight: 'bold'
},
heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    padding: 4,
    zIndex: 10
},
cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
    lineHeight: 22,
},
statsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
},
statsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
}

})
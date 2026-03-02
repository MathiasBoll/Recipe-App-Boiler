import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RECIPES } from "../../constants/data";
import { useFavorites } from "../../components/context/FavoritesContext";


export default function DetailedRecipeScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();


    const { toggleFavorite, isFavorite } = useFavorites();


    const recipe = RECIPES.find((item) => item.id === id)
    const saved = isFavorite(recipe?.id)


    if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <Text>Opskriften blev ikke fundet</Text>
        <Pressable onPress={() => {router.back()}}>
          <Text>Gå tilbage</Text>
        </Pressable>
      </View>
    )
    }


    return (
        <View style={styles.container}>
            <Image
            source={recipe.image}
            style={styles.headerImage}
            contentFit="cover"
            transition={200}
            />


            <View style={[styles.floatingHeader, { top: insets.top}]}>
                <Pressable style={styles.iconButton} onPress={() => router.back()}>
                     <Ionicons name="arrow-back" size={24} color="#222" />
                </Pressable>

                <Pressable style={styles.iconButton} onPress={() => toggleFavorite(recipe)}>
                          <Ionicons name={saved ? "heart" : "heart-outline"} size={24} color={saved ? "#E25D5D" : "#222"} />
                </Pressable>
            </View>


            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.sheetContainer}
            >
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{recipe.categories[0]}</Text>
                </View>

                <Text style={styles.title}>{recipe.title}</Text>

                <View style={styles.statsWrapper}>
                    <View style={styles.statItem}>
                        <Ionicons name="time-outline" size={20} color="#35794A" />
                        <Text style={styles.statLabel}>{recipe.time}</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Ionicons name="flame-outline" size={20} color="#35794A" />
                        <Text style={styles.statLabel}>{recipe.calories} kcal</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Ionicons name="nutrition-outline" size={20} color="#35794A" />
                        <Text style={styles.statLabel}>{recipe.protein} protein</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.descriptionText}>
                    {recipe.description || "A delicious recipe waiting to be cooked"}
                </Text>

                <Text style={styles.sectionTitle}>Ingredients</Text>
                <View style={styles.ingredientsList}>
                    {recipe.ingredients?.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientRow}> 
                            <View style={styles.bulletPoint} />

                            <Text style={styles.ingredientText}>{ingredient}</Text>
                        
                        </View>
                    ))}
                </View>



            </ScrollView>


            <View style={[styles.bottomBar, {paddingBottom: insets.bottom}]}>
                <Pressable style={({pressed}) => [styles.cookButton, { opacity: pressed? 0.8 : 1}]}>
                    <Text style={styles.cookButtonText}>Start Cooking</Text>
                </Pressable>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F4', 
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 350, 
    resizeMode: 'cover',
  },
  floatingHeader: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f9f8f4',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: '#F9F8F4',
    marginTop: -40, 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    padding: 25,
    paddingBottom: 100, 
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EBE9E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 15,
  },
  badgeText: {
    color: '#35794A',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    lineHeight: 34,
    marginBottom: 20,
  },
  statsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f8f4',
    padding: 15,
    borderRadius: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    marginBottom: 25,
  },
  ingredientsList: {
    gap: 12,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#35794A',
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f9f8f4',
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cookButton: {
    backgroundColor: '#35794A',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  cookButtonText: {
    color: '#f9f8f4',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
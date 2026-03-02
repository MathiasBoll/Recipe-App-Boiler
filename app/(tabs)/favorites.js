import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useFavorites } from '../../components/context/FavoritesContext';
import DraggableRecipeCard from '../../components/features/DraggableRecipeCard';
import TrashButton from '../../components/features/TrashButton';
import EmptyState from '../../components/ui/EmptyState';
import ScreenHeader from '../../components/ui/ScreenHeader';
import { useTheme } from '../../context/ThemeContext';


export default function FavoritesScreen() {
  const { theme } = useTheme();
    const {favorites} = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

    const insets = useSafeAreaInsets()


    const isDraggingGlobal = useSharedValue(0)

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredFavorites = normalizedQuery.length === 0
      ? favorites
      : favorites.filter((recipe) => {
        const title = recipe.title?.toLowerCase() ?? '';
        const description = recipe.description?.toLowerCase() ?? '';
        const categories = recipe.categories?.join(' ').toLowerCase() ?? '';
        const ingredients = recipe.ingredients?.join(' ').toLowerCase() ?? '';

        return (
          title.includes(normalizedQuery) ||
          description.includes(normalizedQuery) ||
          categories.includes(normalizedQuery) ||
          ingredients.includes(normalizedQuery)
        );
      });


    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
          <ScreenHeader
            title="Favorites"
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            searchPlaceholder="Search favorites..."
          />

            {favorites.length === 0 ? (
                <EmptyState
                icon="heart-outline"
                text="You haven't saved any recipes yet."
                subText="Double tap recipes in Explore to save them here."
                />
          ) : filteredFavorites.length === 0 ? (
            <EmptyState
            icon="search-outline"
            text="No favorites match your search."
            subText="Try another keyword."
            />
            ) : (
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, {paddingBottom: insets.bottom + 120}]}
                >
                <View style={styles.grid}>
              {filteredFavorites.map((recipe) => (
                        <DraggableRecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isDraggingGlobal={isDraggingGlobal}
                        />
                    ))}



                    <TrashButton isDraggingGlobal={isDraggingGlobal} />
                </View>





                </ScrollView>
            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F4',
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
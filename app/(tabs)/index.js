import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { RECIPES, CATEGORIES } from '../../constants/data';
import ScreenHeader from '../../components/ui/ScreenHeader';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

import CategoryBar from '../../components/features/CategoryBar';
import RecipeCard from '../../components/features/RecipeCard';

export default function DiscoverScreen() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All Recipes')
  const [searchQuery, setSearchQuery] = useState('')

  const categoryFiltered = activeCategory === 'All Recipes'
    ? RECIPES
    : RECIPES.filter(recipe => recipe.categories?.includes(activeCategory))

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filtered = normalizedQuery.length === 0
    ? categoryFiltered
    : categoryFiltered.filter((recipe) => {
      const title = recipe.title?.toLowerCase() ?? ''
      const description = recipe.description?.toLowerCase() ?? ''
      const categories = recipe.categories?.join(' ').toLowerCase() ?? ''
      const ingredients = recipe.ingredients?.join(' ').toLowerCase() ?? ''

      return (
        title.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        categories.includes(normalizedQuery) ||
        ingredients.includes(normalizedQuery)
      )
    })

  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollToOffset({offset: 0, animated: false})
  }, [activeCategory])


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScreenHeader
      title="Recipes"
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      />
        <CategoryBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        />

        <FlashList
        ref={listRef}
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => <RecipeCard recipe={item} />}
        />

        

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9F8F4' 
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  }
});
import { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RECIPES } from '../../../constants/data';
import { useTheme } from '../../../context/ThemeContext';

function parseMinutes(timeText) {
  const minutes = Number.parseInt(String(timeText).replace(/[^0-9]/g, ''), 10);
  return Number.isFinite(minutes) && minutes > 0 ? minutes : 15;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function buildRecipeSteps(recipe) {
  if (Array.isArray(recipe?.steps) && recipe.steps.length > 0) {
    return recipe.steps;
  }

  const ingredients = recipe?.ingredients ?? [];
  const firstIngredients = ingredients.slice(0, 3).join(', ');
  const remainingCount = Math.max(ingredients.length - 3, 0);

  return [
    `Prep ingredients: ${firstIngredients}${remainingCount > 0 ? ` + ${remainingCount} more` : ''}.`,
    `Cook the main elements for about ${recipe?.time ?? '15m'} and stir occasionally.`,
    'Combine everything and adjust seasoning to taste.',
    'Plate, garnish, and serve while warm.',
  ];
}

export default function CookingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const recipe = RECIPES.find((item) => item.id === id);

  const defaultSeconds = useMemo(() => {
    if (!recipe?.time) return 900;
    return parseMinutes(recipe.time) * 60;
  }, [recipe?.time]);

  const [remainingSeconds, setRemainingSeconds] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const steps = useMemo(() => buildRecipeSteps(recipe), [recipe]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});

  useEffect(() => {
    setRemainingSeconds(defaultSeconds);
    setIsRunning(false);
  }, [defaultSeconds]);

  useEffect(() => {
    setCurrentStepIndex(0);
    setCompletedSteps({});
  }, [recipe?.id]);

  useEffect(() => {
    if (!isRunning) return undefined;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  if (!recipe) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme.text, marginBottom: 12 }}>Recipe not found.</Text>
        <Pressable style={[styles.primaryButton, { backgroundColor: theme.accent }]} onPress={() => router.back()}>
          <Text style={[styles.primaryButtonText, { color: theme.accentText }]}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const ingredients = recipe.ingredients ?? [];
  const doneCount = ingredients.filter((_, index) => checkedIngredients[index]).length;
  const stepDoneCount = steps.filter((_, index) => completedSteps[index]).length;

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleStartPause = () => {
    if (remainingSeconds === 0) return;
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(defaultSeconds);
  };

  const markCurrentStepDone = () => {
    setCompletedSteps((prev) => ({
      ...prev,
      [currentStepIndex]: !prev[currentStepIndex],
    }));
  };

  const goToPreviousStep = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToNextStep = () => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}> 
        <Pressable style={[styles.backButton, { backgroundColor: theme.surface, borderColor: theme.border }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={theme.icon} />
          <Text style={[styles.backButtonText, { color: theme.text }]}>Back</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Cooking Mode</Text>
        <View style={styles.iconButtonPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 110 }]}>
        <Text style={[styles.recipeTitle, { color: theme.text }]}>{recipe.title}</Text>

        <View style={[styles.timerCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.timerLabel, { color: theme.textMuted }]}>Recipe timer</Text>
          <Text style={[styles.timerValue, { color: theme.text }]}>{formatTime(remainingSeconds)}</Text>

          <View style={styles.timerActions}>
            <Pressable style={[styles.primaryButton, { backgroundColor: theme.accent }]} onPress={handleStartPause}>
              <Text style={[styles.primaryButtonText, { color: theme.accentText }]}>{isRunning ? 'Pause' : 'Start'}</Text>
            </Pressable>
            <Pressable style={[styles.secondaryButton, { backgroundColor: theme.surface, borderColor: theme.border }]} onPress={handleReset}>
              <Text style={[styles.secondaryButtonText, { color: theme.text }]}>Reset</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.ingredientsCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Step by step ({stepDoneCount}/{steps.length})</Text>
          <Text style={[styles.stepCounter, { color: theme.textMuted }]}>Step {currentStepIndex + 1} of {steps.length}</Text>

          <View style={[styles.currentStepCard, { borderColor: theme.border, backgroundColor: theme.background }]}> 
            <Text style={[styles.currentStepText, { color: theme.text }]}>{steps[currentStepIndex]}</Text>
          </View>

          <View style={styles.stepActionsRow}>
            <Pressable
              style={[styles.secondaryButton, { backgroundColor: theme.surface, borderColor: theme.border }, currentStepIndex === 0 && styles.disabledButton]}
              onPress={goToPreviousStep}
              disabled={currentStepIndex === 0}
            >
              <Text style={[styles.secondaryButtonText, { color: theme.text }]}>Previous</Text>
            </Pressable>

            <Pressable
              style={[styles.primaryButton, { backgroundColor: theme.accent }]}
              onPress={markCurrentStepDone}
            >
              <Text style={[styles.primaryButtonText, { color: theme.accentText }]}>
                {completedSteps[currentStepIndex] ? 'Undo Step' : 'Mark Done'}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.secondaryButton, { backgroundColor: theme.surface, borderColor: theme.border }, currentStepIndex === steps.length - 1 && styles.disabledButton]}
              onPress={goToNextStep}
              disabled={currentStepIndex === steps.length - 1}
            >
              <Text style={[styles.secondaryButtonText, { color: theme.text }]}>Next</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.ingredientsCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Ingredients checklist ({doneCount}/{ingredients.length})</Text>

          {ingredients.map((ingredient, index) => {
            const checked = !!checkedIngredients[index];
            return (
              <Pressable
                key={`${ingredient}-${index}`}
                style={styles.ingredientRow}
                onPress={() => toggleIngredient(index)}
              >
                <Ionicons
                  name={checked ? 'checkbox' : 'square-outline'}
                  size={22}
                  color={checked ? theme.accent : theme.textMuted}
                />
                <Text
                  style={[
                    styles.ingredientText,
                    {
                      color: checked ? theme.textMuted : theme.text,
                      textDecorationLine: checked ? 'line-through' : 'none',
                    },
                  ]}
                >
                  {ingredient}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPlaceholder: {
    width: 70,
    height: 42,
  },
  backButton: {
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 6,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 20,
    gap: 14,
  },
  recipeTitle: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
    marginTop: 6,
  },
  timerCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  timerLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  timerValue: {
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: 1,
  },
  timerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  ingredientsCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepCounter: {
    fontSize: 13,
    fontWeight: '600',
  },
  currentStepCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  currentStepText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  stepActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
});

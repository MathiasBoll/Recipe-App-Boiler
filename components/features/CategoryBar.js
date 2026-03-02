import { ScrollView, Pressable, Text, StyleSheet, View } from "react-native";
import { useTheme } from '../../context/ThemeContext';



export default function CategoryBar({categories, activeCategory, onSelectCategory}) {
const { theme } = useTheme();

return (
    <View style={styles.wrapper}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}>
                {categories.map((cat) => (
                    <Pressable key={cat} style={[styles.pill, { backgroundColor: theme.border }, activeCategory === cat && [styles.activePill, { backgroundColor: theme.accent }]]} onPress={() => onSelectCategory(cat)}>
                        <Text style={[styles.text, { color: theme.textMuted }, activeCategory === cat && [styles.activeText, { color: theme.accentText }]]}>
                            {cat}
                        </Text>


                    </Pressable>


                ))}



        </ScrollView>

    </View>
)


}


const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20
    },
    container: {
        paddingHorizontal: 20, 
        gap: 10
    },
    pill: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#EBE9E0',
    },
    activePill: {
        backgroundColor: '#35794A'
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666'
    },
    activeText: {
        color: '#fff'
    }
})
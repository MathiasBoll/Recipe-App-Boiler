import { View, Pressable, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext';



export default function CustomTabBar({state, navigation}) {
    const insets = useSafeAreaInsets()
    const { theme } = useTheme();
    const activeColor = theme.accent
    const inactiveColor = theme.tabInactive

    const activeRoute = state.routes[state.index]?.name;


    return (
        <View style={[styles.container, {paddingBottom: insets.bottom + 10, backgroundColor: theme.surface, borderTopColor: theme.border}]}>

            <Pressable
                style={styles.tabButton}
                onPress={() => navigation.navigate('index')}
            > 
                <Ionicons  name={activeRoute === 'index' ? "compass" : "compass-outline"}  size={28} color={activeRoute === 'index' ? activeColor : inactiveColor}/>
                <Text style={[styles.tabText, {color: activeRoute === 'index' ? activeColor : inactiveColor}]}>
                    Explore
                </Text>
            </Pressable>


            <Pressable
                style={styles.tabButton}
                onPress={() => navigation.navigate('favorites')}
            > 
                <Ionicons  name={activeRoute === 'favorites' ? "heart" : "heart-outline"}  size={28} color={activeRoute === 'favorites' ? activeColor : inactiveColor}/>
                <Text style={[styles.tabText, {color: activeRoute === 'favorites' ? activeColor : inactiveColor}]}>
                    Favorites
                </Text>
            </Pressable>

            <Pressable
                style={styles.tabButton}
                onPress={() => navigation.navigate('bootcamp')}
            >
                <Ionicons  name={activeRoute === 'bootcamp' ? "flask" : "flask-outline"}  size={28} color={activeRoute === 'bootcamp' ? activeColor : inactiveColor}/>
                <Text style={[styles.tabText, {color: activeRoute === 'bootcamp' ? activeColor : inactiveColor}]}>
                    Bootcamp
                </Text>
            </Pressable>

        </View>
    )



}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: 'F0F0F0',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2},
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6
    },
    tabText: {
        fontSize: 12,
        fontWeight: '600'
    }



})
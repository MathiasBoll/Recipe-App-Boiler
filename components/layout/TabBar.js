import { View, Pressable, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'



export default function CustomTabBar({state, navigation}) {
    const insets = useSafeAreaInsets()
    const activeColor = '#35794A'
    const inactiveColor = '#999999'


    return (
        <View style={[styles.container, {paddingBottom: insets.bottom + 10}]}>

            <Pressable
                style={styles.tabButton}
                onPress={() => navigation.navigate('index')}
            > 
                <Ionicons  name={state.index === 0 ? "compass" : "compass-outline"}  size={28} color={state.index === 0 ? activeColor : inactiveColor}/>
                <Text style={[styles.tabText, {color: state.index === 0 ? activeColor : inactiveColor}]}>
                    Explore
                </Text>
            </Pressable>


            <Pressable
                style={styles.tabButton}
                onPress={() => navigation.navigate('favorites')}
            > 
                <Ionicons  name={state.index === 1 ? "heart" : "heart-outline"}  size={28} color={state.index === 1 ? activeColor : inactiveColor}/>
                <Text style={[styles.tabText, {color: state.index === 1 ? activeColor : inactiveColor}]}>
                    Favorites
                </Text>
            </Pressable>

        </View>
    )



}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
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
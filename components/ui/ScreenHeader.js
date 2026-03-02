<<<<<<< HEAD
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';


export default function ScreenHeader({ title, searchQuery, onSearchQueryChange, searchPlaceholder = 'Search recipes...' }) {

    const isSearchEnabled = typeof searchQuery === 'string' && typeof onSearchQueryChange === 'function';
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isSearchVisible) {
            inputRef.current?.focus();
        }
    }, [isSearchVisible]);

    const handleSearchToggle = () => {
        if (!isSearchEnabled) return;

        if (isSearchVisible) {
            onSearchQueryChange('');
            setIsSearchVisible(false);
            return;
        }

        setIsSearchVisible(true);
    };


    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    {title}
                </Text>

                <Pressable style={styles.searchButton} onPress={handleSearchToggle}>
                    <Ionicons name={isSearchVisible ? "close" : "search"} size={24} color="#222" />
                </Pressable>
            </View>

            {isSearchEnabled && isSearchVisible && (
                <View style={styles.searchInputWrapper}>
                    <Ionicons name="search" size={18} color="#666" />
                    <TextInput
                        ref={inputRef}
                        value={searchQuery}
                        onChangeText={onSearchQueryChange}
                        placeholder={searchPlaceholder}
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.searchInput}
                    />
                </View>
            )}
        </>
=======
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function ScreenHeader({ title }) {


    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                {title}
            </Text>

            <Pressable style={styles.searchButton}>
                   <Ionicons name="search" size={24} color="#222" />
            </Pressable>


        </View>
>>>>>>> 801b16471eca3b330dfce1b3b97d4c46743aef18
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10, 
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#222'
    },
    searchButton: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EBE9E0'
<<<<<<< HEAD
    },
    searchInputWrapper: {
        marginHorizontal: 20,
        marginBottom: 16,
        paddingHorizontal: 14,
        height: 46,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#EBE9E0',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#222',
=======
>>>>>>> 801b16471eca3b330dfce1b3b97d4c46743aef18
    }


})
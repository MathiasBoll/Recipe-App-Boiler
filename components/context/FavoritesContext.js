import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const FavoritesContext = createContext();

const STORAGE_KEY = '@my_favorites'


export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])


    useEffect(() => {
        loadFavorites()
    }, [])

    useEffect(() => {
        saveFavorites(favorites)
    }, [favorites])

    const saveFavorites = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue)

        } catch (e) {
            console.error("Fejl ved lagring af favoritter", e)
        }
    }

    const loadFavorites = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)

            if (jsonValue != null) {
                setFavorites(JSON.parse(jsonValue))
            }
        } catch (e) {
            console.error("Fejl ved hentning af favoritter", e)
        }
    }

    const toggleFavorite = (recipe) => {
        setFavorites((prev) => {

            const alreadySaved = prev.find((item) => item.id === recipe.id)

            if (alreadySaved) {
                return prev.filter((item) => item.id !== recipe.id)
            }
            
            return [...prev, recipe]
        })
    }

    const isFavorite = (id) => favorites.some((item) => item.id === id)



    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )

}


export const useFavorites = () => useContext(FavoritesContext)
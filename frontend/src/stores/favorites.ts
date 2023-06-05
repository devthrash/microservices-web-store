import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref<string[]>([])

    function addFavorite(productId: string) {
        favorites.value.push(productId)
    }

    function removeFavorite(productId: string) {
        favorites.value.splice(favorites.value.indexOf(productId), 1)
    }

    function setFavorites(productIds: string[]) {
        favorites.value = productIds
    }

    return {
        favorites,
        addFavorite,
        removeFavorite,
        setFavorites
    }
})

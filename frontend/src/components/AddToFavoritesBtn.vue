<script setup lang="ts">
import { computed, ref } from "vue";
import { addToFavorites, removeFavorite } from "@/services/apis/products";
import { useTokenStore } from "@/stores/token";
import { useRoute, useRouter } from "vue-router";
import { useFavoritesStore } from "@/stores/favorites";

interface Props {
    productId: string
}

const favoritesStore = useFavoritesStore()
const tokenStore = useTokenStore()
const router = useRouter()
const route = useRoute()
const props = defineProps<Props>()
const isLoading = ref(false)

const isInFavorites = computed(() => favoritesStore.favorites.indexOf(props.productId) !== -1)

async function handle() {
    if (!tokenStore.token) {
        await router.push({ name: 'login', query: { redirect: route.fullPath } })
    } else {
        isLoading.value = true

        if (isInFavorites.value) {
            await removeFavorite(props.productId)
            favoritesStore.removeFavorite(props.productId)
        } else {
            await addToFavorites(props.productId)
            favoritesStore.addFavorite(props.productId)
        }

        isLoading.value = false
    }
}
</script>

<template>
    <button class="button is-fullwidth" @click="handle" :class="{ 'is-loading': isLoading }">
        <span class="icon is-small">
            <i class="fas fa-bookmark"></i>
        </span>
        <span v-if="isInFavorites">Remove from favorites</span>
        <span v-else>Add to favorites</span>
    </button>
</template>

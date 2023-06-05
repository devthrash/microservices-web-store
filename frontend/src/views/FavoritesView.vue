<script setup lang="ts">

import { onMounted, ref } from "vue";
import { getFavorites, removeFavorite } from "@/services/apis/products";
import type { IFavorite } from "@/interfaces/IFavorite";
import { useFavoritesStore } from "@/stores/favorites";
import { useRouter } from "vue-router";

const router = useRouter()
const favorites = ref<IFavorite[]>([])
const favoritesStore = useFavoritesStore()

onMounted(async () => {
    favorites.value = await getFavorites()
    favoritesStore.setFavorites(favorites.value.map((i) => i.productId))
})

function goToProductPage(id) {
    router.push({
        name: 'product_page',
        params: {
            productId: id
        }
    })
}

async function remove(id) {
    await removeFavorite(id)
    favoritesStore.removeFavorite(id)
    favorites.value.splice(favorites.value.findIndex((i) => i.productId === id), 1)
}
</script>

<template>
    <section class="section">
        <div class="container is-max-desktop">
            <h1 class="title">Favorite products</h1>
            <div class="columns is-multiline">
                <div class="column is-one-third" v-for="favorite in favorites" :key="favorite.productId">
                    <div class="box">
                        <div class="block">
                            <figure class="image is-square is-clickable" @click="goToProductPage(favorite.productId)">
                                <img :src="favorite.image" alt="Product image"/>
                            </figure>
                        </div>

                        <div class="block">
                            <div class="has-text-weight-semibold">
                                {{ favorite.title }}
                            </div>
                            <div class="has-text-weight-light">
                                {{ favorite.price.toFixed(2) }}Lei
                            </div>
                        </div>

                        <div class="block">
                            <button class="button is-fullwidth" @click="remove(favorite.productId)">
                                Remove from favorites
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="message" v-if="!favorites.length">
                <div class="message-body">
                    No favorites
                </div>
            </div>
        </div>
    </section>
</template>

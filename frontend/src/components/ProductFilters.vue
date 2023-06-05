<script setup lang="ts">
import { useSearchFiltersStore } from "@/stores/searchFilters";
import { useRoute, useRouter } from "vue-router";

const router = useRouter()
const route = useRoute()
const store = useSearchFiltersStore()

// function changeMinPrice(e) {
//     router.push({
//         name: 'search_products',
//         params: {
//             ...route.params,
//             page: ''
//         },
//         query: {
//             ...route.query,
//             minPrice: e.target.value
//         }
//     })
// }
</script>

<template>
    <div class="block">
        <h2 class="subtitle">Categories</h2>
        <div class="menu">
            <ul class="menu-list">
                <li v-for="category in store.categories">
                    <router-link :to="{name: 'search_products', params: { ...route.params }, query: { ...route.query, category: category._id === route.query.category ? undefined : category._id, page: undefined }}">
                        {{ category._id }}
                        <span v-show="category._id !== route.query.category" class="is-pulled-right">({{ category.count }})</span>
                        <span v-show="category._id === route.query.category" class="delete is-pulled-right"></span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>

    <div class="block">
        <h2 class="subtitle">Brands</h2>
        <div class="menu">
            <ul class="menu-list">
                <li v-for="brand in store.brands">
                    <router-link :to="{name: 'search_products', params: { ...route.params }, query: { ...route.query, brand: brand._id === route.query.brand ? undefined: brand._id, page: undefined }}">
                        {{ brand._id }}
                        <span v-if="brand._id !== route.query.brand" class="is-pulled-right">({{ brand.count }})</span>
                        <span v-else class="delete is-pulled-right"></span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>

    <div class="block">
        <h2 class="subtitle">Price</h2>
        <div class="menu">
            <ul class="menu-list">
                <li v-for="price in store.prices">
                    <router-link v-if="typeof price._id === 'number'" :to="{name: 'search_products', params: { ...route.params }, query: { ...route.query, minPrice: route.query.minPrice ? undefined : price._id, maxPrice: route.query.maxPrice ? undefined : price.maxPrice, page: undefined }}">
                        {{ price._id }} - {{ price.maxPrice }}
                        <span v-if="!route.query.minPrice" class="is-pulled-right">({{ price.count }})</span>
                        <span v-else class="delete is-pulled-right"></span>
                    </router-link>
                    <router-link v-if="typeof price._id === 'string'" :to="{name: 'search_products', params: { ...route.params }, query: { ...route.query, minPrice: route.query.minPrice ? undefined : 2000, page: undefined }}">
                        {{ price._id }}
                        <span v-if="!route.query.minPrice" class="is-pulled-right">({{ price.count }})</span>
                        <span v-else class="delete is-pulled-right"></span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

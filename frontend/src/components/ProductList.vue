<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { ref, watch } from "vue";
import type { IProduct } from "@/interfaces/IProduct";
import { getProducts, getProductsInCategory, searchProducts } from "@/services/apis/products";
import { usePaginator } from "@/composable/usePaginator";
import Paginator from "@/components/Paginator.vue";
import { useSearchFiltersStore } from "@/stores/searchFilters";
import { useProductFilters } from "@/composable/useProductFilters";

interface Props {
    search?: string,
    category?: string
}

const props = defineProps<Props>()
const { page, getPreviousPage, getNextPage } = usePaginator()
const products = ref<IProduct[]>([])
const total = ref<number>(0)
const perPage = 40
const { category, brand, minPrice, maxPrice, specs } = useProductFilters()

watch(() => page.value, () => fetchProducts())
watch(() => props.category, () => fetchProducts())
watch(() => props.search, () => fetchProducts())
watch([category, brand, minPrice, maxPrice, specs], () => fetchProducts())

async function fetchProducts() {
    let response

    if (props.category) {
        response = await getProductsInCategory(props.category, page.value, perPage)
    } else if (props.search) {
        response = await searchProducts(props.search, page.value, perPage, {
            category: category.value,
            brand: brand.value,
            minPrice: minPrice.value,
            maxPrice: maxPrice.value,
            ...specs.value
        })

        const store = useSearchFiltersStore()
        store.setFilters(response.categories, response.brands, /**response.minPrice, response.maxPrice,*/ response.prices, response.specs)
    } else {
        response = await getProducts(page.value, perPage)
    }

    products.value = response.products
    total.value = response.total
}

await fetchProducts()
</script>

<template>
    <template v-if="products.length">
        <div class="columns is-multiline is-mobile">
            <div
                class="column is-one-quarter-widescreen is-one-quarter-desktop is-one-quarter-fullhd is-half-mobile is-half-tablet is-flex"
                v-for="product in products"
                :key="product._id"
            >
                <ProductCard :product="product" class="test"/>
            </div>
        </div>
        <Paginator :disable-previous="page <= 1" :disable-next="page * perPage >= total" @next="getNextPage" @previous="getPreviousPage"/>
    </template>
    <div class="message" v-else>
        <div class="message-body">No products found</div>
    </div>
</template>

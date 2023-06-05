import { useRoute } from "vue-router";
import { ref, watch } from "vue";

export function useProductFilters() {
    const route = useRoute()

    const category = ref<string>()
    const brand = ref<string>()
    const minPrice = ref<number>()
    const maxPrice = ref<number>()

    watch(
        () => ({category: route.query.category, brand: route.query.brand, minPrice: route.query.minPrice, maxPrice: route.query.maxPrice}),
        (newQuery) => {
            if (newQuery.category && typeof newQuery.category === 'string') {
                category.value = newQuery.category
            } else {
                category.value = undefined
            }
            if (newQuery.brand && typeof newQuery.brand === 'string') {
                brand.value = newQuery.brand
            } else {
                brand.value = undefined
            }
            if (newQuery.minPrice && typeof newQuery.minPrice === 'string') {
                minPrice.value = parseFloat(newQuery.minPrice)
            } else {
                minPrice.value = undefined
            }
            if (newQuery.maxPrice && typeof newQuery.maxPrice === 'string') {
                maxPrice.value = parseFloat(newQuery.maxPrice)
            } else {
                maxPrice.value = undefined
            }
        },
        {
            immediate: true
        }
    )

    return {
        category,
        brand,
        minPrice,
        maxPrice
    }
}

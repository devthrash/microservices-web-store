import { useRoute } from "vue-router";
import { ref, watch } from "vue";

interface Specs {
    [key: string]: string
}

export function useProductFilters() {
    const route = useRoute()

    const category = ref<string>()
    const brand = ref<string>()
    const minPrice = ref<number>()
    const maxPrice = ref<number>()
    const specs = ref<Specs>({})

    watch(
        // () => ({category: route.query.category, brand: route.query.brand, minPrice: route.query.minPrice, maxPrice: route.query.maxPrice}),
        () => route.query,
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

            specs.value = {}
            for (const [spec, value] of Object.entries(newQuery).filter((i) => !['category', 'brand', 'minPrice', 'maxPrice', 'page'].includes(i[0]))) {
                if (typeof value === 'string') {
                    specs.value[spec] = value
                }
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
        maxPrice,
        specs
    }
}

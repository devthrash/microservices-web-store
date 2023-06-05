import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";

export function usePaginator() {
    const router = useRouter()
    const route = useRoute()

    const page = ref<number>(1)

    watch(
        () => route.query.page,
        (newPage) => {
            if (newPage && typeof newPage === 'string' && newPage.match(/[0-9]\d*/)) {
                page.value = parseInt(newPage)
            } else {
                page.value = 1
            }
        },
        {
            immediate: true
        })

    async function getNextPage() {
        await router.push({
            name: route.name!,
            params: {
                ...route.params
            },
            query: {
                ...route.query,
                page: page.value + 1
            }
        })
    }

    async function getPreviousPage() {
        await router.push({
            name: route.name!,
            params: {
                ...route.params
            },
            query: {
                ...route.query,
                page: page.value - 1
            }
        })
    }

    return {
        page,
        getNextPage,
        getPreviousPage
    }
}

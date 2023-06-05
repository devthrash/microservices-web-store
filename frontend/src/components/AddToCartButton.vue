<script setup lang="ts">
import { ref } from "vue";
import { useBasket } from "@/composable/useBasket";

interface Props {
    productId: string
}

const props = defineProps<Props>()
const basket = useBasket()
const isLoading = ref(false)

function incrementProduct() {
    isLoading.value = true

    basket.incrementProduct(props.productId).finally(() => {{
        isLoading.value = false
    }})
}
</script>

<template>
    <button class="button is-fullwidth is-danger" @click="incrementProduct" :class="{ 'is-loading': isLoading }">
        <span class="icon is-small">
            <i class="fas fa-shopping-basket"></i>
        </span>
        <span>Add to cart</span>
    </button>
</template>

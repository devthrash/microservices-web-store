<script setup lang="ts">
import { useRouter } from "vue-router"
import AddToCartButton from "@/components/AddToCartButton.vue"
import type { IProduct } from "@/interfaces/IProduct"

interface Props {
    product: IProduct
}

const props = defineProps<Props>()
const router = useRouter()

function goToProductPage() {
    router.push({
        name: 'product_page',
        params: {
            productId: props.product._id
        }
    })
}
</script>

<template>
    <div class="box is-flex flex-column">
        <div>
            <div class="block">
                <figure class="image is-square is-clickable" @click="goToProductPage">
                    <img :src="product.images[0].url" alt="Product image"/>
                </figure>
            </div>

            <div class="block">
                <div class="has-text-weight-semibold">
                    {{ product.title }}
                </div>
                <div class="has-text-weight-light">
                    {{ product.price.toFixed(2) }}Lei
                </div>
            </div>
        </div>

        <div class="end">
            <AddToCartButton :product-id="product._id"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "./../assets/main";

.end {
    padding-top: $block-spacing;
    margin-top: auto;
}
.box {
    width: 100%;
    flex-direction: column;
}
</style>

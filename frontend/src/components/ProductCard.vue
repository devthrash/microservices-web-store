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
    <div class="box">
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

        <div class="block">
            <AddToCartButton :product-id="product._id"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
//@import "./../assets/main";
//div .box {
//    width: 100%;
//    height: 100%;
//    position: relative;
//}
//.bottom {
//    position: absolute;
//    bottom: $box-padding;
//    width: calc(100% - $box-padding * 2);
//    //left: 0;
//}
//    //align-self: flex-end
</style>

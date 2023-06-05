<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import type { IProduct } from "@/interfaces/IProduct";
import AddToCartButton from "@/components/AddToCartButton.vue";
import AddToFavoritesBtn from "@/components/AddToFavoritesBtn.vue";
import { getProduct } from "@/services/apis/products";
import { isAxiosError } from "axios";

interface Props {
    productId: string
}

const { productId } = defineProps<Props>()
const product = ref<IProduct>()
const found = ref(true)

onBeforeMount(async () => {
    try {
        product.value = await getProduct(productId)
    } catch (e) {
        if (isAxiosError(e) && e.response.status == 404) {
            found.value = false
        }
    }
})
</script>

<template>
    <template v-if="product">
        <!-- Main product info -->
        <section class="section">
            <div class="container">
                <h1 class="title">{{ product.title }}</h1>

                <div class="columns">
                    <div class="column">
                        <figure class="image is-square">
                            <img :src="product.images[0].url" alt="Product image"/>
                        </figure>
                    </div>
                    <div class="column">
                        <div class="has-text-weight-bold is-size-3">{{ product.price.toFixed(2) }}Lei</div>
                        <div class="has-text-weight-semibold">Brand: {{ product.brand.name }}</div>
                    </div>
                    <div class="column">
                        <div class="block">
                            <AddToCartButton :product-id="product._id"/>
                        </div>
                        <div class="block">
                            <AddToFavoritesBtn :product-id="product._id"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Description -->
        <section class="section">
            <div class="container">
                <h2 class="subtitle">Description</h2>
                <div class="content">
                    {{ product.description }}
                </div>
            </div>
        </section>

        <!-- Specs -->
        <section class="section">
            <div class="container">
                <h2 class="subtitle">Specifications</h2>
                <table class="table is-fullwidth">
                    <tbody>
                    <tr v-for="spec in product.specs">
                        <td>{{ spec.name }}</td>
                        <td>{{ spec.value }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </template>

    <div class="message" v-if="!found">
        <div class="message-body">
            Product not found
        </div>
    </div>
</template>

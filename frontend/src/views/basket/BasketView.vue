<script setup lang="ts">
import { useBasket } from "@/composable/useBasket";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const { items, incrementProduct, removeProduct } = useBasket()

const productCount = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))
const totalPrice = computed(() => items.value.reduce((total, item) => total + item.unitPrice * item.quantity, 0).toFixed(2))
</script>

<template>
    <section class="section">
        <div class="container">
            <h1 class="title">Your shopping cart</h1>

            <template v-if="items.length">
                <div class="columns is-desktop">
                    <div class="column">
                        <div class="box" v-for="product in items">
                            <div class="columns">
                                <!--                    <div class="column">-->

                                <!--                    </div>-->
                                <div class="column">
                                    <router-link :to="{ name: 'product_page', params: { productId: product.productId } }" class="has-text-weight-semibold has-text-black">{{ product.title }}</router-link>
                                    <br>
                                    {{ (product.unitPrice * product.quantity).toFixed(2) }} Lei
                                </div>
                                <div class="column">
                                    <div class="field is-grouped is-pulled-right">
                                        <p class="control">
                                            <button class="button is-circular" :disabled="product.quantity < 2" @click="incrementProduct(product.productId, -1)">
                                    <span class="icon is-small">
                                        <i class="fas fa-minus"></i>
                                    </span>
                                            </button>
                                        </p>
                                        <p class="control">
                                            <button class="button is-ghost">
                                                {{ product.quantity }}
                                            </button>
                                        </p>
                                        <p class="control">
                                            <button class="button is-circular" @click="incrementProduct(product.productId, 1)">
                                    <span class="icon is-small">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                            </button>
                                        </p>
                                    </div>
                                    <div class="field is-pulled-right">
                                        <div class="control">
                                            <div class="button is-ghost" @click="removeProduct(product.productId)">
                                                Remove
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-one-quarter-desktop">
                        <div class="box">
                            <h2 class="subtitle">Order summary</h2>
                            <div class="block">
                                Products: <strong>{{ productCount }} products</strong>
                                <br>
                                Total price: <strong>{{ totalPrice }} LEI</strong>
                            </div>
                            <router-link :to="{ name: 'checkout' }" class="button is-fullwidth is-danger">Checkout</router-link>
                        </div>
                    </div>
                </div>
            </template>
            <div v-else class="message">
                <div class="message-body">
                    Empty basket
                </div>
            </div>
        </div>
    </section>
</template>

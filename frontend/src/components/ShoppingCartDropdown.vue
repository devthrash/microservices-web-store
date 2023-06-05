<script setup lang="ts">
import { computed } from "vue";
import { useBasket } from "@/composable/useBasket";

const { items } = useBasket()
const itemCount = computed(() => items.value.reduce((qt, item) => qt + item.quantity, 0))
</script>

<template>
    <div class="navbar-item has-dropdown is-hoverable">
        <router-link :to="{ name: 'basket' }" class="navbar-link">
            <span class="icon-text">
                <span class="icon">
                  <i class="fas fa-shopping-basket"></i>
                </span>
                <span>Shopping cart</span>
            </span>
        </router-link>

        <div class="navbar-dropdown is-right is-boxed">
            <template v-if="!items.length">
                <div class="navbar-item">
                    No products
                </div>
            </template>
            <template v-else>
                <a class="navbar-item" v-for="item in items" :key="item.productId">
                    <div>
                        <div>
                            {{ item.title }}
                        </div>
                        <em>Quantity: {{ item.quantity }}</em>
                    </div>
                </a>
                <hr class="navbar-divider"/>

                <a class="navbar-item">
                    <span class="has-text-weight-semibold">Total:&nbsp;</span>
                    <span>{{ itemCount }} products</span>
                </a>

                <hr class="navbar-divider"/>

                <router-link :to="{ name: 'basket' }" class="navbar-item button is-text">
                    Go to basket page
                </router-link>
            </template>
        </div>
    </div>
</template>

<style scoped>

</style>

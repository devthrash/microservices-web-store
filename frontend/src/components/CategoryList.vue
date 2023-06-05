<script setup lang="ts">
import { ref } from "vue";
import { getProductCategories } from "@/services/apis/products";

const categories = ref<string[]>([])

categories.value = await getProductCategories()
</script>

<template>
    <li>
        <router-link :to="{ name: 'catalog', params: { category: '' } }" active-class="is-active">
            All products
        </router-link>
    </li>
    <li v-for="(category, index) in categories" :key="index">
        <router-link :to="{ name: 'catalog', params: { category } }" active-class="is-active">
            {{ category }}
        </router-link>
    </li>
</template>

<script setup lang="ts">
import ProductList from "@/components/ProductList.vue";
import ProductFilters from "@/components/ProductFilters.vue";

interface Props {
    text: string
}
defineProps<Props>()
</script>

<template>
    <div class="section">
        <div class="container is-fluid">
            <div class="columns">
                <div class="column is-one-quarter">
                    <ProductFilters/>
                </div>
                <div class="column">
                    <h1 class="title">Search results for: "{{ text }}"</h1>
                    <Suspense>
                        <template #default>
                            <ProductList :search="text"/>
                        </template>
                    </Suspense>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CategoryList from "@/components/CategoryList.vue";
import ProductList from "@/components/ProductList.vue";

interface Props {
    category?: string
}
defineProps<Props>()
</script>

<template>
    <div class="section">
        <div class="container is-fluid">
            <div class="columns">
                <div class="column is-one-quarter">
                    <h2 class="subtitle">Categories</h2>
                    <Suspense>
                        <template #default>
                            <aside class="menu">
                                <ul class="menu-list">
                                    <CategoryList/>
                                </ul>
                            </aside>

                        </template>
                    </Suspense>
                </div>
                <div class="column">
                    <Suspense>
                        <template #default>
                            <ProductList :category="category"/>
                        </template>
                    </Suspense>
                </div>
            </div>
        </div>
    </div>
</template>

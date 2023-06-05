<script setup lang="ts">
import Checkout from "@/components/Checkout.vue";
</script>

<template>
    <section class="section">
        <div class="container is-max-desktop">
            <Suspense>
                <template #default>
                    <Checkout/>
                </template>
            </Suspense>
        </div>
    </section>
</template>

<style scoped>

</style>

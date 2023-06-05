<script setup lang="ts">
import OrderList from "@/components/OrderList.vue";
</script>

<template>
    <Suspense>
        <template #default>
            <OrderList/>
        </template>
    </Suspense>
</template>

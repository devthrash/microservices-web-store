<script setup lang="ts">
import Address from "@/components/Address.vue";
</script>

<template>
    <h1 class="title">Manage addresses</h1>

    <Suspense>
        <template #default>
            <Address/>
        </template>
    </Suspense>
</template>

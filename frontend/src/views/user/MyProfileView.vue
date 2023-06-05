<script setup lang="ts">
import Profile from "@/components/Profile.vue";
</script>

<template>
    <Suspense>
        <template #default>
            <Profile/>
        </template>
    </Suspense>
</template>

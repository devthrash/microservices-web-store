<script setup lang="ts">
import { useToastsStore } from "@/stores/toasts";
import Toast from "@/components/Toast.vue";

interface Props {
    itemClass?: string
}
defineProps<Props>()

const store = useToastsStore()

function close(uuid) {
    store.removeToast(uuid)
}
</script>

<template>
    <Toast
        :message="toast.message"
        :uuid="toast.uuid"
        v-for="toast in store.toasts"
        :key="toast.uuid"
        @close="close"
        :class="itemClass"
    />
</template>


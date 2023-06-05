<script setup lang="ts">
interface Props {
    uuid: string,
    message: string
}

interface Emits {
    (e: 'close', uuid: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
    <div class="notification is-danger">
        <button class="delete" @click="$emit('close', uuid)"></button>
        {{ message }}
    </div>
</template>

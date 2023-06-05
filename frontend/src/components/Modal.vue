<script setup lang="ts">
import { toRef, watch } from "vue";

interface Props {
    showModal: boolean
}

const props = defineProps<Props>()
const showModalRef = toRef(props, 'showModal')

watch(showModalRef, (newValue) => {
    if (newValue) {
        document.documentElement.classList.add('is-clipped')
    } else {
        document.documentElement.classList.remove('is-clipped')
    }
})

interface Events {
    (e: 'close-modal'): void
}

defineEmits<Events>()
</script>

<template>
    <div class="modal" :class="{ 'is-active': showModal }">
        <div class="modal-background" @click="$emit('close-modal')"></div>
        <div class="modal-content">
            <slot></slot>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="$emit('close-modal')"></button>
    </div>
</template>

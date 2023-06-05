<script setup lang="ts">
interface Props {
    disablePrevious: boolean,
    disableNext: boolean
}

interface Events {
    (e: 'next'): void
    (e: 'previous'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Events>()

function clickPrevious() {
    if (!props.disablePrevious) {
        emit('previous')
    }
}

function clickNext() {
    if (!props.disableNext) {
        emit('next')
    }
}
</script>

<template>
    <nav class="pagination is-rounded is-medium">
        <a class="pagination-previous" :class="{'is-disabled': disablePrevious}" @click="clickPrevious">Previous page</a>
        <a class="pagination-next" :class="{'is-disabled': disableNext}" @click="clickNext">Next page</a>
        <!--<ul class="pagination-list"></ul>-->
    </nav>
</template>

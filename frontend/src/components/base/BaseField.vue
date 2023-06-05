<script setup lang="ts">
import { toRef, computed } from 'vue';
import { useField } from 'vee-validate';

interface Props {
    value?: string,
    name: string,
    label: string,
    placeholder: string,
    type: string
}

const props = defineProps<Props>()

const name = toRef(props, 'name');
const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {
    initialValue: props.value,
});

const showError = computed(() => meta.validated && !meta.valid)
</script>

<template>
    <div class="field">
        <label class="label" :for="name">{{ label }}</label>
        <div class="control">
            <input
                :name="name"
                :id="name"
                :type="type"
                :value="inputValue"
                :placeholder="placeholder"
                @change="handleChange"
                @blur="handleBlur"
                class="input"
                :class="{ 'is-danger': showError }"
            />
        </div>
        <p class="help is-danger" v-show="showError && errorMessage && errorMessage.length">{{ errorMessage }}</p>
    </div>
</template>

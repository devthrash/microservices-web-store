<script setup lang="ts">
import BaseField from "@/components/base/BaseField.vue"
import { Form } from 'vee-validate';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

interface Props {
    firstname?: string,
    lastname?: string
}

const props = defineProps<Props>()

const schema = toTypedSchema(yup.object().shape({
    firstname: yup.string().required().min(3),
    lastname: yup.string().required()
}));

const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        firstname: props.firstname,
        lastname: props.lastname
    }
})

interface Emits {
    (e: 'submit', submitted): void
}

const emit = defineEmits<Emits>()

const submit = handleSubmit((submitted) => {
    emit('submit', submitted)
})
</script>

<template>
    <div class="box">
        <form @submit="submit">
            <BaseField name="firstname" label="First name" placeholder="First name" type="text"/>
            <BaseField name="lastname" label="Last name" placeholder="Last name" type="text"/>

            <div class="field">
                <div class="control">
                    <button class="button is-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

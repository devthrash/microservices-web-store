<script setup lang="ts">
import { Form } from 'vee-validate';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import BaseInput from "@/components/base/BaseField.vue";
import { toTypedSchema } from '@vee-validate/yup';

interface Props {
    contactName?: string,
    phone?: string,
    address?: string,
    locality?: string,
    county?: string
}

const props = defineProps<Props>()

const schema = toTypedSchema(yup.object().shape({
    contactName: yup.string().required().min(3),
    phone: yup.string(),
    address: yup.string().required().min(3),
    locality: yup.string().required().min(3),
    county: yup.string().required().min(3)
}));

const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        contactName: props.contactName,
        phone: props.phone,
        address: props.address,
        locality: props.locality,
        county: props.county
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
    <form @submit="submit">
        <BaseInput type="text" name="contactName" label="Contact name" placeholder="Contact name"/>
        <BaseInput type="text" name="phone" label="Phone" placeholder="Phone"/>
        <BaseInput type="text" name="address" label="Address" placeholder="Address"/>
        <BaseInput type="text" name="locality" label="Locality" placeholder="Locality"/>
        <BaseInput type="text" name="county" label="County" placeholder="County"/>

        <div class="field">
            <div class="control">
                <button class="button is-primary">Submit</button>
            </div>
        </div>
    </form>
</template>

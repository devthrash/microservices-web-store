<script setup lang="ts">
import BaseField from "@/components/base/BaseField.vue";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { registerUser } from "@/services/apis/users";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const errMsg = ref<string>()
const isLoading = ref(false)
const schema = toTypedSchema(yup.object().shape({
    firstname: yup.string().required().min(3),
    lastname: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    passwordConfirm: yup.string().required().oneOf([yup.ref('password')], 'Passwords don\'t match')
}));

const { handleSubmit } = useForm({
    validationSchema: schema,
})

const submit = handleSubmit(async (submitted) => {
    isLoading.value = true
    try {
        await registerUser({
            firstname: submitted.firstname,
            lastname: submitted.lastname,
            email: submitted.email,
            password: submitted.password
        })

        await router.push({ name: 'login' })
    } catch (e) {
        errMsg.value = e.response?.data?.message
    }

    isLoading.value = false
})
</script>

<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-one-quarter-desktop">
                <div class="box">
                    <h1 class="title">Register</h1>
                    <form @submit="submit">
                        <BaseField name="firstname" label="First name" placeholder="First name" type="text"/>
                        <BaseField name="lastname" label="Last name" placeholder="Last name" type="text"/>
                        <BaseField name="email" label="Email" placeholder="Email" type="text"/>
                        <BaseField name="password" label="Password" placeholder="Password" type="password"/>
                        <BaseField name="passwordConfirm" label="Confirm password" placeholder="Confirm password" type="password"/>
                        <div class="field">
                            <div class="control">
                                <button class="button is-info is-fullwidth" :class="{'is-loading': isLoading}">Create account</button>
                            </div>
                        </div>
                    </form>

                    <template v-if="errMsg">
                        <br>
                        <div class="message is-danger">
                            <div class="message-body">
                                {{ errMsg }}
                            </div>
                        </div>
                    </template>

                    <hr>
                    <router-link :to="{ name: 'login' }" class="button is-ghost is-fullwidth">Login</router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>

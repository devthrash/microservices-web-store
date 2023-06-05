<script setup lang="ts">
import BaseField from "@/components/base/BaseField.vue";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { loginUser } from "@/services/apis/users"
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTokenStore } from "@/stores/token";

const route = useRoute()
const router = useRouter()
const errMsg = ref<string>()
const isLoading = ref(false)
const schema = toTypedSchema(yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
}));
const tokenStore = useTokenStore()

const { handleSubmit } = useForm({
    validationSchema: schema,
})

const submit = handleSubmit(async (submitted) => {
    isLoading.value = true
    try {
        const response = await loginUser({
            email: submitted.email,
            password: submitted.password
        })

        tokenStore.setToken(response.token)

        if (typeof route.query.redirect === 'string') {
            await router.push({ path: route.query.redirect })
        } else {
            await router.push({ path: '/' })
        }
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
                    <h1 class="title">Login</h1>
                    <form @submit="submit">
                        <BaseField name="email" label="Email" placeholder="Email" type="text" value=""/>
                        <BaseField name="password" label="Password" placeholder="Password" type="password" value=""/>
                        <div class="field">
                            <div class="control">
                                <button class="button is-info is-fullwidth">Login</button>
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
                    <router-link :to="{ name: 'register' }" class="button is-ghost is-fullwidth">Register</router-link>
                </div>
            </div>
        </div>
    </section>
</template>

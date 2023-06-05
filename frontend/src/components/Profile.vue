<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import type { ICustomer } from "@/interfaces/ICustomer";
import { getCurrentCustomer, updateCurrentCustomer } from "@/services/apis/customers";
import ProfileForm from "@/components/forms/ProfileForm.vue";
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/token";

const router = useRouter()
const tokenStore = useTokenStore()
const customer = ref<ICustomer>()
const showModal = ref(false)

customer.value = await getCurrentCustomer()

async function updateProfile(submitted) {
    await updateCurrentCustomer({
        firstname: submitted.firstname,
        lastname: submitted.lastname
    })

    customer.value = await getCurrentCustomer()

    showModal.value = false
}

function manageAddresses() {
    router.push({
        name: 'manage_addresses'
    })
}
</script>

<template>
        <h1 class="title">Profile details</h1>

        <div class="box">
            <div class="columns">
                <div class="column">
                    <strong>Full name</strong>
                </div>
                <div class="column">
                    {{ customer?.firstname }} {{ customer?.lastname }}
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <strong>Email</strong>
                </div>
                <div class="column">
                    {{ customer?.email }}
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <strong>Phone number</strong>
                </div>
                <div class="column">
                    {{ customer?.phone || '-' }}
                </div>
            </div>

            <button class="button is-info is-light is-fullwidth" @click="showModal = true">Edit details</button>

            <Modal :show-modal="showModal" @close-modal="showModal = false">
                <ProfileForm :firstname="customer?.firstname" :lastname="customer?.lastname" @submit="updateProfile"/>
            </Modal>
        </div>

        <h1 class="title">My address</h1>
        <div class="box">
            <div class="content" v-if="customer?.address">
                <strong>{{ customer?.address.contactName }}</strong>
                <br>
                {{ customer?.address.phone }}
                <br>
                {{ customer?.address.address }}
                <br>
                {{ customer?.address.locality }}, {{ customer?.address.county }}
            </div>
            <div class="message" v-else>
                <div class="message-body">
                    No address set
                </div>
            </div>

            <div class="button is-info is-light is-fullwidth" @click="manageAddresses">Manage addresses</div>
        </div>
</template>

<style scoped>

</style>

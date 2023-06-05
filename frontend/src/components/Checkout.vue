<script setup lang="ts">
import { useRouter } from "vue-router";
import { useBasket } from "@/composable/useBasket";
import { computed, ref } from "vue";
import AddressForm from "@/components/forms/AddressForm.vue";
import type { ICustomerAddress } from "@/interfaces/ICustomer";
import { getCurrentCustomer, updateCurrentCustomer } from "@/services/apis/customers";
import Modal from "@/components/Modal.vue";

const router = useRouter()
const { items, checkout: basketCheckout } = useBasket()
const address = ref<ICustomerAddress | null>(null)
address.value = (await getCurrentCustomer()).address

const showModal = ref(false)

const productCount = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))
const totalPrice = computed(() => items.value.reduce((total, item) => total + item.unitPrice * item.quantity, 0).toFixed(2))

async function updateAddress(submitted) {
    await updateCurrentCustomer({
        address: {
            county: submitted.county,
            locality: submitted.locality,
            address: submitted.address,
            contactName: submitted.contactName,
            phone: submitted.phone,
        }
    })

    address.value = (await getCurrentCustomer()).address
    showModal.value = false
}

async function checkout() {
    await basketCheckout(address.value!)
    await router.push({ name: 'checkout_success' })
}
</script>

<template>

    <div class="box">
        <h1 class="title">Delivery info</h1>
        <template v-if="address">
            <div class="content">
                <strong>{{ address.contactName }}</strong>
                <br>
                {{ address.phone }}
                <br>
                {{ address.address }}
                <br>
                {{ address.locality }}, {{ address.county }}
            </div>
            <div class="buttons">
                <button class="button is-info" @click="showModal = true">
                    Edit address
                </button>
            </div>
        </template>
        <div class="buttons" v-else>
            <button class="button is-info" @click="showModal = true">
                Add address
            </button>
        </div>
    </div>

    <div class="box">
        <h1 class="title">Order summary</h1>
        <div class="block">
            Products: <strong>{{ productCount }} products</strong>
            <br>
            Total price: <strong>{{ totalPrice }} LEI</strong>
        </div>
        <div class="block">
            <button class="button is-danger is-fullwidth" :disabled="!address" @click="checkout">
                Buy
            </button>
        </div>
    </div>


    <Modal :show-modal="showModal" @close-modal="showModal = false">
        <div class="box">
            <AddressForm :contact-name="address?.contactName" :phone="address?.phone" :address="address?.address"
                         :locality="address?.locality" :county="address?.county" @submit="updateAddress"/>
        </div>
    </Modal>
</template>

<style scoped>

</style>

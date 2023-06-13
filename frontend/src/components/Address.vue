<script setup lang="ts">
import { getCurrentCustomer, updateCurrentCustomer } from "@/services/apis/customers"
import { ref } from "vue"
import { ICustomerAddress } from "@/interfaces/ICustomer"
import Modal from "@/components/Modal.vue";
import AddressForm from "@/components/forms/AddressForm.vue";

const address = ref<ICustomerAddress|null>(null)
const showModal = ref(false)

address.value = (await getCurrentCustomer()).address

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

async function deleteAddress() {
    await updateCurrentCustomer({ address: null })
    address.value = null
}
</script>

<template>
    <div class="box">
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
                    Edit
                </button>
                <button class="button is-text" @click="deleteAddress">
                    Delete
                </button>
            </div>
        </template>
        <template v-else>
            <div class="message">
                <div class="message-body">
                    No address set
                </div>
            </div>
            <div class="buttons">
                <button class="button is-info" @click="showModal = true">
                    Add address
                </button>
            </div>
        </template>
    </div>
    <Modal :show-modal="showModal" @close-modal="showModal = false">
        <div class="box">
            <AddressForm :contact-name="address?.contactName" :phone="address?.phone" :address="address?.address" :locality="address?.locality" :county="address?.county" @submit="updateAddress"/>
        </div>
    </Modal>


<!--    <div class="box" v-for="address in addresses">-->
<!--        <div class="block">-->
<!--            <strong>{{ address.contactName }}</strong>-->
<!--            <br>-->
<!--            {{ address.phone }}-->
<!--            <br>-->
<!--            {{ address.address }}-->
<!--            <br>-->
<!--            {{ address.locality }}, {{ address.county }}-->
<!--        </div>-->

<!--        <div class="buttons">-->
<!--            <button class="button is-info">-->
<!--                Edit-->
<!--            </button>-->
<!--            <button class="button is-text">-->
<!--                Delete-->
<!--            </button>-->
<!--        </div>-->
<!--    </div>-->

<!--    <Modal :show-modal="showEditModal" @close-modal="showEditModal = false">-->
<!--        <div class="box">-->
<!--            <form @submit="submit">-->
<!--                <BaseInput type="text" name="contactName" label="Contact name" placeholder="Contact name" value=""/>-->
<!--                <BaseInput type="text" name="contactPhone" label="Phone" placeholder="Phone" value=""/>-->
<!--                <BaseInput type="text" name="address" label="Address" placeholder="Address" value=""/>-->
<!--                <BaseInput type="text" name="county" label="County" placeholder="County" value=""/>-->

<!--                <div class="field">-->
<!--                    <div class="control">-->
<!--                        <button class="button is-primary">Submit</button>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </form>-->
<!--        </div>-->
<!--    </Modal>-->
</template>

<style scoped>

</style>

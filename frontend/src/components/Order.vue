<script setup lang="ts">
import type { IOrder } from "@/interfaces/IOrder";
import { computed } from "vue";

interface Props {
    order: IOrder
}

const props = defineProps<Props>()

const createdDate = computed(() => {
    const date = new Date(props.order.createdDate)

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${year}-${month}-${day} ${hour}:${minutes}`
})
</script>

<template>
    <h2 class="subtitle">Order no: {{ order.orderNo }}</h2>

    <table class="table is-fullwidth">
        <thead>
        <tr>
            <th>Product</th>
            <th>Unit price</th>
            <th>Quantity </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in order.items" :key="item.productId">
            <td>
                <router-link
                    :to="{ name: 'product_page', params: { productId: item.productId } }"
                    class="has-text-weight-semibold has-text-black"
                >{{ item.title }}</router-link>
            </td>
            <td>
                {{ item.unitPrice.toFixed(2) }} Lei
            </td>
            <td>
                {{ item.quantity }}
            </td>
        </tr>
        </tbody>
    </table>

    <p>Order date: {{ createdDate }}</p>
    <p>Delivery address: {{ order.deliveryAddress.address }}, {{ order.deliveryAddress.locality }}, {{ order.deliveryAddress.county }}</p>
</template>

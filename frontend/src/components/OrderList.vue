<script setup lang="ts">
import { ref, watch } from "vue";
import { usePaginator } from "@/composable/usePaginator";
import type { IOrder } from "@/interfaces/IOrder";
import { getOrders } from "@/services/apis/orders";
import Paginator from "@/components/Paginator.vue";
import Order from "@/components/Order.vue";

const { page, getPreviousPage, getNextPage } = usePaginator()
const orders = ref<IOrder[]>([])
const total = ref<number>(0)
const perPage = 10

watch(() => page.value, () => fetchOrders())

async function fetchOrders() {
    const response = await getOrders(perPage, page.value)

    orders.value = response.orders
    total.value = response.total
}

await fetchOrders()
</script>

<template>
    <template v-if="orders.length">
        <div class="box" v-for="order in orders" :key="order.orderNo">
            <Order :order="order"/>
        </div>

        <Paginator :disable-previous="page <= 1" :disable-next="page * perPage >= total" @next="getNextPage" @previous="getPreviousPage"/>
    </template>
    <div class="message" v-else>
        <div class="message-body">You don't have orders</div>
    </div>
</template>

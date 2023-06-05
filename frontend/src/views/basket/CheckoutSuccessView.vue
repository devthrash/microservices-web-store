<script setup lang="ts">

</script>

<template>
    <section class="section">
        <div class="container is-max-desktop">
            <div class="box">
                <h1 class="title">Order placed</h1>
                <p>
                    You can check your order <router-link :to="{ name: 'customer_orders' }">here</router-link>.
                </p>
            </div>
        </div>
    </section>
</template>

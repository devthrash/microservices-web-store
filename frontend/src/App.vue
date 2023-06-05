<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavbar from "@/components/TheNavbar.vue";
import ToastList from "@/components/ToastList.vue";
import { useToastsStore } from "@/stores/toasts";
import { onMounted } from "vue";
import { useBasket } from "@/composable/useBasket";
import { registerInterceptors } from "@/services/axios";

const toastsStore = useToastsStore()
const { fetchItems: fetchBasketItems } = useBasket()

onMounted(() => {
    registerInterceptors()
    fetchBasketItems()
})
</script>

<template>
  <TheNavbar/>

<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->

  <RouterView />

    <div class="toast-container" v-if="toastsStore.toasts.length">
        <ToastList item-class="toast"/>
    </div>
<!--    <div-->
<!--        style="width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;right:0;bottom:0;text-align:right;align-items:flex-end;">-->
<!--        <div class="notification is-info animate__animated animate__faster animate__fadeOut"-->
<!--             style="width:auto;pointer-events:auto;display:inline-flex;white-space:pre-wrap;opacity:1;">-->
<!--            <button class="delete"></button>-->
<!--            No. I am your father.-->
<!--        </div>-->
<!--    </div>-->
</template>

<style lang="scss">
.toast-container {
    width: 100%;
    z-index: 9999;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items:flex-end;
    bottom: 0;
    right: 0;
    padding: 1.25em;
    pointer-events:none;
}

.toast {
    pointer-events: auto;
    display: inline-flex
}
</style>
<!--<style scoped>-->
<!--header {-->
<!--  line-height: 1.5;-->
<!--  max-height: 100vh;-->
<!--}-->

<!--.logo {-->
<!--  display: block;-->
<!--  margin: 0 auto 2rem;-->
<!--}-->

<!--nav {-->
<!--  width: 100%;-->
<!--  font-size: 12px;-->
<!--  text-align: center;-->
<!--  margin-top: 2rem;-->
<!--}-->

<!--nav a.router-link-exact-active {-->
<!--  color: var(&#45;&#45;color-text);-->
<!--}-->

<!--nav a.router-link-exact-active:hover {-->
<!--  background-color: transparent;-->
<!--}-->

<!--nav a {-->
<!--  display: inline-block;-->
<!--  padding: 0 1rem;-->
<!--  border-left: 1px solid var(&#45;&#45;color-border);-->
<!--}-->

<!--nav a:first-of-type {-->
<!--  border: 0;-->
<!--}-->

<!--@media (min-width: 1024px) {-->
<!--  header {-->
<!--    display: flex;-->
<!--    place-items: center;-->
<!--    padding-right: calc(var(&#45;&#45;section-gap) / 2);-->
<!--  }-->

<!--  .logo {-->
<!--    margin: 0 2rem 0 0;-->
<!--  }-->

<!--  header .wrapper {-->
<!--    display: flex;-->
<!--    place-items: flex-start;-->
<!--    flex-wrap: wrap;-->
<!--  }-->

<!--  nav {-->
<!--    text-align: left;-->
<!--    margin-left: -1rem;-->
<!--    font-size: 1rem;-->

<!--    padding: 1rem 0;-->
<!--    margin-top: 1rem;-->
<!--  }-->
<!--}-->
<!--</style>-->

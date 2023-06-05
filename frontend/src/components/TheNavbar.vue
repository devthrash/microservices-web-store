<script setup lang="ts">
import SearchBox from "@/components/SearchBox.vue";
import ShoppingCartDropdown from "@/components/ShoppingCartDropdown.vue";
import { ref } from "vue";

const isActive = ref(false)
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{path: '/'}">
        <img src="@/assets/logo.png" alt="App logo" width="73" height="28">
      </router-link>
      <div class="navbar-burger" :class="{ 'is-active': isActive }" @click="isActive = !isActive">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isActive }">
<!--      <div class="navbar-start">-->

<!--      </div>-->

      <div class="navbar-search">
        <SearchBox/>
      </div>

      <div class="navbar-end">
        <router-link :to="{ name: 'my_profile' }" class="navbar-item">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-user"></i>
            </span>
            <span>My profile</span>
          </span>
        </router-link>

        <router-link :to="{ name: 'favorites' }" class="navbar-item">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-bookmark"></i>
            </span>
            <span>Favorites</span>
          </span>
        </router-link>

        <ShoppingCartDropdown/>
      </div>
    </div>
  </nav>
</template>

<style lang="sass" scoped>
nav
  display: flex
  align-items: center

.navbar-search
  flex-grow: 1
  padding: 0 0.25em
</style>

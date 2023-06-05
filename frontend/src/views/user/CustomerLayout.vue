<template>
    <section class="section">
        <div class="container is-max-desktop">
            <div class="columns">
                <div class="column is-one-quarter">
                    <aside class="menu">
                        <ul class="menu-list">
                            <li>
                                <router-link :to="{ name: 'my_profile' }" active-class="is-active">
                                    <span class="icon-text">
                                        <span class="icon">
                                            <i class="fas fa-user"></i>
                                        </span>
                                        <span>Profile</span>
                                    </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'manage_addresses' }" active-class="is-active">
                                    <span class="icon-text">
                                        <span class="icon">
                                            <i class="fas fa-address-card"></i>
                                        </span>
                                        <span>Address</span>
                                    </span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'customer_orders' }" active-class="is-active">
                                    <span class="icon-text">
                                        <span class="icon">
                                            <i class="fas fa-money-bill"></i>
                                        </span>
                                        <span>Orders</span>
                                    </span>
                                </router-link>
                            </li>
                            <li>
                                <a @click="logout">
                                    <span class="icon-text">
                                        <span class="icon">
                                            <i class="fas fa-sign-out"></i>
                                        </span>
                                        <span>Logout</span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>

                <div class="column">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { useTokenStore } from "@/stores/token";
import { useRouter } from "vue-router";
import { useFavoritesStore } from "@/stores/favorites";

const router = useRouter()
const tokenStore = useTokenStore()
const favoritesStore = useFavoritesStore()

function logout() {
    tokenStore.setToken(null)
    favoritesStore.setFavorites([])
    router.push({ path: '/' })
}
</script>

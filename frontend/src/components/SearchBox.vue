<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const text = ref('')

function pushSearch() {
  router.push({
    name: 'search_products',
    params: { text: text.value }
  })
}
</script>

<template>
<!--  <div class="field has-addons">-->
  <div class="field">
    <div class="control has-icons-left is-expanded">
      <input class="input is-rounded" placeholder="Search..." v-model="text" @keyup.enter="pushSearch"/>
      <span class="icon is-small is-left">
        <i class="fas fa-magnifying-glass"></i>
      </span>
    </div>
<!--    <div class="control">-->
<!--      <button class="button is-rounded" @click="pushSearch">Search</button>-->
<!--    </div>-->
  </div>
</template>

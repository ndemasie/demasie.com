<script lang="ts" setup>
import SearchBar from '@/components/SearchBar.vue'
import CodeGrid from '@/components/CodeGrid.vue'
import CodeModal from '@/components/CodeModal.vue'

import { ref, watch } from 'vue'

const search = ref('')
</script>

<template>
  <h2 class="mt-6 text-center text-3xl font-semibold">
    Search brand promo codes
  </h2>

  <section id="search" class="mx-auto my-6 max-w-5xl flex justify-center">
    <SearchBar v-model:search="search" />
  </section>

  <section id="results" class="mx-auto max-w-5xl gap-6">
    <CodeGrid :search="search" />
  </section>

  <CodeModal />
</template>

<style scoped></style>

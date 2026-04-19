<script lang="ts" setup>
import { computed } from 'vue'
import { ExternalLinkIcon } from '@radix-icons/vue'

import Card from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Code } from '@/data/codes'
import { store } from '@/stores/store.ts'

const props = defineProps<{
  codeKey: Code['key']
  direct?: boolean
}>()

const code = computed(() => store.codeByKey[props.codeKey])
const brand = computed(() => store.brandByKey[code.value.brandKey])

const onSelect = () => {
  if (code.value) store.setSelectedCodeKey(code.value.key)
}
</script>

<template>
  <Card
    v-if="code && brand"
    class="sm:@container w-full flex flex-col h-full overflow-hidden"
    @click="onSelect"
  >
    <Card.Header
      class="mb-6 h-[160px] @[400px]:h-full @[400px]:max-h-[280px]"
      :style="{
        backgroundColor: brand.theme === 'light' ? 'white' : 'inherit',
      }"
    >
      <img
        class="h-full w-full"
        :src="brand.logoUrl"
        :aria-label="`${brand.name} logo`"
        :alt="`${brand.name} logo`"
      />
    </Card.Header>

    <Card.Content class="flex-1">
      <Card.Title class="mb-2">{{ code.description }}</Card.Title>
      <Card.Description class="text-lg">{{ brand.name }}</Card.Description>
    </Card.Content>

    <Card.Footer class="w-full">
      <a v-if="props.direct" :href="code.url" target="_blank" class="w-full">
        <Button class="my-2 w-full" @click="onClose"
          >Get deal <ExternalLinkIcon class="w-4 h-4 mr-2"
        /></Button>
      </a>

      <Button v-else class="my-2 w-full" @click="onSelect">Open</Button>
    </Card.Footer>
  </Card>
</template>

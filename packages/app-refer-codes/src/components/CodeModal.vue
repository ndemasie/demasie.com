<script lang="ts" setup>
import cloneDeep from 'lodash/cloneDeep'
import { ExternalLinkIcon } from '@radix-icons/vue'

import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import Drawer from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'

import { store, searchParams } from '@/stores/store.ts'
const code = computed(() => {
  const key = searchParams.code as string | null
  return key && key in store.codeByKey ? store.codeByKey[key] : undefined
})
const brand = computed(() => store.brandByKey[code.value?.brandKey])

const isOpen = computed(() => !!code?.value)
const onUpdate = (open) => {
  if (open) return
  onClose()
}
const onClose = () => {
  delete searchParams.code
}

const isDesktop = useMediaQuery('(min-width: 768px)')
const logoStyles = computed(() => ({
  backgroundColor: brand.value?.theme === 'light' ? 'white' : 'inherit',
  backgroundImage: `url('${brand.value?.logoUrl}')`,
}))

const [UseCardDetails, CardDetails] = createReusableTemplate()
</script>

<template>
  <UseCardDetails>
    <h1>{{ brand?.name }}</h1>
    <p>{{ code?.description }}</p>
  </UseCardDetails>

  <Dialog v-if="isDesktop" :open="isOpen" @update:open="onUpdate">
    <Dialog.Content class="sm:max-w-[425px] h-40lvh">
      <Dialog.Header class="mt-2">
        <div class="brand-logo my-2" :style="logoStyles"></div>

        <Dialog.Title class="my-2">{{ code?.description }}</Dialog.Title>
      </Dialog.Header>

      <!-- <Dialog.Description>{{ brand.name }}</Dialog.Description> -->
      <Dialog.Footer class="flex justify-between items-center">
        <Button class="my-2" variant="outline" @click="onClose">Close</Button>

        <a v-if="code?.url" :href="code.url" target="_blank">
          <Button class="my-2 ml-auto"
            >Get deal <ExternalLinkIcon class="w-4 h-4 mr-2"
          /></Button>
        </a>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog>

  <Drawer v-else :open="isOpen" @update:open="onUpdate">
    <Drawer.Content class="pl-6 pr-6">
      <Drawer.Header>
        <div class="brand-logo my-2" :style="logoStyles"></div>

        <Drawer.Title class="my-2">{{ code?.description }}</Drawer.Title>
      </Drawer.Header>

      <!-- <Drawer.Description>{{ brand.name }}</Drawer.Description> -->
      <Drawer.Footer class="mb-6">
        <a v-if="code?.url" :href="code.url" target="_blank">
          <Button class="my-2 w-full" @click="onClose"
            >Get deal <ExternalLinkIcon class="w-4 h-4 mr-2"
          /></Button>
        </a>

        <Button class="my-2 w-full" variant="outline" @click="onClose"
          >Close</Button
        >
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer>
</template>

<style scoped>
.brand-logo {
  width: 100%;
  height: 100px;
  background-size: calc(100% - 128px);
  background-position: center;
  background-repeat: no-repeat;
  background-origin: content-box;
}
</style>

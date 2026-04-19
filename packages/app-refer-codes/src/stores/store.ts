import keyBy from 'lodash/keyBy'
import { reactive } from 'vue'

import type { Brand, Code } from '@/data/codes'

const DATA_URL =
  'https://raw.githubusercontent.com/ndemasie/demasie.com/refs/heads/main/packages/app-refer-codes/public/data.json'

export const store = reactive<{
  brandByKey: Record<string, Brand>
  codeByKey: Record<string, Code>
  selectedCodeKey: Code['key'] | null | undefined
  setSelectedCodeKey: (key: Code['key'] | null | undefined) => void
}>({
  brandByKey: {},
  codeByKey: {},
  selectedCodeKey: null,
  setSelectedCodeKey(key) {
    if (!key || key in store.codeByKey) {
      store.selectedCodeKey = key
    }
  },
})

async function loadStore() {
  try {
    const response = await fetch(DATA_URL, { cache: 'no-cache' })
    if (!response.ok) return

    const data: { brands: Brand[]; codes: Code[] } = await response.json()

    store.brandByKey = keyBy(data.brands, 'key')
    store.codeByKey = keyBy(data.codes, 'key')
  } catch {
    // do nothing on error
  }
}

loadStore()

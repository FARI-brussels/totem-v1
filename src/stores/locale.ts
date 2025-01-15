import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Locale } from '@/types'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref<Locale>('en')

  const setLocale = (l: Locale) => (locale.value = l)

  return { locale, setLocale }
})

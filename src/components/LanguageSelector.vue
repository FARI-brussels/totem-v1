<template>
  <div class="language-selector">
    <span
      v-for="({ label, value }, index) in locales"
      :value="value"
      :key="value"
      class="selector"
      :class="{
        'color-blue-light font-weight-bold': selected === value,
      }"
      @click="() => selectLocale(value)"
    >
      {{ label }}
      <span v-if="index < locales.length - 1" class="color-white"> - </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'update:locale', value: LocaleValue): void
}>()

const props = defineProps<{ locale: LocaleValue }>()

const locales = [
  {
    label: 'NL',
    value: 'nl',
  },
  {
    label: 'EN',
    value: 'en',
  },
  {
    label: 'FR',
    value: 'fr',
  },
] as const

type LocaleValue = (typeof locales)[number]['value']

const selected = ref<LocaleValue>(props.locale || 'en')

const selectLocale = (value: LocaleValue) => {
  selected.value = value
  emit('update:locale', value)
}
</script>

<style scoped lang="scss">
.language-selector {
  font-size: 1.125rem;
  font-weight: 500;
  display: flex;
  justify-content: end;
  width: 100%;
}

.selector {
  position: relative;
  padding-right: 0.5rem;
  cursor: pointer;
}
</style>

<template>
  <div class="wrapper">
    <FTitle>
      {{ TITLE[$props.locale] }}
    </FTitle>
    <h2 class="color-white subtitle font-weight-light">
      {{ SUB_TITLE[$props.locale] }}
    </h2>
    <div class="btn-wrapper">
      <FButton on-dark :label="BUTTON_TEXT[$props.locale]" @click="$emit('start')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@/types'
import { FTitle, FButton } from 'fari-component-library'

const props = defineProps<{ locale: 'en' | 'fr' | 'nl' }>()

const TITLE = {
  en: 'Let us know how we are doing!',
  fr: 'Dites-nous comment nous nous en sortons !',
  nl: 'Laat ons weten hoe het met ons gaat!',
} as const

const SUB_TITLE = {
  en: 'Do let us know your thoughts. Your feedback matters to us! We promise it won’t take long.',
  fr: "N'hésitez pas à nous faire part de vos impressions. Vos commentaires nous intéressent ! Nous vous promettons que cela ne prendra pas longtemps.",
  nl: 'Laat ons weten wat u ervan vindt. Uw feedback is belangrijk voor ons! We beloven dat het niet lang zal duren',
} as const

const BUTTON_TEXT = {
  en: 'Give feedback',
  fr: 'Donner son avis',
  nl: 'Geef feedback',
} as const
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 8rem;
  gap: 2rem;
}

.subtitle {
  font-family: Inter;
  font-size: 3.1rem;
  line-height: normal;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div class="wrapper">
    <FTitle>
      {{ TITLE[$props.locale] }}
    </FTitle>

    <div class="bg-color-blue p-md rounded survey-menu">
      <div
        v-for="survey in MENU_OPTIONS"
        :key="JSON.stringify(survey)"
        class="color-white rounded menu-item"
        :disabled="survey['disabled']"
        :class="{ 'menu-item--disabled': survey['disabled'] }"
        @click="() => select(survey.name)"
      >
        <h2 class="font-size-subtitle">{{ survey[locale] }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FTitle } from 'fari-component-library'
import { useSurveyStore } from '@/stores/survey'
import type { Survey } from '@/types/index'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{ locale: 'en' | 'fr' | 'nl' }>()

const { selectSurvey, MENU_OPTIONS } = useSurveyStore()

const TITLE = {
  en: 'Rate one of our services',
  fr: "Évaluez l'un de nos services",
  nl: 'Beoordeel een van onze diensten',
} as const

function select(survey: Survey) {
  selectSurvey(survey)
  router.push('/survey')
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 8rem;
  gap: 2rem;
}

.survey-menu {
  width: 100%;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
}

.menu-item {
  display: flex;
  height: 19rem;
  padding: 2rem;
  background-color: #2f519c;
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>

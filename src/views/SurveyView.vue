<template>
  <div class="wrapper">
    <TransitionGroup name="fade">
      <div key="form" v-if="form && index < form.length" class="transition-item">
        <h4 class="title">{{ form[index] }}</h4>

        <div class="rating-wrapper">
          <QuestionRating
            v-model="rating"
            :labels="{
              low: ratingLabels.low[locale],
              high: ratingLabels.high[locale],
            }"
          />
        </div>
      </div>

      <div key="feedback" v-else-if="feedback && rated && !submitted" class="transition-item">
        <h4 class="title">{{ feedback.title[locale] }}</h4>

        <div class="feedback-rating-wrapper">
          <div class="rating-group">
            <FeedbackQuestion
              v-for="option in feedback.questions"
              :key="option.label[locale]"
              :label="option.label[locale]"
              :value="option.label[locale]"
              v-model="selectedRatings"
              class="mb-sm"
            />
          </div>
          <div class="button-container">
            <FButton :label="BUTTON_TEXT[locale]" on-dark @click="submit" />
          </div>
        </div>
      </div>

      <div key="thanks" v-else-if="submitted" class="transition-item">
        <h4 class="title">{{ THANK_YOU_TEXT[locale] }}</h4>

        <div class="icon-wrapper">
          <img src="@/assets/thanks.svg" />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/stores/locale'
import QuestionRating from '@/components/QuestionRating.vue'
import FeedbackQuestion from '@/components/FeedbackQuestion.vue'
import { FButton } from 'fari-component-library'
import type { SurveyForm } from '@/types/index'
import { useRouter } from 'vue-router'

const { activeSurvey, getSurvey, sendSurveyFeedback } = useSurveyStore()
const router = useRouter()

const { surveyData } = storeToRefs(useSurveyStore())
const { locale } = storeToRefs(useLocaleStore())

const index = ref(0)
const rating = ref<number | null>(null)

const rated = ref(false)
const submitted = ref(false)

watch(rating, () =>
  setTimeout(() => {
    index.value++
    console.log(index.value >= form.value.length)
    if (index.value >= form.value.length) rated.value = true
  }, 1000),
)

onMounted(getSurvey)

const selectedRatings = ref([])

const form = computed(() => {
  if (!surveyData.value) return null

  const questions = surveyData.value.questions.map((q) => q[locale.value])
  return questions
})

const feedback = computed(() => {
  if (!rating.value) return null
  if (rating.value < 3) return surveyData.value.feedback_negative
  return surveyData.value.feedback_positive
})

function submit() {
  const formData: SurveyForm = {
    survey_name: activeSurvey,
    rating: rating.value,
    feedback: selectedRatings.value,
  }
  sendSurveyFeedback(formData)

  submitted.value = true

  setTimeout(() => router.push('/'), 1500)
}

const ratingLabels = {
  low: {
    en: 'Not likely at all',
    fr: 'Pas du tout probable',
    nl: 'Helemaal niet waarschijnlijk',
  },
  high: {
    en: 'Extremely likely',
    fr: 'Très probable',
    nl: 'Zeer waarschijnlijk',
  },
}

const BUTTON_TEXT = {
  en: 'Submit',
  nl: 'Indienen',
  fr: 'Soumettre',
}

const THANK_YOU_TEXT = {
  en: 'Thank you for your feedback!',
  fr: 'Merci pour votre retour',
  nl: 'Dank u voor uw feedback',
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 8rem;
  gap: 2rem;
  position: relative;
}
.title {
  text-transform: none;
  text-align: center;
  font-size: 3rem;
  font-style: normal;
  font-weight: 900;
  line-height: 95%;
  letter-spacing: -0.96px;
}

.button-container {
  margin-left: 35%;
  margin-top: 4rem;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
}

.transition-item {
  position: absolute; /* Stack elements on top of each other */
  top: 0;
  left: 0;
  width: 100%;
  height: auto; /* Adjust to fit content if needed */
  min-height: 20rem; /* Set a reasonable minimum height */
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

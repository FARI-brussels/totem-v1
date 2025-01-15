import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Survey, SurveyForm } from '@/types/index'
import mockSurvey from './mockSurvey.json'

export const MENU_OPTIONS = {
  demo_tour: {
    disabled: false,
    name: 'demo_tour',
    en: 'Guided Demo Tour  at the Test & Experience Centre',
    fr: "Visite guidée de démonstration au centre d'essai et d'expérience",
    nl: 'Rondleiding in het Test & Experience Centre',
  },
  datawalk: {
    disabled: true,
    name: 'datawalk',
    en: 'Guided datawalk in Brussels',
    fr: 'Visite guidée des données à Bruxelles',
    nl: 'Begeleide datawalk in Brussel',
  },
  ai_initiating: {
    disabled: true,
    name: 'ai_initiating',
    en: 'AI initiating workshop',
    fr: "Atelier d'initiation à l'IA",
    nl: 'AI Initiatieworkshop',
  },
  ai_blindspot: {
    disabled: true,
    name: 'ai_blindspot',
    en: 'AI blindspot workshop',
    fr: "Atelier sur les angles morts de l'IA",
    nl: 'Workshop over AI-blinde vlekken',
  },
} as const

export const useSurveyStore = defineStore('survey', () => {
  const activeSurvey = ref<Survey>('demo_tour')
  const selectSurvey = (survey: Survey) => (activeSurvey.value = survey)

  const surveyData = ref()

  function getSurvey(_survey: Survey) {
    //implement
    surveyData.value = mockSurvey
  }

  function sendSurveyFeedback(formData: SurveyForm) {
    // implement

    console.dir(formData)
  }

  return { activeSurvey, selectSurvey, getSurvey, sendSurveyFeedback, surveyData, MENU_OPTIONS }
})

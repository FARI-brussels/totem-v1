import { MENU_OPTIONS } from '@/stores/survey'
export type Locale = 'en' | 'fr' | 'nl'

export type Survey = keyof typeof MENU_OPTIONS

export type SurveyForm = {
  survey_name: string
  rating: number
  feedback: string[]
}

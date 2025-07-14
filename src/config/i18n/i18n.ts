import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LngDetector from 'i18next-browser-languagedetector'
import fr from './fr.json'
import en from './en.json'

export enum Locales {
	EN = 'en',
	FR = 'fr'
}

const resources = {
	[Locales.EN]: {
		translation : en
	},
	[Locales.FR]: {
		translation : fr
	},
}

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.use(LngDetector)
	.init({
		resources,
		fallbackLng: Locales.EN,
		interpolation: {
			escapeValue: false // react already safes from xss
		}
	})

export default i18n

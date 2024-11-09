import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { ar } from './Lang/AR'
import { en } from './Lang/EN'

const resources = { en, ar }

i18n.use(initReactI18next).init({
  nsSeparator: ':',
  resources,
  lng: localStorage.getItem('lng') || 'ar',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import pt from './pt.json';
const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('nb_lang') : null;
i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, pt: { translation: pt } },
    lng: saved || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
});
export default i18n;

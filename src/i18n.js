import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationUz from "./locales/uz/translation.json";
import translationRu from "./locales/ru/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  uz: {
    translation: translationUz,
  },
  ru: {
    translation: translationRu,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:"uz",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
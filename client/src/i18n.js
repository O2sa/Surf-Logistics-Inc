import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import translationEN from "./locales/en.json";
import translationFr from "./locales/fr.json";
import translationAr from "./locales/ar.json";

// Define the resources
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFr,
  },
  ar: {
    translation: translationAr,
  },
};

const language = localStorage.getItem("i18nextLng") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;

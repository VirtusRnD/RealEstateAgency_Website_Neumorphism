import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// JSON çeviri dosyalarını içe aktarıyoruz
import trTranslation from "./locales/tr/translation.json";
import enTranslation from "./locales/en/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        translation: trTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
    lng: "tr", // Varsayılan açılış dili Türkçe
    fallbackLng: "tr", // Bulunamayan bir anahtar olursa Türkçe'ye düşer
    keySeparator: ".", // "common.home" yapısını çözmesi için kritik ayar
    interpolation: {
      escapeValue: false, // React XSS korumasına sahip olduğu için gerekli
    },
  });

export default i18n;
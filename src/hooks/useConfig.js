import { useMemo, useCallback } from "react"; // 👑 useCallback eklendi
import { useTranslation } from "react-i18next";
import config from "../config.js";

export const useConfig = () => {
  const { i18n } = useTranslation();
  const activeLang = i18n.language?.startsWith("tr") ? "tr" : "en";

  const localeContent = config?.locales?.[activeLang] || config?.locales?.tr;

  const currentConfig = useMemo(() => {
    return {
      ...localeContent,
      mapSrc: config?.mapSrc,
      contact: {
        ...config?.contact,
        ...localeContent?.contact,
      }
    };
  }, [localeContent]);

  const currentLocale = activeLang === "tr" ? "tr-TR" : "en-US";

  // 👑 SIHİRLİ DOKUNUŞ: Akıllı Harf Büyütücü
  // useCallback kullanarak bu fonksiyonun her render'da sıfırdan oluşmasını engelliyoruz.
  const upper = useCallback((text) => {
    if (!text) return "";
    return text.toLocaleUpperCase(currentLocale);
  }, [currentLocale]);

  return {
    currentConfig,
    currentLocale,
    activeLang,
    upper // 👈 Fonksiyonu doğrudan dışarı fırlatıyoruz
  };
};

export default useConfig; // footer'daki default import hatasını önlemek için bunu da ekledik
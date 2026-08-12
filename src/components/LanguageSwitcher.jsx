import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // 👑 Güvenli Dil Tespiti: Eğer i18n.language tanımsız/boş gelirse varsayılan olarak 'tr' kabul et
  const currentLang = i18n.language || "tr";
  const isTurkish = currentLang.toLowerCase().startsWith("tr");

  const toggleLanguage = () => {
    // Aktif dil Türkçe ise 'en', değilse 'tr' yap
    const nextLang = isTurkish ? "en" : "tr";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm tracking-widest py-[0.1em] uppercase font-semibold text-neu-slate-primary hover:text-accent transition-colors duration-300 cursor-pointer"
      aria-label="Language Switcher"
    >
      {/* Aktif dil Türkçe ise tıklanınca EN'ye geçeceğini belirtmek için EN, İngilizce ise TR gösterir */}
      {isTurkish ? "TR" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;
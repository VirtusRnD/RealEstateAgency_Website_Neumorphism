import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useConfig } from "../hooks/useConfig";

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const { upper } = useConfig();

  // Açık olan soruların index'lerini tutan state (Ayrı ayrı açılıp kapanabilir)
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // 👑 i18n DİL DOSYASINDAN OTOMATİK SIK SORULAN SORULAR DİZİSİNİ ÇEKME
  const rawFaqQuestions = t("faq.questions", { returnObjects: true });
  const faqList = Array.isArray(rawFaqQuestions) ? rawFaqQuestions : [];

  return (
    <section id="faq" className="w-full py-16 pt-24 px-4 sm:px-6 lg:px-8 bg-neu-base text-neu-slate-primary relative z-20">
      <div className="max-w-4xl mx-auto">
        
        {/* 👑 BAŞLIK KISMI */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neu-base shadow-neu-pressed text-accent text-xs font-black uppercase tracking-widest mb-3">
            <FiHelpCircle className="text-sm" />
            <span>{upper(t("faq.overline", "Aklınıza Takılanlar"))}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-neu-slate-primary mb-4">
            {t("faq.titleMain", "Sıkça Sorulan")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-grad-from to-grad-to">
              {t("faq.titleHighlight", "Sorular")}
            </span>
          </h2>

          <p className="text-neu-slate-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t("faq.description", "Gayrimenkul alım, satım ve yatırım süreçleriyle ilgili merak ettiğiniz tüm yanıtlar burada.")}
          </p>
        </div>

        {/* 👑 NEUMORPHIC AKORDEON LİSTESİ */}
        <div className="space-y-4">
          {faqList.map((item, index) => {
            const isOpen = openIndexes.includes(index);

            return (
              <div
                key={index}
                className="bg-neu-base rounded-3xl transition-all duration-300 border border-white/20 overflow-hidden"
              >
                {/* SORU BUTONU */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer ${
                    isOpen ? "shadow-neu-pressed bg-neu-base/80" : "shadow-neu-flat hover:shadow-neu-flat-sm"
                  }`}
                >
                  <span className={`font-bold text-sm sm:text-base transition-colors ${
                    isOpen ? "text-accent font-extrabold" : "text-neu-slate-primary"
                  }`}>
                    {item.question}
                  </span>

                  {/* Neumorphic İkon Düğmesi */}
                  <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? "bg-gradient-to-r from-grad-from to-grad-to text-white shadow-neu-flat-sm"
                      : "bg-neu-base shadow-neu-flat text-neu-slate-secondary"
                  }`}>
                    {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                  </div>
                </button>

                {/* CEVAP PARAGRAFI */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-2 text-xs sm:text-sm text-neu-slate-secondary leading-relaxed border-t border-white/10 mt-1">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
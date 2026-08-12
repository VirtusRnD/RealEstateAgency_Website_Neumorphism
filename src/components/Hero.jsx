import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";
import { FiMapPin, FiChevronRight, FiChevronLeft, FiX, FiPhoneCall } from "react-icons/fi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import Searchbar from "./Searchbar";
import { featuredPropertiesConfig } from "../config";
import { useConfig } from "../hooks/useConfig";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { upper } = useConfig();
  const [currentSlide, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // POP-UP MODAL İÇİN SEÇİLİ İLAN STATE'İ
  const [selectedProperty, setSelectedProperty] = useState(null);

  const typewriterStrings = t("hero.typewriter", { returnObjects: true });
  const featuredList = featuredPropertiesConfig || [];
  const timerRef = useRef(null);

  // TIMER & GEZİNTİ
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 5000);
  };

  useEffect(() => {
    if (!featuredList.length || isPaused || selectedProperty) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [featuredList.length, isPaused, currentSlide, selectedProperty]);

  const handleNext = (e) => {
    e?.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredList.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  };

  const activeProperty = featuredList[currentSlide] || featuredList[0];

  // POP-UP AÇILDIĞINDA ARKA PLAN SCROLL KİLİTLENMESİ
  useEffect(() => {
    if (selectedProperty) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProperty]);

  const handleContactAgent = () => {
    setSelectedProperty(null);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
      },
    }),
  };

  return (
    <section id="hero" className="relative w-full min-h-screen pt-24 pb-16 flex items-center bg-neu-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* GRID STRUCTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-3 items-center">
          
          {/* SOL TARAF: BAŞLIK, SLOGAN & ARAMA BARI */}
          <div className="lg:col-span-8 flex flex-col items-start text-left space-y-6 z-20 w-full min-w-0 pr-0 lg:pr-2">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neu-base shadow-neu-pressed text-accent text-xs font-black uppercase tracking-widest">
              <span>{upper(t("hero.badge", "Prestige Gayrimenkul"))}</span>
            </div>

            <div className="font-serif text-neu-slate-primary w-full">
              <span className="text-3xl sm:text-5xl md:text-6xl font-light tracking-wide block mb-1">
                {t("hero.prefix", "Hayalinizdeki")}
              </span>

              {/* DİNAMİK GRADYANLI YAZI ALANI (TEMAYA BAĞLI) */}
              <div className="w-full flex items-start min-h-[110px] sm:min-h-[115px] md:min-h-[120px]">
                <div className="text-3xl sm:text-5xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-grad-from to-grad-to leading-tight">
                  <Typewriter
                    key={i18n.language}
                    options={{
                      strings: Array.isArray(typewriterStrings)
                        ? typewriterStrings
                        : [
                            "Lüks Villayı Keşfedin.",
                            "Deniz Manzaralı Rezidansı Bulun.",
                            "Penthouse Daireyi İnceleyin.",
                          ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                    }}
                  />
                </div>
              </div>
            </div>

            <p className="text-neu-slate-secondary text-sm sm:text-base max-w-xl leading-relaxed">
              {t("hero.description", "En seçkin gayrimenkul portföyü ve yenilikçi yatırım simülasyonlarıyla geleceğe güvenle adım atın.")}
            </p>

            {/* ARAMA ÇUBUĞU */}
            <div className="w-full pt-2">
              <Searchbar />
            </div>
          </div>

          {/* SAĞ TARAF: TIKLANABİLİR DİKEY İLAN KARTI */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start z-20">
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative w-full max-w-[360px] sm:max-w-[380px] h-[520px] p-4 rounded-[36px] bg-neu-base shadow-neu-pressed flex flex-col justify-between"
            >
              
              {/* SLIDE GEÇİŞ ALANI */}
              <div className="relative w-full h-[450px] rounded-[28px] overflow-hidden cursor-pointer group">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.div
                    key={activeProperty.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    onClick={() => setSelectedProperty(activeProperty)}
                    className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden bg-neu-base shadow-neu-flat flex flex-col justify-between"
                  >
                    {/* Görsel Katmanı */}
                    <div className="relative h-2/3 w-full overflow-hidden">
                      <img
                        src={activeProperty.image}
                        alt={t(activeProperty.titleKey, "Öne Çıkan Mülk")}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Durum Etiketi */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3.5 py-1 rounded-xl text-[10px] font-black tracking-wider bg-gradient-to-r from-grad-from to-grad-to text-white shadow-neu-flat-sm">
                          {upper(t(activeProperty.statusKey, "Satılık"))}
                        </span>
                      </div>

                      {/* Fiyat */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="text-2xl font-black text-white font-serif drop-shadow-md">
                          {activeProperty.price}
                        </span>
                      </div>
                    </div>

                    {/* İlan Detay Bilgileri */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-neu-base">
                      <div>
                        <div className="flex items-center gap-1.5 text-neu-slate-secondary text-xs mb-1">
                          <FiMapPin className="text-accent shrink-0" />
                          <span className="truncate">{t(activeProperty.locationKey)}</span>
                        </div>
                        <h3 className="font-serif text-base font-bold text-neu-slate-primary group-hover:text-accent transition-colors line-clamp-1">
                          {t(activeProperty.titleKey)}
                        </h3>
                      </div>

                      {/* Özellik Simgeleri */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                        <div className="p-1.5 rounded-xl bg-neu-base shadow-neu-pressed flex items-center justify-center gap-1">
                          <IoBedOutline className="text-accent text-sm" />
                          <span className="font-bold text-neu-slate-primary">{activeProperty.beds}</span>
                        </div>
                        <div className="p-1.5 rounded-xl bg-neu-base shadow-neu-pressed flex items-center justify-center gap-1">
                          <IoWaterOutline className="text-accent text-sm" />
                          <span className="font-bold text-neu-slate-primary">{activeProperty.baths}</span>
                        </div>
                        <div className="p-1.5 rounded-xl bg-neu-base shadow-neu-pressed flex items-center justify-center gap-1">
                          <span className="font-bold text-neu-slate-primary text-[10px]">{activeProperty.area}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* SLIDER GEZİNTİ BARI */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1.5 rounded-2xl bg-neu-base shadow-neu-flat border border-white/20 z-50">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-xl bg-neu-base shadow-neu-flat active:shadow-neu-pressed flex items-center justify-center text-neu-slate-primary hover:text-accent cursor-pointer transition-colors"
                  aria-label={t("common.prev", "Önceki")}
                >
                  <FiChevronLeft size={18} />
                </button>
                <span className="text-[10px] font-black tracking-widest text-neu-slate-secondary font-mono select-none">
                  0{currentSlide + 1} / 0{featuredList.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-xl bg-neu-base shadow-neu-flat active:shadow-neu-pressed flex items-center justify-center text-neu-slate-primary hover:text-accent cursor-pointer transition-colors"
                  aria-label={t("common.next", "Sonraki")}
                >
                  <FiChevronRight size={18} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* POP-UP İLAN DETAY MODALI */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProperty(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 w-full max-w-2xl bg-neu-base rounded-3xl shadow-neu-flat overflow-hidden p-6 max-h-[85vh] flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-2xl bg-neu-base shadow-neu-flat flex items-center justify-center text-neu-slate-primary hover:text-accent cursor-pointer transition-colors"
                aria-label="Close Modal"
              >
                <FiX size={20} />
              </button>

              <div className="overflow-y-auto pr-1 space-y-4">
                <div className="h-60 rounded-2xl overflow-hidden shadow-neu-pressed relative">
                  <img src={selectedProperty.image} alt={t(selectedProperty.titleKey)} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3.5 py-1 rounded-xl text-[10px] font-black tracking-wider bg-gradient-to-r from-grad-from to-grad-to text-white shadow-neu-flat-sm">
                      {upper(t(selectedProperty.statusKey, "Satılık"))}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-neu-slate-secondary text-xs mb-1">
                    <FiMapPin className="text-accent shrink-0" />
                    <span>{t(selectedProperty.locationKey)}</span>
                  </div>
                  <span className="text-2xl font-black text-accent block mb-1">{selectedProperty.price}</span>
                  <h2 className="text-lg font-bold text-neu-slate-primary">{t(selectedProperty.titleKey)}</h2>
                  <p className="text-xs sm:text-sm text-neu-slate-secondary mt-2 leading-relaxed">
                    {t("modal.descriptionText", "Ayrıcalıklı yaşam alanı, modern mimari ve yüksek yatırım getirisi ile beklentilerinizin ötesinde bir yaşam sunuyor.")}
                  </p>
                </div>

                {/* Modal Özellik Simgeleri */}
                <div className="grid grid-cols-3 gap-3 text-center text-xs pt-2">
                  <div className="p-2.5 rounded-2xl bg-neu-base shadow-neu-pressed flex items-center justify-center gap-1.5">
                    <IoBedOutline className="text-accent text-base" />
                    <span className="font-bold text-neu-slate-primary">{selectedProperty.beds}</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-neu-base shadow-neu-pressed flex items-center justify-center gap-1.5">
                    <IoWaterOutline className="text-accent text-base" />
                    <span className="font-bold text-neu-slate-primary">{selectedProperty.baths}</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-neu-base shadow-neu-pressed flex items-center justify-center gap-1.5">
                    <span className="font-bold text-neu-slate-primary text-xs">{selectedProperty.area}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleContactAgent}
                className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-grad-from to-grad-to text-white font-bold text-xs tracking-widest shadow-neu-flat active:shadow-neu-pressed transition-all duration-200 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
              >
                <FiPhoneCall size={16} />
                <span>{upper(t("modal.contactAgent", "Danışman İle İletişime Geç"))}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
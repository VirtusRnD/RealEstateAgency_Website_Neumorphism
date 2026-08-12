import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGrid, FiList, FiMapPin, FiMaximize, FiHeart, FiX, FiCheck, FiPhoneCall, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useConfig } from "../hooks/useConfig";
import { featuredPropertiesConfig, propertiesConfig } from "../config";

const Listings = () => {
  const { t } = useTranslation();
  const { upper } = useConfig();

  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // 👑 SAYFALAMA (PAGINATION) STATE'İ
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3+3 İlan

  const allPropertiesConfig = [...featuredPropertiesConfig, ...propertiesConfig];
  const totalPages = Math.ceil(allPropertiesConfig.length / itemsPerPage);

  // Mevcut sayfadaki 6 ilanı hesapla
  const currentProperties = allPropertiesConfig.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 👑 SAYFA YÜKSEKLİĞİNİ SABİT TUTMAK İÇİN BOŞ DOLDURUCU (SPACER) SAYISI HESABI
  const emptySlotsCount = itemsPerPage - currentProperties.length;

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Danışman Butonuna Tıklanınca İletişim Bölümüne Kaydırma
  const handleContactAgent = () => {
    setSelectedProperty(null);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // POP-UP AÇILDIĞINDA SCROLL KİLİTLENMESİ
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

  return (
    <section id="listings" className="w-full pt-24 bg-neu-base text-neu-slate-primary relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ÜST FİLTRE VE BAŞLIK BARI */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-neu-base shadow-neu-flat mb-10">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-accent block mb-1">
              {upper(t("listings.overline", "Portföyümüz"))}
            </span>
            <h2 className="text-2xl font-bold text-neu-slate-primary">
              {t("listings.title", "Tüm Gayrimenkuller")} ({allPropertiesConfig.length})
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* GRID / LIST BUTONLARI */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-neu-base shadow-neu-pressed">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-grad-from to-grad-to text-white shadow-neu-flat-sm"
                    : "text-neu-slate-secondary hover:text-neu-slate-primary"
                }`}
                aria-label="Grid View"
              >
                <FiGrid size={18} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-grad-from to-grad-to text-white shadow-neu-flat-sm"
                    : "text-neu-slate-secondary hover:text-neu-slate-primary"
                }`}
                aria-label="List View"
              >
                <FiList size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 👑 3+3 = 6 İLANLIK GRID / LIST ALANI */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[840px]"
              : "flex flex-col gap-6 min-h-[840px]"
          }
        >
          <AnimatePresence mode="wait">
            {currentProperties.map((item) => {
              const translatedTitle = t(item.titleKey, "Lüks Gayrimenkul");
              const translatedLocation = t(item.locationKey, "Türkiye");
              const translatedStatus = t(item.statusKey, "Satılık");

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProperty(item)}
                  className={`group bg-neu-base rounded-3xl overflow-hidden shadow-neu-flat hover:shadow-neu-flat-sm transition-all duration-300 cursor-pointer p-4 flex ${
                    viewMode === "grid" ? "flex-col justify-between h-[390px]" : "flex-col md:flex-row md:h-64 items-stretch gap-6"
                  }`}
                >
                  {/* Görsel Çerçeve */}
                  <div
                    className={`relative overflow-hidden rounded-2xl shadow-neu-pressed ${
                      viewMode === "grid" ? "h-60 w-full" : "h-56 md:h-full md:w-2/5"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={translatedTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-xl text-[10px] font-black tracking-wider bg-gradient-to-r from-grad-from to-grad-to text-white shadow-neu-flat-sm">
                        {upper(translatedStatus)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-xl bg-neu-base/80 shadow-neu-flat flex items-center justify-center text-neu-slate-primary hover:text-accent cursor-pointer transition-colors"
                      aria-label="Add to Favorites"
                    >
                      <FiHeart
                        size={16}
                        className={favorites.includes(item.id) ? "fill-accent text-accent" : ""}
                      />
                    </button>
                  </div>

                  {/* İçerik */}
                  <div className={`flex-1 flex flex-col justify-between ${viewMode === "grid" ? "pt-4" : "py-2"}`}>
                    <div>
                      <div className="flex items-center gap-1.5 text-neu-slate-secondary text-xs mb-1">
                        <FiMapPin className="text-accent shrink-0" />
                        <span>{translatedLocation}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-neu-slate-primary group-hover:text-accent transition-colors line-clamp-1 mb-2">
                        {translatedTitle}
                      </h3>
                      <span className="text-xl font-black text-accent font-serif">
                        {item.price}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-neu-base shadow-neu-pressed flex items-center justify-center gap-1">
                        <IoBedOutline className="text-accent" />
                        <span className="font-bold text-neu-slate-primary">{item.beds}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-neu-base shadow-neu-pressed flex items-center justify-center gap-1">
                        <IoWaterOutline className="text-accent" />
                        <span className="font-bold text-neu-slate-primary">{item.baths}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-neu-base shadow-neu-pressed flex items-center justify-center gap-1">
                        <span className="font-bold text-neu-slate-primary text-[11px]">{item.area}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* 👑 EKSİK İLANLARI GEÇİRGEN/BOŞ YER TUTUCULAR İLE DOLDURMA */}
            {emptySlotsCount > 0 &&
              Array.from({ length: emptySlotsCount }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className={`invisible ${
                    viewMode === "grid" ? "h-[390px]" : "h-64"
                  }`}
                  aria-hidden="true"
                />
              ))}
          </AnimatePresence>
        </div>

        {/* 👑 NEUMORPHIC SAYFALAMA (PAGINATION) OKLARI */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`w-11 h-11 rounded-2xl bg-neu-base flex items-center justify-center transition-all cursor-pointer ${
              currentPage === 1
                ? "opacity-40 shadow-neu-pressed cursor-not-allowed"
                : "shadow-neu-flat active:shadow-neu-pressed text-neu-slate-primary hover:text-accent"
            }`}
            aria-label="Previous Page"
          >
            <FiChevronLeft size={20} />
          </button>

          <span className="px-5 py-2 rounded-2xl bg-neu-base shadow-neu-pressed text-xs font-black tracking-widest text-neu-slate-secondary">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`w-11 h-11 rounded-2xl bg-neu-base flex items-center justify-center transition-all cursor-pointer ${
              currentPage === totalPages
                ? "opacity-40 shadow-neu-pressed cursor-not-allowed"
                : "shadow-neu-flat active:shadow-neu-pressed text-neu-slate-primary hover:text-accent"
            }`}
            aria-label="Next Page"
          >
            <FiChevronRight size={20} />
          </button>
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

export default Listings;
import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { IoCloseSharp } from 'react-icons/io5';
import { useConfig } from '../hooks/useConfig';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const { upper } = useConfig();
  const { t } = useTranslation();

  const [activePolaroid, setActivePolaroid] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const polaroids = galleryPolaroids || [];

  return (
    <div 
      ref={sectionRef}
      id="gallery" 
      className="relative w-full min-h-screen pt-10 pb-20 px-4 transition-colors duration-500 overflow-hidden flex flex-col items-center justify-start bg-brand-cream"
    >
      {/* AHŞAP ZEMİN GÖRSELİ */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center scale-105"
        style={{ backgroundImage: `url('/images/wooden_bg.webp')` }}
      />

      <div className="absolute inset-0 bg-black/25 transition-colors duration-500" />

      {/* 👑 ARKASI BEYAZ ŞERİTLİ ORTALANMIŞ BAŞLIK */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-30 mb-8 lg:mb-4 bg-primary/95 backdrop-blur-sm px-8 py-4 shadow-xl rounded-sm flex flex-col items-center text-center max-w-xs sm:max-w-md"
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold pl-[0.1em] tracking-[0.2em] text-accent uppercase leading-tight">
          {upper(t("common.gallery", "Galeri"))}
        </h1>

        {/* Zarif Ayırıcı Çizgi */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-8 bg-muted"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-accent"></div>
          <div className="h-px w-8 bg-muted"></div>
        </div>
      </motion.div>

      {/* 📸 MASAÜSTÜ DAĞINIK POLAROID EKRANI (lg ve üstü) */}
      <div className="hidden lg:block relative w-full max-w-[1500px] h-[78vh] z-20 mx-auto">
        {polaroids.map((item) => {
          const targetRotate = Number(item.rotate) || 0;
          return (
            <motion.div
              key={`desktop-gallery-${item.id}`}
              layoutId={`gallery-polaroid-${item.id}`}
              onClick={() => setActivePolaroid(item)}
              initial={{ y: 100, opacity: 0, rotate: targetRotate - 15 }}
              animate={
                isInView 
                  ? { y: 0, opacity: 1, rotate: targetRotate } 
                  : { y: 100, opacity: 0, rotate: targetRotate - 15 }
              }
              whileHover={{ 
                scale: 1.12, 
                zIndex: 40, 
                transition: { duration: 0.2, delay: 0 } 
              }}
              transition={{ 
                duration: 0.9, 
                delay: item.delay || 0.1, 
                ease: [0.25, 1, 0.5, 1],
                layout: { duration: 0.25, ease: "easeOut" }
              }}
              style={{ 
                top: item.topPosition || "10%", 
                left: item.leftPosition || "10%",
                width: item.width || "220px"
              }}
              className="absolute z-20 flex flex-col items-center bg-white p-2.5 pb-4 shadow-2xl rounded-sm border border-stone-200/80 cursor-pointer hover:shadow-2xl"
            >
              <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden mb-2 pointer-events-none">
                <img 
                  src={item.image} 
                  alt={upper(t(item.captionKey, `Fotoğraf ${item.id}`))} 
                  className="w-full h-full object-cover select-none"
                />
              </div>
              <span className="font-serif text-stone-700 text-xs tracking-wide italic select-none pointer-events-none text-center">
                {upper(t(item.captionKey, `Fotoğraf ${item.id}`))}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* 📱 MOBİL VE TABLET IZGARASI (lg altı ekranlar) */}
      <div className="relative z-20 flex lg:hidden flex-wrap items-center justify-center gap-5 max-w-[600px] px-2 py-4">
        {polaroids.map((item, index) => {
          const targetRotate = Number(item.rotate) || (index % 2 === 0 ? -4 : 5);
          return (
            <motion.div
              key={`mobile-gallery-${item.id}`}
              layoutId={`gallery-polaroid-mobile-${item.id}`}
              onClick={() => setActivePolaroid(item)}
              initial={{ y: 40, opacity: 0, rotate: targetRotate - 8 }}
              animate={
                isInView 
                  ? { y: 0, opacity: 1, rotate: targetRotate } 
                  : { y: 40, opacity: 0, rotate: targetRotate - 8 }
              }
              whileHover={{ scale: 1.05 }}
              transition={{ 
                duration: 0.7, 
                delay: (index % 6) * 0.1, 
                ease: "easeOut",
                layout: { duration: 0.25, ease: "easeOut" }
              }}
              className="flex flex-col items-center bg-white p-2 pb-3 shadow-xl rounded-sm border border-stone-200/80 w-36 sm:w-44 cursor-pointer"
            >
              <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden mb-1.5 pointer-events-none">
                <img 
                  src={item.image} 
                  alt={upper(t(item.captionKey, `Fotoğraf ${item.id}`))} 
                  className="w-full h-full object-cover select-none"
                />
              </div>
              <span className="font-serif text-stone-700 text-[10px] sm:text-xs tracking-wide italic select-none pointer-events-none text-center">
                {upper(t(item.captionKey, `Fotoğraf ${item.id}`))}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* 🔍 FOKUSLANDIRILMIŞ FOTOĞRAF MODALI (LIGHTBOX) */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {activePolaroid && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                onClick={() => setActivePolaroid(null)}
                className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
              />

              <motion.div
                layoutId={
                  polaroids.some(p => p.id === activePolaroid.id) 
                    ? `gallery-polaroid-${activePolaroid.id}` 
                    : `gallery-polaroid-mobile-${activePolaroid.id}`
                }
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center bg-white p-4 pb-6 shadow-2xl rounded-sm border border-stone-200 w-full max-w-[360px] sm:max-w-[440px] md:max-w-[520px]"
              >
                <button
                  onClick={() => setActivePolaroid(null)}
                  className="absolute -top-3 -right-3 z-20 bg-white text-stone-800 p-2 rounded-full shadow-lg hover:bg-accent hover:text-white transition-colors cursor-pointer border border-stone-200"
                  aria-label="Kapat"
                >
                  <IoCloseSharp size={20} />
                </button>

                <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden mb-4 rounded-xs">
                  <img 
                    src={activePolaroid.image} 
                    alt={upper(t(activePolaroid.captionKey, `Fotoğraf ${activePolaroid.id}`))} 
                    className="w-full h-full object-cover select-none"
                  />
                </div>

                <span className="font-serif text-stone-800 text-base md:text-lg tracking-wide italic font-medium text-center">
                  {upper(t(activePolaroid.captionKey, `Fotoğraf ${activePolaroid.id}`))}
                </span>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
};

export default Gallery;
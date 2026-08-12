import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { IoChevronForwardSharp, IoChevronBackSharp, IoStar } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../hooks/useConfig';
import { comments as defaultComments } from '../config';

const Comments = () => {
  const { t } = useTranslation();
  const { upper } = useConfig();

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  // Kitap açılma durumu
  const [isOpened, setIsOpened] = useState(false);

  // Mobil ekran tespiti
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Yorum Sayfası Yapılandırması
  const [currentPage, setCurrentPage] = useState(0);
  const commentsPerPage = isMobile ? 3 : 6;

  const totalPages = Math.ceil((defaultComments?.length || 0) / commentsPerPage);

  // Görünür olunca 1.2s bekler, sonra açılış başlar
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsOpened(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = currentPage * commentsPerPage;
  const leftComments = defaultComments?.slice(startIndex, startIndex + (isMobile ? 3 : 3)) || [];
  const rightComments = !isMobile ? (defaultComments?.slice(startIndex + 3, startIndex + 6) || []) : [];

  // Yorum Kartı
  const renderCommentCard = (comment) => (
    <div key={comment.id} className="space-y-1 py-2 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={comment.avatar}
            alt={comment.name}
            className="w-7 h-8 sm:w-9 sm:h-9 rounded-full object-cover shadow-xs"
          />
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
              {upper(comment.name)}
            </h3>
            <span className="text-[10px] text-stone-500 italic block leading-none">
              {comment.date}
            </span>
          </div>
        </div>

        <div className="flex text-amber-500 gap-0.5">
          {[...Array(5)].map((_, i) => (
            <IoStar
              key={i}
              size={12}
              className={i < comment.rating ? "fill-current" : "text-stone-300"}
            />
          ))}
        </div>
      </div>

      <p className="font-sans-serif italic text-stone-700 text-[12px] sm:text-sm leading-relaxed line-clamp-2 pt-0.5">
        "{t(comment.commentKey, comment.comment || "Harika bir lezzet deneyimiydi.")}"
      </p>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="comments"
      className="relative w-full py-2 md:py-10 px-4 contain-layout transition-colors duration-500 overflow-hidden flex flex-col items-center justify-center min-h-[650px]"
    >
      {/* 🪵 AHŞAP MASA ZEMİNE AYARI */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center scale-110"
        style={{ backgroundImage: `url('/images/wooden_bg.webp')` }}
      />
      <div className="absolute inset-0 bg-black/20 transition-colors duration-500" />

      {/* 👑 BG-PRIMARY ARKA PLANLI KART BAŞLIK */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center mb-8 md:mb-12 bg-primary px-8 py-4 shadow-xl rounded-sm flex flex-col items-center max-w-xs sm:max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold pl-[0.15em] tracking-[0.2em] text-accent uppercase leading-tight">
          {upper(t("commentsPage.title", "YORUMLAR"))}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-8 md:w-12 bg-muted"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-accent"></div>
          <div className="h-px w-8 md:w-12 bg-muted"></div>
        </div>
      </motion.div>

      {/* 📖 ANI DEFTERİ KAPSAYICISI (3D Perspektif) */}
      <div className="relative z-10 w-full flex justify-center" style={{ perspective: "1800px" }}>
        
        {/* 👑 DEFTER GÖVDESİ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: isInView ? 1 : 0,
            scale: isInView ? 1 : 0.95,
            width: isOpened ? "100%" : "425px",
            maxWidth: isOpened ? "850px" : "425px",
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            width: { duration: isOpened ? 1.2 : 0, ease: [0.25, 1, 0.5, 1] },
            maxWidth: { duration: isOpened ? 1.2 : 0, ease: [0.25, 1, 0.5, 1] },
          }}
          className="relative h-[500px] sm:h-[540px] bg-[#8b5a2b] text-stone-800 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] flex flex-row overflow-hidden select-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* 📖 CİLT ORTA DİKİŞ İZİ (Masaüstü) */}
          {isOpened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-20 bg-gradient-to-r from-black/20 via-black/35 to-black/20 pointer-events-none border-x border-stone-400/20"
            />
          )}

          {/* 👈 SOL SAYFA */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between border-r-0 md:border-r border-stone-300/80 bg-[#fdfbf7] relative rounded-xl md:rounded-r-none md:rounded-l-xl overflow-hidden shrink-0 md:shrink">
            {isOpened && (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`left-page-${currentPage}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between h-full space-y-2 pb-6"
                  >
                    {leftComments.length > 0 ? (
                      <div className="divide-y divide-stone-200/80 space-y-2">
                        {leftComments.map(renderCommentCard)}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-stone-400 italic text-xs">
                        Henüz yorum yok.
                      </div>
                    )}

                    <span className="text-[13px] text-stone-600 font-mono text-center pt-2 block border-t border-stone-200/40">
                      -{isMobile ? currentPage + 1 : currentPage * 2 + 1}-
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* 👑 SOL ALT OK */}
                {currentPage > 0 && (
                  <button
                    onClick={handlePrev}
                    className="absolute bottom-3 left-4 z-40 p-2 rounded-full bg-stone-200/90 text-stone-800 hover:bg-accent hover:text-white transition-all shadow-md cursor-pointer border border-stone-300"
                    aria-label="Önceki Sayfa"
                  >
                    <IoChevronBackSharp size={16} />
                  </button>
                )}

                {/* 👑 MOBİL SAĞ ALT OK */}
                {isMobile && currentPage < totalPages - 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute bottom-3 right-4 z-40 p-2 rounded-full bg-stone-200/90 text-stone-800 hover:bg-accent hover:text-white transition-all shadow-md cursor-pointer border border-stone-300"
                    aria-label="Sonraki Sayfa"
                  >
                    <IoChevronForwardSharp size={16} />
                  </button>
                )}
              </>
            )}
          </div>

          {/* 👉 SAĞ SAYFA */}
          {isOpened && (
            <div className="hidden md:flex w-1/2 p-6 sm:p-8 flex-col justify-between bg-[#fdfbf7] relative rounded-r-xl overflow-hidden shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-page-${currentPage}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between h-full space-y-2 pb-6"
                >
                  {rightComments.length > 0 ? (
                    <div className="divide-y divide-stone-200/80 space-y-2">
                      {rightComments.map(renderCommentCard)}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-stone-400 italic text-xs">
                      ...
                    </div>
                  )}

                  <span className="text-[13px] text-stone-600 font-mono text-center pt-2 block border-t border-stone-200/40">
                    -{currentPage * 2 + 2}-
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* 👑 MASAÜSTÜ SAĞ ALT OK */}
              {currentPage < totalPages - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute bottom-3 right-4 z-40 p-2 rounded-full bg-stone-200/90 text-stone-800 hover:bg-accent hover:text-white transition-all shadow-md cursor-pointer border border-stone-300"
                  aria-label="Sonraki Sayfa"
                >
                  <IoChevronForwardSharp size={16} />
                </button>
              )}
            </div>
          )}

          {/* 📖 AHŞAP / DERİ KAPAK */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isOpened ? -180 : 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            style={{ 
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              backgroundImage: `url('/images/leather.webp')`
            }}
            className="absolute -inset-0.5 w-[calc(100%+2px)] bg-cover bg-center rounded-xl shadow-2xl z-50 pointer-events-none flex items-center justify-center p-6"
          >
            {/* KAPAK İÇ TASARIMI */}
            <div 
              className="w-full h-full rounded-lg flex flex-col items-center justify-center p-6 text-center shadow-inner relative overflow-hidden bg-cover bg-center"
              style={{ 
                backgroundImage: `url('/images/leather.jpg')`,
                backfaceVisibility: "hidden", 
                WebkitBackfaceVisibility: "hidden" 
              }}
            >
              {/* DERİ ÜZERİ KOYULAŞTIRMA KATMANI */}
              <div className="absolute inset-0 bg-black/35 rounded-lg pointer-events-none" />

              <h3 className="relative z-10 font-serif text-xl sm:text-2xl font-extrabold tracking-[0.15em] text-amber-100 uppercase mb-2 drop-shadow-md">
                {upper(t("commentsPage.bookTitle", "GÖRÜŞLERİNİZ"))}
              </h3>
              <p className="relative z-10 text-amber-200/80 font-sans-serif italic text-xs sm:text-sm drop-shadow-xs">
                {t("commentsPage.bookSubtitle", "Değerli misafirlerimizin kaleminden...")}
              </p>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default Comments;
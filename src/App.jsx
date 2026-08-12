import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Bileşenler
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import InvestmentCalculator from "./components/InvestmentCalculator";
import Listings from "./pages/Listings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Comments from "./components/Comments";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FAQ from "./components/FAQ";

function App() {
  const { t, i18n } = useTranslation();

  // 👑 Dil değiştiğinde veya sayfa yüklendiğinde sekme başlığını günceller
  useEffect(() => {
    document.title = t("webTitle", "Lüks Gayrimenkul & Yatırım");
  }, [t, i18n.language]);

  return (
    <div className="min-h-screen bg-neu-base text-slate-800 flex flex-col justify-between overflow-x-hidden">
      {/* Yenilemelerde veya bölüm geçişlerinde yukarı odaklama */}
      <ScrollToTop />

      {/* Sabit Ust Menü (İçindeki linkler #hero, #listings vb. id'lere yönlenecek) */}
      <Navbar />

      {/* 👑 ONE-PAGE BÖLÜM AKIŞI */}
      <main className="flex-grow space-y-12 sm:space-y-20">
        
        {/* 1. HERO BÖLÜMÜ */}
        <section id="hero">
          <Hero />
        </section>

        {/* 4. TÜM İLANLAR / ARAMA VE FİLTRELEME */}
        <section id="listings">
          <Listings />
        </section>

        {/* 2. NEUMORPHIC İNTERAKTİF HESAPLAYICI WIDGET */}
        <section id="calculator" className="px-4">
          <InvestmentCalculator />
        </section>

        

        {/* 5. HAKKIMIZDA & BİZ KİMİZ */}
        <section id="about">
          <About />
        </section>

        {/* 6. BLOG & HABERLER */}
        <section id="faq">
          <FAQ />
        </section>

        {/* 8. İLETİŞİM & LOKASYON */}
        <section id="contact">
          <Contact />
        </section>

      </main>

      {/* Alt Bilgi */}
      <Footer />
    </div>
  );
}

export default App;
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { useConfig } from "../hooks/useConfig";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import config from "../config";

const Navbar = () => {
  const { upper } = useConfig();
  const { t, i18n } = useTranslation();

  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // MANUEL TIKLAMA İLE KAYDIRMA YAPILIRKEN OBSERVER'I DONDURAN KİLİT
  const isManualScrolling = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const phoneNumber = config?.contact?.phone || "+90 555 123 45 67";
  const phoneTelLink = `tel:${phoneNumber.replace(/\s+/g, "")}`;

  const handleNav = useCallback(() => {
    setNav((prev) => !prev);
  }, []);

  // SCROLL DURUMU TAKİBİ
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ONE-PAGE BÖLÜM (SECTION) İD'LERİ
  const navItems = useMemo(
    () => [
      { id: "hero", label: t("common.home", "Anasayfa") },
      { id: "listings", label: t("common.listings", "İlanlar") },
      { id: "calculator", label: t("common.calculator", "Hesaplayıcı") },
      { id: "about", label: t("common.about", "Hakkımızda") },
      { id: "faq", label: t("common.faq", "SSS") },
      { id: "contact", label: t("common.contact", "İletişim") },
    ],
    [t, i18n.language]
  );

  // EKRANDAKİ AKTİF BÖLÜMÜ TESPİT ETME (INTERSECTION OBSERVER)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  // TIKLAMADA TAM KONTROLLÜ YUMUŞAK KAYDIRMA VE KİLİT MEKANİZMASI
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setNav(false);

    setActiveSection(id);
    isManualScrolling.current = true;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);
  };

  return (
    <>
      {/* 👑 NEUMORPHIC NAVBAR CONTAINER */}
      <header
        className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-neu-base shadow-neu-flat border-b border-white/20"
            : "bg-neu-base/90 backdrop-blur-md"
        }`}
      >
        {/* DİL BUTONU (GÖMÜLÜ SOFT UI KAPSAYICI) */}
        <div className="absolute lg:right-8 lg:left-auto left-6 top-1/2 -translate-y-1/2 z-[160] flex items-center p-1.5 rounded-2xl bg-neu-base shadow-neu-pressed">
          <LanguageSwitcher />
        </div>

        {/* ANA KAPSAYICI */}
        <div className="relative flex justify-end lg:justify-between items-center h-full pl-4 pr-6 lg:pl-8 lg:pr-24 max-w-[1240px] mx-auto text-neu-slate-primary">
          
          {/* MASAÜSTÜ / ANA LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 xl:-translate-x-15 flex flex-col lg:flex-1 lg:justify-start lg:items-start justify-center items-center">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "hero")}
              className="cursor-pointer focus:outline-none p-2 rounded-2xl bg-gradient-to-r from-grad-from to-grad-to shadow-neu-flat active:shadow-neu-pressed transition-all duration-200"
              aria-label={config?.contact?.name || "Logo"}
            >
              <div 
                className="w-28 h-10 lg:w-36 lg:h-11 bg-contain bg-no-repeat bg-center select-none"
                style={{ backgroundImage: 'var(--logo-url)' }}
              />
            </a>
          </div>

          {/* MASAÜSTÜ MENÜ LİNKLERİ & TELEFON BUTONU */}
          <div className="hidden lg:flex items-center space-x-6 mx-auto">
            {/* Soft UI Tab Kapsayıcı */}
            <ul className="flex items-center gap-1 p-1.5 rounded-2xl bg-neu-base shadow-neu-pressed relative">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-colors duration-200 block outline-none z-10 cursor-pointer ${
                        isActive
                          ? "text-white font-extrabold"
                          : "text-neu-slate-secondary hover:text-accent"
                      }`}
                    >
                      {upper(item.label)}
                    </a>

                    {/* 👑 TEMAYA BAĞLI DİNAMİK KAYAN SLIDER GÖSTERGESİ */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabSlider"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-grad-from to-grad-to rounded-xl shadow-neu-flat-sm z-0"
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* 📞 DİNAMİK TEMALI CANLI TELEFON BUTONU */}
            <a
              href={phoneTelLink}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-grad-from to-grad-to text-white shadow-neu-flat active:shadow-neu-pressed hover:scale-105 transition-all duration-300 text-xs tracking-wider font-extrabold outline-none"
            >
              <IoCallOutline size={16} />
              <span>{phoneNumber}</span>
            </a>
          </div>

          {/* MOBİL HAMBURGER İKONU */}
          <div className="flex lg:hidden justify-end items-center z-[150]">
            <button 
              onClick={handleNav} 
              type="button"
              className="p-2.5 rounded-2xl bg-neu-base shadow-neu-flat active:shadow-neu-pressed text-neu-slate-primary outline-none cursor-pointer"
            >
              {nav ? (
                <AiOutlineClose size={20} className="text-accent" />
              ) : (
                <AiOutlineMenu size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBİL MENÜ KARARTMA (BACKDROP) */}
      {nav && (
        <div
          onClick={handleNav}
          className="fixed inset-0 w-full h-full bg-black/40 backdrop-blur-xs z-[140] transition-all duration-300"
        />
      )}

      {/* MOBİL MENÜ ÇEKMECESİ */}
      <aside
        className={
          nav
            ? "fixed left-0 top-0 w-[85%] max-w-[360px] h-screen bg-neu-base text-neu-slate-primary ease-in-out duration-500 z-[150] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            : "fixed -left-full top-0 h-screen w-0 p-6 bg-neu-base ease-in-out duration-500 z-[150]"
        }
      >
        <div>
          {/* MOBİL LOGO (DÜZELTİLDİ) */}
          <div className="mb-8 select-none">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "hero")}
              className="cursor-pointer inline-block p-2 rounded-2xl bg-gradient-to-r from-grad-from to-grad-to shadow-neu-flat"
            >
              <div 
                className="w-32 h-12 bg-contain bg-no-repeat bg-center select-none"
                style={{ backgroundImage: 'var(--logo-url)' }}
              />
            </a>
          </div>

          {/* LİNKLER */}
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`p-3.5 rounded-2xl block w-full text-left font-bold text-xs tracking-widest transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-grad-from to-grad-to text-white shadow-neu-flat-sm"
                      : "bg-neu-base text-neu-slate-secondary shadow-neu-pressed hover:text-accent"
                  }`}
                >
                  {upper(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 📞 MOBİL TELEFON BUTONU */}
        <div className="pt-6 mt-6 border-t border-white/10">
          <a
            href={phoneTelLink}
            onClick={() => setNav(false)}
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-gradient-to-r from-grad-from to-grad-to text-white font-extrabold text-xs tracking-widest transition-all duration-300 shadow-neu-flat active:shadow-neu-pressed"
          >
            <IoCallOutline size={18} />
            <span>{phoneNumber}</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default React.memo(Navbar);
import React from "react";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useConfig } from "../hooks/useConfig";
import configData from "../config";

const Footer = () => {
  const { t } = useTranslation();
  const { config: hookConfig, upper } = useConfig();

  const activeConfig = hookConfig || configData;
  const siteName = activeConfig?.siteName || "Prestige Gayrimenkul";

  // 👑 ONE-PAGE MİMARİSİNE UYGUN DİKEY BÖLÜM LİNKLERİ
  const quickLinks = [
    { id: "hero", key: "common.home", defaultLabel: "Anasayfa" },
    { id: "listings", key: "common.listings", defaultLabel: "İlanlar" },
    { id: "calculator", key: "common.calculator", defaultLabel: "Hesaplayıcı" },
    { id: "about", key: "common.about", defaultLabel: "Hakkımızda" },
    { id: "faq", key: "common.faq", defaultLabel: "S.S.S." },
    { id: "contact", key: "common.contact", defaultLabel: "İletişim" },
  ];

  // Yumuşak kaydırma fonksiyonu
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-neu-base text-neu-slate-primary border-t border-white/20 relative z-20">
      
      {/* 👑 ÜST AKIŞ ALANI (MAIN FOOTER) */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        
        {/* 1. KOLON: BRAND & HAKKIMIZDA BİLGİSİ */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-grad-from to-grad-to uppercase">
            {upper ? upper(siteName) : siteName.toUpperCase()}
          </h3>
          <p className="text-xs sm:text-sm text-neu-slate-secondary font-semibold leading-relaxed max-w-xs">
            {t(
              "footer.tagline",
              "Lüks gayrimenkul ve güvenilir yatırım çözümlerinde ayrıcalıklı adresiniz."
            )}
          </p>

          {/* 👑 SOSYAL MEDYA İKONLARI (NEUMORPHIC BUTONLAR) */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={activeConfig?.contact?.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-2xl bg-neu-base shadow-neu-flat active:shadow-neu-pressed text-neu-slate-primary hover:text-accent flex items-center justify-center transition-all cursor-pointer border border-white/20"
              aria-label="Instagram"
            >
              <IoLogoInstagram size={18} />
            </a>
            <a
              href={activeConfig?.contact?.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-2xl bg-neu-base shadow-neu-flat active:shadow-neu-pressed text-neu-slate-primary hover:text-accent flex items-center justify-center transition-all cursor-pointer border border-white/20"
              aria-label="Facebook"
            >
              <IoLogoFacebook size={18} />
            </a>
          </div>
        </div>

        {/* 2. KOLON: HIZLI LİNKLER (ONE-PAGE BÖLÜM YÖNLENDİRMELERİ) */}
        <div className="space-y-4">
          <h4 className="font-serif text-xs font-black uppercase tracking-widest text-accent border-b border-white/10 pb-2 inline-block">
            {upper ? upper(t("footer.quickLinks", "Hızlı Bağlantılar")) : "HIZLI BAĞLANTILAR"}
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="text-neu-slate-secondary hover:text-accent font-bold transition-colors flex items-center gap-2 cursor-pointer uppercase tracking-wider text-[11px] sm:text-xs text-left"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0"></span>
                  {upper
                    ? upper(t(link.key, link.defaultLabel))
                    : t(link.key, link.defaultLabel).toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. KOLON: ÇALIŞMA SAATLERİ */}
        <div className="space-y-4">
          <h4 className="font-serif text-xs font-black uppercase tracking-widest text-accent border-b border-white/10 pb-2 inline-block">
            {upper ? upper(t("common.working_hours", "Çalışma Saatleri")) : "ÇALIŞMA SAATLERİ"}
          </h4>
          <div className="p-4 rounded-2xl bg-neu-base shadow-neu-pressed space-y-2 text-xs sm:text-sm text-neu-slate-secondary">
            <p className="font-bold text-neu-slate-primary">
              {t("contact.workingdays", "Pazartesi - Cumartesi")}
            </p>
            <p className="text-accent font-extrabold text-sm">
              {activeConfig?.contact?.workingHours?.hours || "09:00 - 19:00"}
            </p>
          </div>
        </div>

        {/* 4. KOLON: İLETİŞİM İPUCU */}
        <div className="space-y-4">
          <h4 className="font-serif text-xs font-black uppercase tracking-widest text-accent border-b border-white/10 pb-2 inline-block">
            {upper ? upper(t("common.contact_us", "İletişim")) : "İLETİŞİM"}
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm text-neu-slate-secondary font-bold">
            <li className="flex items-start gap-2.5">
              <IoLocationOutline size={18} className="text-accent shrink-0 mt-0.5" />
              <span>
                {activeConfig?.contact?.address || "Atatürk Cad. Muratpaşa / Antalya"}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <IoCallOutline size={18} className="text-accent shrink-0" />
              <a
                href={`tel:${activeConfig?.contact?.phone || "+902421234567"}`}
                className="hover:text-accent transition-colors font-mono"
              >
                {activeConfig?.contact?.phone || "+90 (242) 123 45 67"}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <IoMailOutline size={18} className="text-accent shrink-0" />
              <a
                href={`mailto:${activeConfig?.contact?.email || "info@example.com"}`}
                className="hover:text-accent transition-colors"
              >
                {activeConfig?.contact?.email || "info@prestigegayrimenkul.com"}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* 👑 ALT ŞERİT (COPYRIGHT & BRANDING) */}
      <div className="py-6 px-6 text-center text-xs text-neu-slate-secondary bg-neu-base shadow-neu-pressed border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
          <p>
            © {new Date().getFullYear()} {siteName}. {t("common.allrightsreserved")}
          </p>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider font-extrabold text-neu-slate-secondary/70">
            <a href="#hero" onClick={(e) => scrollToSection(e, "hero")} className="hover:text-accent transition-colors">
              {upper(t("common.privacypolicy"))}
            </a>
            <span>•</span>
            <a href="#hero" onClick={(e) => scrollToSection(e, "hero")} className="hover:text-accent transition-colors">
              {upper(t("common.termsofuse"))}
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiShield, FiKey, FiCheckCircle, FiTrendingUp } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useConfig } from "../hooks/useConfig";
import { aboutConfig } from "../config";

const About = () => {
  const { t } = useTranslation();
  const { upper } = useConfig();

  // İkon Yönlendirici (Dinamik Temalı)
  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case "key":
        return <FiKey className="text-accent text-2xl" />;
      case "shield":
        return <FiShield className="text-accent text-2xl" />;
      case "award":
        return <FiAward className="text-accent text-2xl" />;
      default:
        return <FiCheckCircle className="text-accent text-2xl" />;
    }
  };

  return (
    <div className="w-full bg-neu-base text-neu-slate-primary py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* 👑 BÖLÜM 1: HERO / BAŞLIK KISMI */}
      <div className="max-w-5xl mx-auto text-center mb-16 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neu-base shadow-neu-pressed text-accent text-xs uppercase font-black tracking-[0.25em] mb-4">
            <span>{upper(t("about.overline", "Kurumsal Ayrıcalık"))}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-neu-slate-primary tracking-wide mb-6">
            {t("about.titleMain", "Lüks Yaşamı")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-grad-from to-grad-to">
              {t("about.titleHighlight", "Yeniden Tanımlıyoruz")}
            </span>
          </h1>

          <p className="text-neu-slate-secondary font-sans text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            {t(
              "about.description",
              "15 yılı aşkın tecrübemizle, Türkiye'nin en seçkin lokasyonlarında sadece bir gayrimenkul değil; hayallerinizdeki yaşam tarzını sunuyoruz."
            )}
          </p>
        </motion.div>
      </div>

      {/* 👑 BÖLÜM 2: NEUMORPHIC DEKORATİF İSTATİSTİK KARTLARI */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {aboutConfig.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-neu-base p-6 rounded-3xl text-center shadow-neu-flat flex flex-col items-center justify-between border border-white/20 relative group"
            >
              {/* DEKORATİF NEUMORPHIC ROZET/ÇERÇEVE */}
              <div className="w-20 h-20 rounded-full bg-neu-base shadow-neu-pressed flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-neu-base shadow-neu-flat flex items-center justify-center">
                  <FiTrendingUp className="text-accent text-xl" />
                </div>
              </div>

              {/* RAKAM VE ETİKET */}
              <div className="space-y-1">
                <span className="font-serif text-3xl sm:text-4xl font-black text-neu-slate-primary block">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-neu-slate-secondary font-bold tracking-wide block">
                  {t(stat.labelKey)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 👑 BÖLÜM 3: MİSYON & ŞİRKET HİKAYESİ */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-neu-base p-8 sm:p-12 rounded-3xl shadow-neu-flat border border-white/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent block">
              {upper(t("about.storyOverline", "Hakkımızda"))}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neu-slate-primary">
              {t("about.storyTitle", "Vizyonumuz ve Hikayemiz")}
            </h2>
            <p className="text-neu-slate-primary text-sm sm:text-base leading-relaxed">
              {t("about.storyDesc1")}
            </p>
            <p className="text-neu-slate-secondary text-sm sm:text-base leading-relaxed">
              {t("about.storyDesc2")}
            </p>
          </div>

          {/* Gömülü Çerçeveli Resim */}
          <div className="lg:col-span-5 p-3 rounded-3xl bg-neu-base shadow-neu-pressed h-64 sm:h-80 overflow-hidden">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-neu-flat relative">
              <img
                src="/images/hero.webp"
                alt="Luxury Real Estate"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 👑 BÖLÜM 4: AVANTAJLAR VE DEĞERLER */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {aboutConfig.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-neu-base p-8 rounded-3xl shadow-neu-flat hover:shadow-neu-flat-sm transition-all duration-300 flex flex-col justify-between group border border-white/20"
            >
              <div>
                {/* Gömülü Soft İkon Kapsayıcısı */}
                <div className="w-14 h-14 rounded-2xl bg-neu-base shadow-neu-pressed flex items-center justify-center mb-6">
                  {getFeatureIcon(feature.icon)}
                </div>

                <h3 className="font-serif text-xl font-bold text-neu-slate-primary mb-3 group-hover:text-accent transition-colors">
                  {t(feature.titleKey)}
                </h3>

                <p className="text-neu-slate-secondary text-xs sm:text-sm leading-relaxed">
                  {t(feature.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;
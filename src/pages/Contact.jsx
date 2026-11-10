import React, { useState } from "react";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoCallOutline,
  IoMailOutline,
  IoPaperPlaneOutline,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useConfig } from "../hooks/useConfig";
import { submitForm } from "../lib/submitForm";

const Contact = () => {
  const { t } = useTranslation();
  const { currentConfig: config, upper } = useConfig(); // the hook exports currentConfig, so config was undefined before

  // Form State'leri
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mailto | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      setStatus(await submitForm(formData, { email: config?.contact?.email, subject: t("contact.title") }));
    } catch {
      setStatus("error");
    }
  };

  const mapAddress = encodeURIComponent(
    config?.contact?.address || "Antalya, Turkey"
  );
  const googleMapsUrl = `https://maps.google.com/maps?q=${mapAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      id="contact"
      className="w-full bg-neu-base text-neu-slate-primary py-16 pt-20 px-4 md:px-8 relative z-10"
    >
      {/* 👑 BÖLÜM 1: BAŞLIK ALANI */}
      <div className="max-w-5xl mx-auto text-center mb-12 pt-4">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neu-base shadow-neu-pressed text-accent text-xs font-black uppercase tracking-[0.25em] mb-4">
            <span>{upper(t("contact.overline", "Bize Ulaşın"))}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-neu-slate-primary tracking-wide mb-4">
            {t("contact.titleMain", "İletişime")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-grad-from to-grad-to">
              {t("contact.titleHighlight", "Geçin")}
            </span>
          </h1>

          <p className="text-neu-slate-secondary font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t(
              "contact.tagline",
              "Hayalinizdeki lüks mülkü bulmak veya portföyünüzü değerlendirmek için uzman ekibimizle tanışın."
            )}
          </p>
        </div>
      </div>

      {/* 👑 ANA İÇERİK (SOL: BİLGİLER + FORM, SAĞ: HARİTA) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* 👈 SOL KOLON (İletişim Kartları + Form) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          
          {/* 👑 İLETİŞİM BİLGİLERİ KARTLARI (KABARTMALI NEUMORPHIC) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ADRES */}
            <div className="bg-neu-base p-5 rounded-3xl flex flex-col items-center text-center shadow-neu-flat border border-white/20 hover:shadow-neu-flat-sm transition-all">
              <div className="p-3.5 bg-neu-base rounded-2xl shadow-neu-pressed text-accent mb-3">
                <IoLocationOutline size={22} />
              </div>
              <p className="text-neu-slate-primary text-xs sm:text-sm font-semibold leading-relaxed">
                {config?.contact?.address ||
                  "Atatürk Cad. No:123, Muratpaşa / Antalya"}
              </p>
            </div>

            {/* ÇALIŞMA SAATLERİ */}
            <div className="bg-neu-base p-5 rounded-3xl flex flex-col items-center text-center shadow-neu-flat border border-white/20 hover:shadow-neu-flat-sm transition-all">
              <div className="p-3.5 bg-neu-base rounded-2xl shadow-neu-pressed text-accent mb-3">
                <IoTimeOutline size={22} />
              </div>
              <p className="text-neu-slate-primary text-xs sm:text-sm font-semibold leading-relaxed">
                {t("contact.workingdays", "Pazartesi - Cumartesi")}
                <br />
                <span className="font-extrabold text-accent">
                  {config?.contact?.workingHours?.hours || "09:00 - 19:00"}
                </span>
              </p>
            </div>

            {/* TELEFON */}
            <div className="bg-neu-base p-5 rounded-3xl flex flex-col items-center text-center shadow-neu-flat border border-white/20 hover:shadow-neu-flat-sm transition-all">
              <div className="p-3.5 bg-neu-base rounded-2xl shadow-neu-pressed text-accent mb-3">
                <IoCallOutline size={22} />
              </div>
              <a
                href={`tel:${config?.contact?.phone || "+902421234567"}`}
                className="text-neu-slate-primary text-xs sm:text-sm hover:text-accent transition-colors font-bold font-mono"
              >
                {config?.contact?.phone || "+90 (242) 123 45 67"}
              </a>
            </div>
          </div>

          {/* 📝 İLETİŞİM FORMU (NEUMORPHIC INPUT'LAR) */}
          <div className="bg-neu-base rounded-3xl p-6 sm:p-8 shadow-neu-flat border border-white/20 relative overflow-hidden">
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-neu-slate-primary mb-6 flex items-center gap-2">
              <IoMailOutline className="text-accent" />
              {upper(t("common.contact_us", "Bize Mesaj Gönderin"))}
            </h3>

            {status === "sent" || status === "mailto" ? (
              <div className="bg-neu-base p-4 rounded-2xl shadow-neu-pressed text-emerald-500 font-bold text-sm my-8 text-center">
                🎉{" "}
                {t(status === "sent" ? "contact.successMessage" : "contact.mailtoMessage")}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* AD SOYAD */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-neu-slate-secondary uppercase tracking-widest mb-1.5 pl-1">
                      {t("common.name_surname", "Adınız Soyadınız")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ahmet Yılmaz"
                      className="w-full bg-neu-base shadow-neu-pressed rounded-2xl px-4 py-3 text-neu-slate-primary placeholder-neu-slate-secondary/60 text-sm focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all font-semibold"
                    />
                  </div>

                  {/* E-POSTA */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-neu-slate-secondary uppercase tracking-widest mb-1.5 pl-1">
                      {t("common.email", "E-Posta Adresiniz")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ahmet@example.com"
                      className="w-full bg-neu-base shadow-neu-pressed rounded-2xl px-4 py-3 text-neu-slate-primary placeholder-neu-slate-secondary/60 text-sm focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* TELEFON */}
                <div>
                  <label className="block text-[10px] font-extrabold text-neu-slate-secondary uppercase tracking-widest mb-1.5 pl-1">
                    {t("common.phone_number", "Telefon Numaranız")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0555 123 45 67"
                    className="w-full bg-neu-base shadow-neu-pressed rounded-2xl px-4 py-3 text-neu-slate-primary placeholder-neu-slate-secondary/60 text-sm focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all font-semibold"
                  />
                </div>

                {/* MESAJ */}
                <div>
                  <label className="block text-[10px] font-extrabold text-neu-slate-secondary uppercase tracking-widest mb-1.5 pl-1">
                    {t("common.message", "Mesajınız")} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      t("common.your_message", "Mesajınızı yazın") + "..."
                    }
                    className="w-full bg-neu-base shadow-neu-pressed rounded-2xl px-4 py-3 text-neu-slate-primary placeholder-neu-slate-secondary/60 text-sm focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all resize-none font-semibold"
                  ></textarea>
                </div>

                {/* GÖNDER BUTONU */}
                {status === "error" && (
                  <p role="alert" className="text-red-500 text-sm font-medium">{t("contact.errorMessage")}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-gradient-to-r from-grad-from to-grad-to text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-neu-flat active:shadow-neu-pressed transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-xs sm:text-sm mt-2 hover:scale-[1.01]"
                >
                  <IoPaperPlaneOutline size={18} />
                  {t("common.send", "Mesaj Gönder")}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 👉 SAĞ KOLON (Google Harita Konumu - Neumorphic Çerçeveli) */}
        <div className="lg:col-span-5 h-[350px] lg:h-auto min-h-[350px] bg-neu-base rounded-3xl p-3 shadow-neu-pressed border border-white/20 relative overflow-hidden">
          <iframe
            title="Google Maps"
            src={googleMapsUrl}
            className="w-full h-full border-0 rounded-2xl shadow-neu-flat opacity-90 hover:opacity-100 transition-opacity duration-300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
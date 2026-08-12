import React, { useState } from "react";
import { FiTrendingUp, FiDollarSign, FiPercent } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useConfig } from "../hooks/useConfig";

const InvestmentCalculator = () => {
  const { t, i18n } = useTranslation();
  const { upper } = useConfig();

  const [propertyPrice, setPropertyPrice] = useState(5000000); // 5M ₺
  const [downPaymentPercent, setDownPaymentPercent] = useState(25); // %25 Peşinat
  const [loanTermYears, setLoanTermYears] = useState(10); // 10 Yıl
  const [interestRate] = useState(2.15); // %2.15 Aylık Faiz
  const [isRentalGuaranteed, setIsRentalGuaranteed] = useState(true);

  // Hesaplama Mantığı
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  
  const monthlyRate = interestRate / 100;
  const totalMonths = loanTermYears * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount / totalMonths;

  const estimatedAnnualReturn = Math.round((propertyPrice * 0.18) / 12);

  // Aktif dile göre para formatı seçimi (tr-TR / en-US)
  const currencyLocale = i18n.language === "tr" ? "tr-TR" : "en-US";
  const currencySymbol = i18n.language === "tr" ? "₺" : "$";

  // Detaylı Finans Planı Butonu Tıklaması -> İletişim Bölümüne Kaydırma
  const handleConsultationClick = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="w-full max-w-5xl mx-auto my-8 pb-12 pt-24">
      {/* BAŞLIK */}
      <div className="mb-8 text-center sm:text-left">
        <span className="text-xs font-extrabold tracking-widest text-accent mb-1 block">
          {upper(t("calculator.overline", "Akıllı Akış & Finans"))}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-neu-slate-primary">
          {t("calculator.title", "Yatırım & Kredi Simülatörü")}
        </h2>
      </div>

      {/* 👑 NEUMORPHIC DÜZEN (GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SOL KOLON: KONTROLLER VE SLIDER'LAR (7 Kolon) */}
        <div className="lg:col-span-7 bg-neu-base p-6 sm:p-8 rounded-3xl shadow-neu-flat space-y-6">
          
          {/* 1. MÜLK TUTARI SLIDER */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold tracking-wider text-neu-slate-secondary flex items-center gap-2">
                <FiDollarSign className="text-accent" /> {upper(t("calculator.labels.propertyValue", "Mülk Değeri"))}
              </label>
              <span className="text-sm font-black text-neu-slate-primary bg-neu-base px-3 py-1 rounded-xl shadow-neu-pressed">
                {propertyPrice.toLocaleString(currencyLocale)} {currencySymbol}
              </span>
            </div>
            
            <div className="relative w-full h-4 bg-neu-base rounded-full shadow-neu-pressed flex items-center px-1">
              <input
                type="range"
                min="1000000"
                max="20000000"
                step="250000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className="absolute top-1 left-1 bottom-1 bg-gradient-to-r from-grad-from to-grad-to rounded-full pointer-events-none transition-all duration-150"
                style={{
                  width: `${((propertyPrice - 1000000) / (20000000 - 1000000)) * 98}%`,
                }}
              />
            </div>
          </div>

          {/* 2. PEŞİNAT ORANI SLIDER */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold tracking-wider text-neu-slate-secondary flex items-center gap-2">
                <FiPercent className="text-accent" /> {upper(t("calculator.labels.downPaymentRatio", "Peşinat Oranı"))}
              </label>
              <span className="text-sm font-black text-neu-slate-primary bg-neu-base px-3 py-1 rounded-xl shadow-neu-pressed">
                %{downPaymentPercent} ({downPaymentAmount.toLocaleString(currencyLocale)} {currencySymbol})
              </span>
            </div>
            
            <div className="relative w-full h-4 bg-neu-base rounded-full shadow-neu-pressed flex items-center px-1">
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className="absolute top-1 left-1 bottom-1 bg-gradient-to-r from-grad-from to-grad-to rounded-full pointer-events-none transition-all duration-150"
                style={{
                  width: `${((downPaymentPercent - 10) / (80 - 10)) * 98}%`,
                }}
              />
            </div>
          </div>

          {/* 3. VADE VEYA KİRA GARANTİSİ SWITCH */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Vade Seçimi */}
            <div>
              <label className="text-xs font-bold tracking-wider text-neu-slate-secondary block mb-2">
                {upper(t("calculator.labels.loanTerm", "Kredi Vadesi"))}
              </label>
              <div className="flex items-center gap-2 bg-neu-base p-1.5 rounded-2xl shadow-neu-pressed">
                {[5, 10, 15].map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setLoanTermYears(year)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                      loanTermYears === year
                        ? "bg-gradient-to-r from-grad-from to-grad-to text-white shadow-neu-flat-sm"
                        : "text-neu-slate-secondary hover:text-accent"
                    }`}
                  >
                    {year} {upper(t("calculator.labels.years", "Yıl"))}
                  </button>
                ))}
              </div>
            </div>

            {/* Soft UI Toggle Switch */}
            <div>
              <label className="text-xs font-bold tracking-wider text-neu-slate-secondary block mb-2">
                {upper(t("calculator.labels.rentalGuarantee", "Kira Garantili Sistem"))}
              </label>
              <div className="flex items-center justify-between bg-neu-base p-2 rounded-2xl shadow-neu-pressed h-[42px]">
                <span className="text-xs font-bold text-neu-slate-primary pl-2">
                  {isRentalGuaranteed
                    ? upper(t("calculator.labels.active", "Aktif"))
                    : upper(t("calculator.labels.passive", "Pasif"))}
                </span>
                
                {/* Switch Düğmesi */}
                <button
                  type="button"
                  onClick={() => setIsRentalGuaranteed(!isRentalGuaranteed)}
                  className={`w-12 h-6 rounded-full p-1 transition-all duration-300 flex items-center cursor-pointer ${
                    isRentalGuaranteed
                      ? "bg-gradient-to-r from-grad-from to-grad-to shadow-neu-flat-sm"
                      : "bg-neu-base shadow-neu-pressed-sm"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                      isRentalGuaranteed ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SAĞ KOLON: GRAFİK VE ÖZET (5 Kolon) */}
        <div className="lg:col-span-5 bg-neu-base p-6 sm:p-8 rounded-3xl shadow-neu-flat flex flex-col justify-between items-center text-center">
          
          <div className="w-full">
            <span className="text-xs font-extrabold tracking-widest text-neu-slate-secondary block mb-4">
              {upper(t("calculator.summaryTitle", "Tahmini Ödeme Özeti"))}
            </span>

            {/* 👑 DİNAMİK TEMALI DAİRESEL (DONUT) GRAFİK */}
            <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center rounded-full shadow-neu-flat">
              <div
                className="w-36 h-36 rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                  background: `conic-gradient(var(--color-accent-main) ${downPaymentPercent}%, var(--color-surface) ${downPaymentPercent}% 100%)`,
                }}
              >
                <div className="w-28 h-28 bg-neu-base rounded-full shadow-neu-flat flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold text-neu-slate-secondary tracking-wider">
                    {upper(t("calculator.labels.downPaymentBadge", "Peşinat"))}
                  </span>
                  <span className="text-xl font-black text-neu-slate-primary">
                    %{downPaymentPercent}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* İNFO KARTLARI */}
          <div className="w-full space-y-3">
            
            {/* Taksit Tutarı */}
            <div className="p-4 rounded-2xl bg-neu-base shadow-neu-pressed flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold text-neu-slate-secondary block">
                  {upper(t("calculator.summary.monthlyInstallment", "Aylık Kredi Taksidi"))}
                </span>
                <span className="text-xs font-semibold text-neu-slate-secondary">
                  {loanTermYears * 12} {t("calculator.summary.monthsTerm", "Ay Vade")}
                </span>
              </div>
              <span className="text-lg font-black text-accent">
                {Math.round(monthlyPayment).toLocaleString(currencyLocale)} {currencySymbol}
              </span>
            </div>

            {/* Yıllık Değer Artış Tahmini */}
            <div className="p-4 rounded-2xl bg-neu-base shadow-neu-flat-sm flex items-center justify-between border border-white/20">
              <div className="text-left flex items-center gap-2">
                <FiTrendingUp className="text-emerald-500 text-lg shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-neu-slate-secondary block">
                    {upper(t("calculator.summary.avgAppreciation", "Aylık Ort. Değer Artışı"))}
                  </span>
                  <span className="text-xs font-semibold text-emerald-500">
                    {t("calculator.summary.regionalAnalysis", "Bölgesel Analiz")}
                  </span>
                </div>
              </div>
              <span className="text-base font-bold text-neu-slate-primary">
                +{estimatedAnnualReturn.toLocaleString(currencyLocale)} {currencySymbol}
              </span>
            </div>

          </div>

          {/* İLETİŞİM BUTONU */}
          <button
            type="button"
            onClick={handleConsultationClick}
            className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-grad-from to-grad-to text-white font-bold text-xs tracking-widest shadow-neu-flat active:shadow-neu-pressed transition-all duration-200 hover:scale-[1.02] cursor-pointer"
          >
            {upper(t("calculator.buttonText", "Detaylı Finans Planı Al"))}
          </button>

        </div>

      </div>
    </section>
  );
};

export default InvestmentCalculator;
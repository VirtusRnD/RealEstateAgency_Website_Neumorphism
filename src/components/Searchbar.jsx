import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiMapPin, FiHome, FiDollarSign, FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { searchbarConfig } from '../config';
import { useConfig } from '../hooks/useConfig';

const CustomSelect = ({ icon: Icon, label, value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className={`relative w-full ${isOpen ? 'z-[100]' : 'z-20'}`}>
      {/* Tıklanabilir Soft UI Seçim Alanı */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'bg-neu-base shadow-neu-pressed border border-accent/30'
            : 'bg-neu-base shadow-neu-pressed hover:shadow-neu-pressed-sm'
        }`}
      >
        <Icon className="text-lg shrink-0 text-accent" />
        <div className="flex flex-col w-full text-left pr-2 overflow-hidden">
          <label className="text-[10px] font-extrabold tracking-widest text-neu-slate-secondary cursor-pointer">
            {label}
          </label>
          <span className="text-xs sm:text-sm font-bold text-neu-slate-primary truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <FiChevronDown
          className={`shrink-0 text-sm transition-transform duration-300 text-neu-slate-secondary ${
            isOpen ? 'rotate-180 text-accent' : ''
          }`}
        />
      </div>

      {/* Neumorphic Açılır Menü */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-[110] bg-neu-base border border-white/20 rounded-2xl shadow-neu-flat overflow-hidden py-1 max-h-56 overflow-y-auto">
          <div
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
            className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-colors ${
              value === ''
                ? 'bg-gradient-to-r from-grad-from to-grad-to text-white'
                : 'text-neu-slate-primary hover:bg-black/10'
            }`}
          >
            {placeholder}
          </div>

          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-colors ${
                value === opt.value
                  ? 'bg-gradient-to-r from-grad-from to-grad-to text-white'
                  : 'text-neu-slate-primary hover:bg-black/10 hover:text-accent'
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Searchbar = ({ onSearch, className = '' }) => {
  const { t } = useTranslation();
  const { upper } = useConfig();

  const [activeTab, setActiveTab] = useState('sale');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchData = {
      status: activeTab,
      location,
      propertyType,
      priceRange,
    };
    if (onSearch) {
      onSearch(searchData);
    } else {
      const listingsEl = document.getElementById("listings");
      if (listingsEl) {
        listingsEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={`w-full relative z-40 ${className}`}>
      {/* TABLAR */}
      <div className="flex items-center gap-2 mb-2 ml-2">
        <button
          type="button"
          onClick={() => setActiveTab('sale')}
          className={`px-5 py-2 rounded-t-2xl text-xs font-extrabold tracking-wider transition-all duration-300 cursor-pointer ${
            activeTab === 'sale'
              ? 'bg-neu-base text-accent shadow-neu-flat border-t-2 border-accent'
              : 'bg-neu-base/60 text-neu-slate-secondary hover:text-neu-slate-primary shadow-neu-pressed-sm'
          }`}
        >
          {upper(t("searchbar.tabs.sale", "Satılık"))}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('rent')}
          className={`px-5 py-2 rounded-t-2xl text-xs font-extrabold tracking-wider transition-all duration-300 cursor-pointer ${
            activeTab === 'rent'
              ? 'bg-neu-base text-accent shadow-neu-flat border-t-2 border-accent'
              : 'bg-neu-base/60 text-neu-slate-secondary hover:text-neu-slate-primary shadow-neu-pressed-sm'
          }`}
        >
          {upper(t("searchbar.tabs.rent", "Kiralık"))}
        </button>
      </div>

      {/* FORM KART */}
      <form
        onSubmit={handleSearchSubmit}
        className="bg-neu-base rounded-3xl p-4 sm:p-5 shadow-neu-flat border border-white/20 relative z-30"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* KONUM */}
          <div className="md:col-span-4">
            <CustomSelect
              icon={FiMapPin}
              label={upper(t("searchbar.labels.location", "Konum"))}
              value={location}
              onChange={setLocation}
              placeholder={t("searchbar.placeholders.location", "Şehir veya Bölge Seçin")}
              options={searchbarConfig.locations.map((item) => ({
                value: item.value,
                label: t(item.labelKey),
              }))}
            />
          </div>

          {/* MÜLK TİPİ */}
          <div className="md:col-span-3">
            <CustomSelect
              icon={FiHome}
              label={upper(t("searchbar.labels.propertyType", "Mülk Tipi"))}
              value={propertyType}
              onChange={setPropertyType}
              placeholder={t("searchbar.placeholders.propertyType", "Tüm Mülkler")}
              options={searchbarConfig.propertyTypes.map((item) => ({
                value: item.value,
                label: t(item.labelKey),
              }))}
            />
          </div>

          {/* FİYAT ARALIĞI */}
          <div className="md:col-span-3">
            <CustomSelect
              icon={FiDollarSign}
              label={upper(t("searchbar.labels.priceRange", "Fiyat Aralığı"))}
              value={priceRange}
              onChange={setPriceRange}
              placeholder={t("searchbar.placeholders.priceRange", "Fiyat Belirtmeyin")}
              options={searchbarConfig.priceRanges.map((item) => ({
                value: item.value,
                label: upper(t(item.labelKey)),
              }))}
            />
          </div>

          {/* ARAMA BUTONU */}
          <div className="md:col-span-2 flex items-center justify-end">
            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-grad-from to-grad-to text-white font-extrabold tracking-wider text-xs rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-neu-flat active:shadow-neu-pressed cursor-pointer hover:scale-[1.02]"
            >
              <FiSearch size={18} />
              <span>{upper(t("searchbar.labels.searchBtn", "Ara"))}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
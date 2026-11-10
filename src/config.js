export const config = {
  activeTheme: "darkclassic",

  siteName: "Prestige Gayrimenkul",

  contact: {
    phone: "+90 (242) 123 45 67",
    email: "info@prestigegayrimenkul.com",
    address: "Atatürk Cad. No:123, Muratpaşa / Antalya",

    instagram: "https://instagram.com/prestigegayrimenkul",
    whatsapp: "https://wa.me/902525154381",
    facebook: "https://facebook.com/prestigegayrimenkul",
  },

  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12747.781896791223!2d27.28476214458008!3d37.106461999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14be739f99f36b05%3A0x6d5e1fbc811f59da!2zWWFsaWthdmFrLCBCb2RydW0vTXXEn2xh!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str",

  
  
}

export default config;

export const searchbarConfig = {
  locations: [
    { value: "istanbul", labelKey: "searchbar.locations.istanbul" },
    { value: "izmir", labelKey: "searchbar.locations.izmir" },
    { value: "ankara", labelKey: "searchbar.locations.ankara" },
    { value: "antalya", labelKey: "searchbar.locations.antalya" },
    { value: "bodrum", labelKey: "searchbar.locations.bodrum" },
  ],
  propertyTypes: [
    { value: "villa", labelKey: "searchbar.propertyTypes.villa" },
    { value: "daire", labelKey: "searchbar.propertyTypes.daire" },
    { value: "penthouse", labelKey: "searchbar.propertyTypes.penthouse" },
    { value: "arsa", labelKey: "searchbar.propertyTypes.arsa" },
  ],
  priceRanges: [
    { value: "0-5m", labelKey: "searchbar.priceRanges.0-5m" },
    { value: "5m-15m", labelKey: "searchbar.priceRanges.5m-15m" },
    { value: "15m-30m", labelKey: "searchbar.priceRanges.15m-30m" },
    { value: "30m+", labelKey: "searchbar.priceRanges.30m+" },
  ],
};

export const featuredPropertiesConfig = [
  {
    id: 1,
    titleKey: "featured.properties.1.title",
    locationKey: "featured.properties.1.location",
    price: "48.500.000 ₺",
    statusKey: "featured.status.sale",
    image: "/images/featured/1.webp",
    beds: 5,
    baths: 4,
    area: "420 m²",
  },
  {
    id: 2,
    titleKey: "featured.properties.2.title",
    locationKey: "featured.properties.2.location",
    price: "32.000.000 ₺",
    statusKey: "featured.status.sale",
    image: "/images/featured/2.webp",
    beds: 3,
    baths: 2,
    area: "210 m²",
  },
  {
    id: 3,
    titleKey: "featured.properties.3.title",
    locationKey: "featured.properties.3.location",
    price: "24.000 ₺ / Ay",
    statusKey: "featured.status.rent",
    image: "/images/featured/3.webp",
    beds: 4,
    baths: 3,
    area: "310 m²",
  },
  {
    id: 4,
    titleKey: "featured.properties.4.title",
    locationKey: "featured.properties.4.location",
    price: "18.750.000 ₺",
    statusKey: "featured.status.sale",
    image: "/images/featured/4.webp",
    beds: 3,
    baths: 2,
    area: "185 m²",
  },
  {
    id: 5,
    titleKey: "featured.properties.5.title",
    locationKey: "featured.properties.5.location",
    price: "27.500.000 ₺",
    statusKey: "featured.status.sale",
    image: "/images/featured/5.webp",
    beds: 6,
    baths: 5,
    area: "500 m²",
  },
];

export const propertiesConfig = [
  {
    id: 6,
    titleKey: "featured.properties.6.title",
    locationKey: "featured.properties.6.location",
    price: "15.500.000 ₺",
    statusKey: "featured.status.sale",
    image: "/images/property-1.webp",
    beds: 2,
    baths: 2,
    area: "140 m²",
    type: "daire",
  },
  {
    id: 7,
    titleKey: "featured.properties.7.title",
    locationKey: "featured.properties.7.location",
    price: "85.000 ₺ / Ay",
    statusKey: "featured.status.rent",
    image: "/images/property-2.webp",
    beds: 4,
    baths: 3,
    area: "280 m²",
    type: "penthouse",
  },
]

export const aboutConfig = {
  stats: [
    { value: "15+", labelKey: "about.stats.experience" },
    { value: "1,200+", labelKey: "about.stats.propertiesSold" },
    { value: "99%", labelKey: "about.stats.clientSatisfaction" },
    { value: "₺2.5B+", labelKey: "about.stats.portfolioValue" },
  ],
  features: [
    {
      icon: "key",
      titleKey: "about.features.1.title",
      descKey: "about.features.1.desc",
    },
    {
      icon: "shield",
      titleKey: "about.features.2.title",
      descKey: "about.features.2.desc",
    },
    {
      icon: "award",
      titleKey: "about.features.3.title",
      descKey: "about.features.3.desc",
    },
  ],
};

export const blogConfig = [
  {
    id: 1,
    titleKey: "blog.posts.1.title",
    excerptKey: "blog.posts.1.excerpt",
    categoryKey: "blog.categories.investment",
    date: "12 May 2026",
    readTime: "5 min",
    author: "Ahmet Yılmaz",
    image: "/images/blog/1.webp",
    featured: true,
  },
  {
    id: 2,
    titleKey: "blog.posts.2.title",
    excerptKey: "blog.posts.2.excerpt",
    categoryKey: "blog.categories.market",
    date: "28 Apr 2026",
    readTime: "4 min",
    author: "Selin Kaya",
    image: "/images/blog/2.webp",
    featured: false,
  },
  {
    id: 3,
    titleKey: "blog.posts.3.title",
    excerptKey: "blog.posts.3.excerpt",
    categoryKey: "blog.categories.lifestyle",
    date: "15 Apr 2026",
    readTime: "6 min",
    author: "Caner Demir",
    image: "/images/blog/3.webp",
    featured: false,
  },
  {
    id: 4,
    titleKey: "blog.posts.4.title",
    excerptKey: "blog.posts.4.excerpt",
    categoryKey: "blog.categories.architecture",
    date: "02 Mar 2026",
    readTime: "7 min",
    author: "Zeynep Arslan",
    image: "/images/blog/4.webp",
    featured: false,
  },
];

export const comments = [
  {
    id: 1,
    name: "Selin Yılmaz",
    avatar: "images/avatars/avatar3.webp",
    rating: 5,
    date: "14/07/2026",
    commentKey: "comments.1" // i18n key veya doğrudan metin kullanabilirsin
  },
  {
    id: 2,
    name: "Emre Kaya",
    avatar: "images/avatars/avatar2.webp",
    rating: 5,
    date: "02/07/2026",
    commentKey: "comments.2"
  },
  {
    id: 3,
    name: "Sophia Martinez",
    avatar: "images/avatars/avatar7.webp",
    rating: 5,
    date: "28/06/2026",
    commentKey: "comments.3"
  },
  {
    id: 4,
    name: "Caner Demir",
    avatar: "images/avatars/avatar4.webp",
    rating: 4,
    date: "18/06/2026",
    commentKey: "comments.4"
  },
  {
    id: 5,
    name: "Ayşe Yılmaz",
    avatar: "images/avatars/avatar6.webp",
    rating: 5,
    date: "10/06/2026",
    commentKey: "comments.5"
  },
  {
    id: 6,
    name: "Mehmet Kaya",
    avatar: "images/avatars/avatar5.webp",
    rating: 5,
    date: "05/06/2026",
    commentKey: "comments.6"
  },
  {
    id: 7,
    name: "Elif Demir",
    avatar: "images/avatars/avatar8.webp",
    rating: 4,
    date: "29/05/2026",
    commentKey: "comments.7"
  },
  {
    id: 8,
    name: "Ahmet Şahin",
    avatar: "images/avatars/avatar1.webp",
    rating: 5,
    date: "22/05/2026",
    commentKey: "comments.8"
  }
];
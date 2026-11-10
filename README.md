# RealEstateAgency_Website_Neumorphism

Real estate agency website template, neumorphic (soft shadows) style. React + Vite, Tailwind v4, i18next (Turkish and English), framer-motion. A single scrolling page: hero and search, listings, investment calculator, about, FAQ, contact.

## Run it

```bash
npm install
npm run dev
```

## Where things live

- `src/config.js`: agency name, contact details, map, listings and featured properties.
- `src/locales/{tr,en}/translation.json`: every visitor-facing text.
- `src/pages/Contact.jsx`: the contact form. It posts to `VITE_FORM_ENDPOINT` (copy `.env.example` to `.env`; any URL that accepts a JSON POST works, e.g. Formspree, Netlify Forms or your own API). Without it the visitor's mail app opens, addressed to `config.contact.email`.
- The listing search bar filters the static listings in the browser; it does not call a server.

## Tests

```bash
npm test
```

Deep links work on Netlify/Cloudflare (`public/_redirects`), Vercel (`vercel.json`) and GitHub Pages (`404.html` copied at build).

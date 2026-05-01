# vartist.ai — Nuxt 3 Website

Intelligent Voice AI Agents & Custom AI Solutions website built with **Nuxt 3 + Vue 3**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → http://localhost:3000

# 3. Build for production (SSR)
npm run build

# 4. Generate static site
npm run generate
```

---

## 📁 Project Structure

```
vartist/
├── app.vue                        # Root app entry
├── nuxt.config.ts                 # Nuxt config + SEO meta + JSON-LD
├── layouts/
│   └── default.vue                # Wraps every page with Navbar + Footer
├── pages/
│   └── index.vue                  # Home page — composes all sections
├── components/
│   ├── TheNavbar.vue              # Fixed top navigation bar
│   ├── TheFooter.vue              # Footer with links
│   ├── HeroSection.vue            # Hero + animated voice orb
│   ├── StatsStrip.vue             # 4 key stats banner
│   ├── DemoSection.vue            # Vera AI voice agent demo chat
│   ├── AboutSection.vue           # About / mission / vision
│   ├── ServicesSection.vue        # 6 service cards
│   ├── ProjectsSection.vue        # Portfolio showcase
│   ├── TechStackSection.vue       # Tech stack categories
│   ├── TeamSection.vue            # Team member profiles
│   ├── WhyUsSection.vue           # Why choose us reasons
│   └── ContactSection.vue         # Contact form + info
├── composables/
│   ├── useReveal.ts               # IntersectionObserver scroll-reveal
│   └── useVoiceAgent.ts           # Vera AI agent: chat, TTS, STT
├── assets/
│   └── css/
│       └── global.css             # Design tokens, resets, keyframes
└── public/
    ├── favicon.svg
    ├── robots.txt
    └── sitemap.xml
```

---

## 🔌 Connecting Your Real Voice Model

In `composables/useVoiceAgent.ts`, find the `sendMessage()` function and replace the `fetch` call with your own backend endpoint:

```ts
// Replace this block:
const res = await fetch('https://api.anthropic.com/v1/messages', { ... })

// With your own endpoint:
const res = await fetch('https://your-api.vartist.ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userText, history: history.value })
})
```

The rest of the UI (typewriter, TTS, mic input) stays exactly as-is.

---

## 🌐 SEO Features

- ✅ Server-Side Rendering (SSR) enabled
- ✅ Full `<head>` meta tags (title, description, keywords)
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card meta tags
- ✅ JSON-LD structured data (Organization schema)
- ✅ Canonical URL
- ✅ `robots.txt`
- ✅ `sitemap.xml`
- ✅ Semantic HTML (sections, articles, aria labels, roles)
- ✅ `useSeoMeta()` composable on index page

---

## 🎨 Design System

Primary color: `#0a6ed4`  
Accent color: `#00e5c8`  
Fonts: Syne (headings) · DM Sans (body) · Space Mono (code/labels)

All design tokens are in `assets/css/global.css` under `:root {}`.

---

## 📦 Tech Stack

- [Nuxt 3](https://nuxt.com) — SSR framework
- [Vue 3](https://vuejs.org) — Composition API
- [@vueuse/core](https://vueuse.org) — Vue utilities
- Web Speech API — browser-native STT + TTS
- No UI library — fully custom CSS



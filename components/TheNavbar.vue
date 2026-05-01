<template>
  <nav :class="{ scrolled: isScrolled }">
    <NuxtLink to="/" class="logo" aria-label="aurobotix.com home">
      <span class="au">Au</span><span class="robotics">robotix</span><span class="domain">.com</span>
    </NuxtLink>

    <ul class="nav-links" :class="{ open: menuOpen }" role="navigation" aria-label="Main navigation">
      <li v-for="link in links" :key="link.href">
        <a
          :href="link.href"
          :class="{ 'nav-cta': link.cta }"
          @click="onNavLinkClick($event, link.href)"
        >{{ link.label }}</a>
      </li>
    </ul>

    <button
      class="hamburger"
      :aria-expanded="menuOpen"
      aria-label="Toggle navigation menu"
      @click="menuOpen = !menuOpen"
    >
      <span :class="{ open: menuOpen }"></span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { handleInPageAnchorClick } from '~/composables/inPageSectionScroll'

const menuOpen = ref(false)
const isScrolled = ref(false)

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#mission', label: 'Mission & Vision' },
  { href: '#contact', label: 'Contact', cta: true },
]

function onNavLinkClick(e: MouseEvent, href: string) {
  handleInPageAnchorClick(e, href)
  menuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
})
</script>

<style scoped>
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5vw;
  height: 72px;
  background: rgba(5, 12, 24, 0.78);
  backdrop-filter: blur(18px);
  transition: background 0.3s, border-color 0.3s;
  border-bottom: 1px solid transparent;
}
nav.scrolled {
  background: rgba(5, 12, 24, 0.96);
  border-bottom-color: var(--border);
}

.logo {
  font-family: var(--font-sans);
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  text-decoration: none;
}
.logo .au       { color: var(--primary-light); }
.logo .robotics { color: var(--accent); }
.logo .domain { color: var(--text-muted); font-size: 0.85rem; font-weight: 400; }

.nav-links {
  display: flex; gap: 1.35rem; list-style: none; align-items: center;
}
.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem; font-weight: 500;
  letter-spacing: 0.2px;
  transition: color 0.2s;
  position: relative;
  white-space: nowrap;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: -3px; left: 0;
  width: 0; height: 2px; background: var(--accent); transition: width 0.25s;
}
.nav-links a:hover       { color: var(--white); }
.nav-links a:hover::after { width: 100%; }

.nav-cta {
  background: var(--primary) !important;
  color: var(--white) !important;
  padding: 0.45rem 1rem;
  border-radius: 40px;
  font-weight: 600 !important;
  font-size: 0.8rem !important;
  transition: background 0.2s, transform 0.2s !important;
}
.nav-cta:hover      { background: var(--primary-light) !important; transform: translateY(-1px); }
.nav-cta::after     { display: none !important; }

.hamburger {
  display: none; background: none; border: none;
  color: var(--text); cursor: pointer; padding: 6px;
  flex-direction: column; gap: 5px; align-items: center; justify-content: center;
}
.hamburger span,
.hamburger span::before,
.hamburger span::after {
  display: block; width: 22px; height: 2px;
  background: var(--text); border-radius: 2px;
  transition: all 0.3s;
  position: relative;
}
.hamburger span::before,
.hamburger span::after {
  content: ''; position: absolute; left: 0;
}
.hamburger span::before { top: -7px; }
.hamburger span::after  { top: 7px; }
.hamburger span.open                { background: transparent; }
.hamburger span.open::before        { transform: rotate(45deg); top: 0; }
.hamburger span.open::after         { transform: rotate(-45deg); top: 0; }

@media (max-width: 1100px) {
  .nav-links { gap: 1rem; }
  .nav-links a { font-size: 0.8rem; }
}

@media (max-width: 900px) {
  .hamburger { display: flex; }
  .nav-links {
    display: none;
    position: fixed; top: 72px; left: 0; right: 0;
    background: var(--dark2);
    flex-direction: column; padding: 2rem;
    gap: 1.25rem;
    border-bottom: 1px solid var(--border);
    z-index: 99;
    align-items: flex-start;
  }
  .nav-links.open { display: flex; }
}
</style>

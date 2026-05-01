<template>
  <footer>
    <div>
      <NuxtLink to="/" class="logo" aria-label="aurobotix.com">
        <span class="au">Au</span><span class="robotics">robotix</span><span class="domain">.com</span>
      </NuxtLink>
      <p class="copy">© {{ year }} aurobotix.com — All rights reserved</p>
    </div>
    <nav class="footer-links" aria-label="Footer navigation">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        @click="handleInPageAnchorClick($event, link.href)"
      >{{ link.label }}</a>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import { handleInPageAnchorClick } from '~/composables/inPageSectionScroll'

const year = new Date().getFullYear()
const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#mission', label: 'Mission & Vision' },
  { href: '#contact', label: 'Contact' },
]
</script>

<style scoped>
footer {
  background: var(--dark);
  border-top: 1px solid var(--border);
  padding: 2.5rem 5vw;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 1rem;
}
.logo {
  font-size: 1.1rem; font-weight: 800;
  text-decoration: none;
}
.logo .au       { color: var(--primary-light); }
.logo .robotics { color: var(--accent); }
.logo .domain { color: var(--text-muted); font-size: 0.8rem; font-weight: 400; }
.copy { font-size: 0.82rem; color: var(--text-muted); margin-top: 0.3rem; }

.footer-links { display: flex; gap: 1.25rem; flex-wrap: wrap; }
.footer-links a {
  font-size: 0.82rem; color: var(--text-muted);
  text-decoration: none; transition: color 0.2s;
}
.footer-links a:hover { color: var(--accent); }
</style>

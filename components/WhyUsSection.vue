<template>
  <section id="why" aria-labelledby="why-heading">
    <div class="section-tag reveal">// why choose us</div>
    <h2 id="why-heading" class="reveal">Built for <em>Your</em> Success</h2>
    <p class="section-lead reveal">We don't just build AI — we build AI that solves your specific problems and scales with your growth.</p>

    <div class="why-grid">
      <div
        v-for="(item, i) in reasons"
        :key="item.title"
        class="why-card reveal"
        :class="`reveal-delay-${i}`"
      >
        <div class="why-icon" aria-hidden="true">{{ item.icon }}</div>
        <div>
          <h3 class="why-title">{{ item.title }}</h3>
          <p class="why-text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const reasons = [
  {
    icon: '🎯',
    title: 'Tailored Solutions',
    text: 'Every AI solution we build is precisely aligned with your business goals — no generic off-the-shelf products.',
  },
  {
    icon: '🔬',
    title: 'Multi-Domain Expertise',
    text: 'Our team spans data science, backend, frontend, and AI — covering the full stack of any intelligent system.',
  },
  {
    icon: '⚡',
    title: 'Agile & Collaborative',
    text: 'We work closely with you at every step — fast iterations, transparent communication, and real-time feedback loops.',
  },
  {
    icon: '🏆',
    title: 'Quality & Innovation',
    text: 'Committed to excellence in every line of code and model trained — with a relentless drive to stay ahead of the curve.',
  },
]
</script>

<style scoped>
section { background: var(--dark); }

.why-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;
}

.why-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.8rem;
  display: flex; gap: 1rem; align-items: flex-start; transition: all 0.3s;
}
.why-card:hover { border-color: rgba(10,110,212,0.35); }
.why-icon  { font-size: 1.8rem; flex-shrink: 0; margin-top: 2px; }
.why-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
.why-text  { font-size: 0.88rem; color: var(--text-muted); line-height: 1.65; }
</style>

<template>
  <section id="testimonials" aria-labelledby="testimonials-heading">
    <div class="section-tag reveal">Testimonials</div>
    <h2 id="testimonials-heading" class="reveal">What Clients <em>Say</em></h2>
    <p class="section-lead reveal wide">
      Trusted relationships drive repeat engagements. Below are representative reflections from
      technology leaders we have supported — titles anonymized where requested.
    </p>

    <div class="quotes-grid">
      <figure v-for="(t, i) in items" :key="i" class="quote-card reveal" :class="`reveal-delay-${i % 3}`">
        <blockquote class="quote-text">“{{ t.quote }}”</blockquote>
        <figcaption class="quote-meta">
          <div class="avatar" aria-hidden="true">{{ t.initials }}</div>
          <div>
            <div class="name">{{ t.name }}</div>
            <div class="role">{{ t.role }}</div>
          </div>
          <div class="stars" aria-hidden="true">{{ t.stars }}</div>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  {
    quote:
      'Their team translated our messy integration landscape into a clean roadmap in weeks — not months. Delivery discipline stood out.',
    name: 'Director of Engineering',
    role: 'Financial Services · North America',
    initials: 'DE',
    stars: '★★★★★',
  },
  {
    quote:
      'Security reviews used to slow every release. With their DevSecOps patterns baked in, we shipped confidently and reduced rework substantially.',
    name: 'Head of IT',
    role: 'Healthcare · EU',
    initials: 'HI',
    stars: '★★★★★',
  },
  {
    quote:
      'Clear documentation and knowledge transfer meant our internal engineers could own the platform post-launch — exactly what procurement asked for.',
    name: 'CTO',
    role: 'Logistics · APAC',
    initials: 'CT',
    stars: '★★★★★',
  },
]
</script>

<style scoped>
section {
  background: var(--dark);
}

.section-lead.wide {
  max-width: 640px;
}

.quotes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.quote-card {
  margin: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.quote-card:hover {
  border-color: rgba(var(--rgb-primary), 0.45);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
}

.quote-text {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-muted);
  font-style: italic;
  margin: 0;
}

.quote-meta {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-light));
  color: var(--white);
  font-weight: 700;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(var(--rgb-accent), 0.35);
}

.name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text);
}

.role {
  font-size: 0.82rem;
  color: var(--text-dim);
  margin-top: 0.15rem;
}

.stars {
  color: var(--accent);
  font-size: 0.75rem;
  letter-spacing: 1px;
}
</style>

<template>
  <div class="stats-strip" role="region" aria-label="Company highlights">
    <div v-for="stat in stats" :key="stat.label" class="stat">
      <div class="stat-num">{{ stat.num }}</div>
      <div class="stat-label">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { num: '10+', label: 'Years Combined Experience' },
  { num: '120+', label: 'Delivered Engagements' },
  { num: '24/7', label: 'Support Options' },
  { num: 'ISO-ready', label: 'Security-minded Delivery' },
]
</script>

<style scoped>
.stats-strip {
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 1.8rem 5vw;
  display: flex; justify-content: space-around; flex-wrap: wrap; gap: 2rem;
}
.stat { text-align: center; }
.stat-num {
  font-size: 2rem; font-weight: 800;
  color: var(--accent);
}
.stat-label { font-size: 0.82rem; color: var(--text-muted); letter-spacing: 0.5px; max-width: 140px; margin: 0 auto; line-height: 1.35; }
</style>

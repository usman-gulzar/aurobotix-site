<template>
  <section id="about" aria-labelledby="about-heading">
    <div class="about-grid">
      <div>
        <div class="section-tag reveal">About</div>
        <h2 id="about-heading" class="reveal">Your Partner for <em>Digital Operations</em></h2>
        <p class="section-lead reveal">
          We help enterprises and growing teams plan, build, and run technology that supports revenue,
          compliance, and operational resilience — without unnecessary complexity.
        </p>
        <p class="reveal body-text">
          From custom applications and APIs to cloud migrations and managed delivery, our consultants
          and engineers work alongside your stakeholders with clear milestones, documentation, and
          governance suited to regulated and high-availability environments.
        </p>
        <p class="reveal body-text alt">
          Whether you need a greenfield product, modernization of legacy systems, or a strategic
          roadmap for IT investment, we align delivery with your business outcomes first.
        </p>
      </div>

      <div class="reveal">
        <div class="about-card">
          <h3 class="card-title">What defines our delivery</h3>
          <ul class="highlights">
            <li v-for="item in highlights" :key="item">
              <span class="check" aria-hidden="true"></span>
              {{ item }}
            </li>
          </ul>
          <div class="pill-row">
            <span class="pill">Agile / Scrum</span>
            <span class="pill">DevSecOps</span>
            <span class="pill">Cloud-native</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const highlights = [
  'Transparent reporting and steering-committee friendly updates',
  'Architecture reviews, threat modeling, and quality gates built in',
  'Documentation and handover so your teams can own the runway',
  'Flexible engagement models — fixed scope, dedicated team, or advisory',
]
</script>

<style scoped>
section { background: var(--dark2); }

.about-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
}

.body-text { color: var(--text-muted); font-size: 0.95rem; line-height: 1.8; margin-bottom: 1rem; }
.body-text.alt { margin-bottom: 0; }

.about-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 2.5rem;
  position: relative; overflow: hidden;
}
.about-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.card-title {
  font-size: 1.25rem; font-weight: 700; margin-bottom: 1.35rem;
  color: var(--text);
}

.highlights {
  list-style: none;
  display: flex; flex-direction: column; gap: 1rem;
  margin-bottom: 1.75rem;
}
.highlights li {
  display: flex; gap: 0.75rem; align-items: flex-start;
  font-size: 0.92rem; color: var(--text-muted); line-height: 1.55;
}
.check {
  flex-shrink: 0; width: 18px; height: 18px; margin-top: 3px;
  border-radius: 50%;
  background: rgba(var(--rgb-accent), 0.15);
  border: 1px solid rgba(var(--rgb-accent), 0.45);
  position: relative;
}
.check::after {
  content: ''; position: absolute; left: 5px; top: 3px;
  width: 5px; height: 9px; border: solid var(--accent);
  border-width: 0 2px 2px 0; transform: rotate(45deg);
}

.pill-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill {
  font-size: 0.72rem; letter-spacing: 0.8px; text-transform: uppercase;
  padding: 0.35rem 0.75rem; border-radius: 999px;
  background: rgba(var(--rgb-primary), 0.18);
  border: 1px solid rgba(var(--rgb-primary), 0.35);
  color: var(--primary-light);
}

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
}
</style>

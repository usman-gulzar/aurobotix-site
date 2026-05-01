<template>
  <section id="portfolio" aria-labelledby="portfolio-heading">
    <div class="section-tag reveal">Portfolio</div>
    <h2 id="portfolio-heading" class="reveal">Selected <em>Engagements</em></h2>
    <p class="section-lead reveal">
      Representative outcomes across industries — anonymized where confidentiality applies. Each
      engagement combines architecture rigor with pragmatic delivery timelines.
    </p>

    <div class="projects-grid">
      <article
        v-for="(project, i) in projects"
        :key="project.title"
        class="project-card reveal"
        :class="`reveal-delay-${i}`"
      >
        <div :class="['project-thumb', `thumb-${i + 1}`]" aria-hidden="true">
          <div class="thumb-icon">{{ project.icon }}</div>
        </div>
        <div class="project-body">
          <div class="project-tag">{{ project.tag }}</div>
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-desc">{{ project.desc }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    icon: '🏢',
    tag: 'Enterprise',
    title: 'Unified Operations Portal',
    desc: 'Multi-tenant web platform consolidating approvals, reporting, and integrations with SAP and Salesforce — delivered with SSO and audit trails.',
  },
  {
    icon: '☁️',
    tag: 'Cloud',
    title: 'Zero-Downtime Cloud Migration',
    desc: 'Lift-and-refactor of mission-critical services to a hybrid cloud footprint with automated failover, monitoring, and FinOps guardrails.',
  },
  {
    icon: '🔗',
    tag: 'Integration',
    title: 'API Gateway & Partner Ecosystem',
    desc: 'REST and event-driven APIs exposing core banking capabilities to partners with OAuth2, rate limits, and centralized policy enforcement.',
  },
]
</script>

<style scoped>
section { background: var(--dark2); }

.projects-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;
}

.project-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); overflow: hidden; transition: all 0.3s;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  border-color: rgba(var(--rgb-accent), 0.45);
}

.project-thumb {
  height: 180px; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.thumb-1 {
  background: linear-gradient(135deg, var(--dark3) 0%, rgba(var(--rgb-primary), 0.55) 100%);
}
.thumb-2 {
  background: linear-gradient(135deg, #06202d 0%, rgba(var(--rgb-accent), 0.35) 100%);
}
.thumb-3 {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--dark3) 100%);
}
.thumb-icon { font-size: 4rem; opacity: 0.35; }

.project-body { padding: 1.5rem; }
.project-tag {
  display: inline-block; font-size: 0.72rem; letter-spacing: 1px; text-transform: uppercase;
  color: var(--accent);
  background: rgba(var(--rgb-accent), 0.12);
  border: 1px solid rgba(var(--rgb-accent), 0.28);
  padding: 0.25rem 0.65rem; border-radius: 4px; margin-bottom: 0.75rem;
}
.project-title {
  font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;
}
.project-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.65; }
</style>

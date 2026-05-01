<template>
  <section id="services" aria-labelledby="services-heading">
    <div class="section-tag reveal">Services</div>
    <h2 id="services-heading" class="reveal">Solutions We <em>Deliver</em></h2>
    <p class="section-lead reveal">
      Full-stack IT capabilities from discovery through production support — scoped for clarity and
      executed with enterprise discipline.
    </p>

    <div class="services-grid">
      <article
        v-for="(service, i) in services"
        :key="service.title"
        class="service-card reveal"
        :class="`reveal-delay-${i % 3}`"
      >
        <div class="service-icon" aria-hidden="true">{{ service.icon }}</div>
        <h3 class="service-title">{{ service.title }}</h3>
        <p class="service-desc">{{ service.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    icon: '💻',
    title: 'Custom Software Development',
    desc: 'Web platforms, internal tools, and APIs engineered for performance, maintainability, and alignment with your product roadmap.',
  },
  {
    icon: '☁️',
    title: 'Cloud Architecture & DevOps',
    desc: 'Landing zones, CI/CD, observability, and IaC patterns on leading clouds — built for scale, cost control, and uptime.',
  },
  {
    icon: '🛡️',
    title: 'Cybersecurity & Compliance',
    desc: 'Risk assessments, secure SDLC practices, identity strategy, and controls mapping to frameworks your auditors expect.',
  },
  {
    icon: '🔗',
    title: 'Integration & Data Platforms',
    desc: 'Enterprise integrations, ETL/ELT pipelines, and event-driven architectures that unify systems without brittle glue code.',
  },
  {
    icon: '📋',
    title: 'IT Consulting & Advisory',
    desc: 'Technology strategy, vendor evaluation, TCO modeling, and transformation roadmaps grounded in measurable outcomes.',
  },
  {
    icon: '🛠️',
    title: 'Managed Services & Support',
    desc: 'Operational runbooks, SLAs, incident response, and continuous improvement so critical workloads stay healthy in production.',
  },
]
</script>

<style scoped>
section { background: var(--dark); }

.services-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;
}

.service-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 2rem;
  transition: all 0.3s; position: relative; overflow: hidden; cursor: default;
}
.service-card::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(var(--rgb-primary), 0.08) 0%, transparent 58%);
  opacity: 0; transition: opacity 0.3s;
}
.service-card:hover {
  border-color: rgba(var(--rgb-accent), 0.45);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}
.service-card:hover::after { opacity: 1; }

.service-icon {
  width: 52px; height: 52px; border-radius: 14px;
  background: rgba(var(--rgb-primary), 0.18);
  border: 1px solid rgba(var(--rgb-primary), 0.32);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.3rem; font-size: 1.4rem;
}
.service-title {
  font-size: 1.08rem; font-weight: 700; margin-bottom: 0.65rem;
}
.service-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.7; }
</style>

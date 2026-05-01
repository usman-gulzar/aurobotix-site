<template>
  <section id="mission" aria-labelledby="mission-heading">
    <div class="head">
      <div class="section-tag reveal">Mission & Vision</div>
      <h2 id="mission-heading" class="reveal">Purpose That <em>Guides Every Sprint</em></h2>
      <p class="lead reveal">
        Our leadership principles translate directly into how we scope work, communicate risk, and
        stand behind outcomes — not slide decks alone.
      </p>
    </div>

    <div class="dual-grid">
      <article class="panel reveal">
        <div class="panel-tag">Mission</div>
        <h3>Deliver technology people can trust in production</h3>
        <p>
          We exist to help organizations ship resilient software and infrastructure — with clarity on
          cost, security, and maintainability — so technology leaders sleep better after go-live.
        </p>
        <ul class="bullets">
          <li>Outcome-based milestones tied to business KPIs</li>
          <li>No surprise scope — change managed transparently</li>
          <li>Knowledge transfer as a deliverable, not an afterthought</li>
        </ul>
      </article>

      <article class="panel panel-accent reveal">
        <div class="panel-tag accent-tag">Vision</div>
        <h3>Become the regional benchmark for dependable IT delivery</h3>
        <p>
          We aspire to be the first call for enterprises that need senior engineers and advisors who
          respect procurement, audit, and uptime equally — across cloud, custom build, and hybrid estates.
        </p>
        <ul class="bullets">
          <li>Expand partnerships with cloud and security ecosystems</li>
          <li>Invest continuously in our delivery playbooks and tooling</li>
          <li>Grow long-term client relationships measured in years</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
section {
  background: var(--dark2);
  padding-bottom: 110px;
}

.head {
  max-width: 720px;
  margin-bottom: 3rem;
}

.lead {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.75;
  margin-top: 1rem;
}

.dual-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.25rem;
  position: relative;
  overflow: hidden;
}

.panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
}

.panel-accent::before {
  background: linear-gradient(90deg, var(--accent), var(--primary-light));
}

.panel-tag {
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--primary-light);
  margin-bottom: 1rem;
}

.accent-tag {
  color: var(--accent);
}

.panel h3 {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: var(--text);
}

.panel p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.75;
  margin-bottom: 1.35rem;
}

.bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.bullets li {
  font-size: 0.88rem;
  color: var(--text-muted);
  padding-left: 1.1rem;
  position: relative;
}

.bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.85;
}

@media (max-width: 900px) {
  .dual-grid {
    grid-template-columns: 1fr;
  }
}
</style>

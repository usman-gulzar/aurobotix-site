<template>
  <section id="home" aria-label="Home">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="hero-grid" aria-hidden="true"></div>

    <div class="hero-content">
      <div class="hero-badge" aria-hidden="true">
        <span class="dot"></span>
        Software · Cloud · IT Consulting
      </div>

      <h1>
        Technology Built for <span class="highlight">Serious Business</span>
      </h1>

      <p class="hero-sub">
        aurobotix.com is an IT services company delivering dependable software, cloud platforms,
        integration, and strategic consulting — so your teams can scale with confidence.
      </p>

      <div class="hero-ctas">
        <a href="#services" class="btn-primary" @click="handleInPageAnchorClick($event, '#services')">
          View Services
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="#contact" class="btn-outline" @click="handleInPageAnchorClick($event, '#contact')">Request a Consultation</a>
      </div>
    </div>

    <div class="hero-visual" aria-hidden="true">
      <div class="viz-glow" aria-hidden="true"></div>
      <div class="hero-visual-inner">
        <div class="solution-showcase">
          <p class="showcase-tag">Solution spectrum</p>
          <div class="orbit-stage">
            <div class="orbit-ring orbit-ring--outer" />
            <div class="orbit-ring orbit-ring--inner" />
            <div class="orbit-hub">
              <span class="orbit-hub__glyph" aria-hidden="true">◆</span>
              <span class="orbit-hub__label">Integrate</span>
            </div>
            <div
              v-for="(label, i) in solutions"
              :key="label"
              class="orbit-chip"
              :class="{ 'orbit-chip--wide': label.length > 8 }"
              :style="{ '--angle': String(i * 60), '--i': String(i) }"
            >
              {{ label }}
            </div>
          </div>
          <p class="orbit-note">One partner for operations, commerce, and intelligent automation.</p>
        </div>

        <div class="hero-bot" aria-hidden="true">
          <img
            class="hero-bot-img"
            src="/hero-bot.png"
            width="480"
            height="640"
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { handleInPageAnchorClick } from '~/composables/inPageSectionScroll'

/** Hero orbit labels — breadth of offerings without fake dashboard chrome */
const solutions = ['ERP', 'CRM', 'HRMS', 'POS', 'Agentic AI', 'AI Chatbots']
</script>

<style scoped>
section {
  min-height: 100vh;
  display: flex; align-items: center;
  position: relative;
  padding: 120px 5vw 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 65% 55% at 72% 48%, rgba(var(--rgb-primary), 0.18) 0%, transparent 68%),
    radial-gradient(ellipse 38% 42% at 18% 78%, rgba(var(--rgb-accent), 0.1) 0%, transparent 58%),
    var(--dark);
}

.hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(var(--rgb-primary), 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(var(--rgb-primary), 0.055) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 85% 85% at 58% 50%, black 22%, transparent 78%);
}

.hero-content {
  position: relative; z-index: 2; max-width: 720px;
}

.hero-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(var(--rgb-primary), 0.14);
  border: 1px solid rgba(var(--rgb-primary), 0.32);
  color: var(--accent);
  font-size: 0.78rem; font-weight: 600; letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 0.4rem 1rem; border-radius: 40px;
  margin-bottom: 1.8rem;
  animation: fadeUp 0.6s ease both;
}
.dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s ease infinite;
}

h1 {
  margin-bottom: 1.2rem;
  animation: fadeUp 0.7s 0.1s ease both;
  /* ~10% smaller than global h1 for hero balance */
  font-size: calc(0.9 * clamp(3rem, 7vw, 4.5rem));
  letter-spacing: -1.8px;
  line-height: 1.12;
}
.highlight {
  background: linear-gradient(90deg, var(--primary-light), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 1.12rem; color: var(--text-muted);
  max-width: 520px; line-height: 1.75; margin-bottom: 2.5rem;
  animation: fadeUp 0.7s 0.2s ease both;
}

.hero-ctas {
  display: flex; gap: 1rem; flex-wrap: wrap;
  animation: fadeUp 0.7s 0.3s ease both;
}

/* —— Hero visual: solution orbit (left) + bot (right) —— */
.hero-visual {
  position: absolute;
  right: clamp(8px, 2vw, 24px);
  top: 50%;
  transform: translateY(-50%);
  width: min(720px, 58vw);
  height: min(460px, 54vh);
  z-index: 2;
  animation: fadeLeft 0.9s 0.2s ease both;
}
@keyframes fadeLeft {
  from { opacity: 0; transform: translateY(-50%) translateX(40px); }
  to   { opacity: 1; transform: translateY(-50%) translateX(0); }
}

.viz-glow {
  position: absolute;
  inset: -8% -4% -8% -12%;
  border-radius: 50%;
  background: radial-gradient(ellipse 50% 48% at 35% 50%, rgba(var(--rgb-primary), 0.12), transparent 72%);
  pointer-events: none;
  z-index: 0;
}

.hero-visual-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: clamp(0.35rem, 1.25vw, 1.5rem);
  width: 100%;
  height: 100%;
}

.solution-showcase {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: min(300px, 40vw);
  max-width: 360px;
}

.showcase-tag {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
  opacity: 0.95;
}

.orbit-stage {
  --orbit-r: min(118px, 15.5vw);
  position: relative;
  width: min(300px, 38vw);
  height: min(300px, 38vw);
  max-width: 320px;
  max-height: 320px;
}

.orbit-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
}
.orbit-ring--outer {
  border: 1px dashed rgba(var(--rgb-accent), 0.28);
  animation: orbitDash 22s linear infinite;
}
.orbit-ring--inner {
  inset: 14%;
  border: 1px solid rgba(var(--rgb-primary), 0.22);
  opacity: 0.85;
  animation: hubPulse 5s ease-in-out infinite;
}

@keyframes orbitDash {
  to { transform: rotate(360deg); }
}
@keyframes hubPulse {
  0%, 100% { transform: scale(1); opacity: 0.75; }
  50% { transform: scale(1.02); opacity: 1; }
}

.orbit-hub {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 31%;
  aspect-ratio: 1;
  max-width: 96px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, rgba(var(--rgb-accent), 0.45), rgba(var(--rgb-primary), 0.55));
  border: 1px solid rgba(var(--rgb-accent), 0.5);
  box-shadow:
    0 0 48px rgba(var(--rgb-accent), 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.12rem;
}
.orbit-hub__glyph {
  font-size: clamp(0.65rem, 1.5vw, 0.85rem);
  color: rgba(255, 255, 255, 0.95);
  line-height: 1;
}
.orbit-hub__label {
  font-size: 0.48rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);
}

.orbit-chip {
  --angle: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 0.38rem 0.72rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--text);
  background: linear-gradient(165deg, rgba(15, 39, 68, 0.94), rgba(12, 29, 54, 0.98));
  border: 1px solid rgba(var(--rgb-accent), 0.35);
  border-radius: 999px;
  white-space: nowrap;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.38);
  animation: chipIn 0.7s ease backwards;
  animation-delay: calc(0.06s * var(--i));
  transform:
    translate(-50%, -50%)
    rotate(calc(var(--angle) * 1deg))
    translateY(calc(-1 * var(--orbit-r)))
    rotate(calc(var(--angle) * -1deg));
}

.orbit-chip--wide {
  font-size: 0.58rem;
  padding: 0.32rem 0.55rem;
  letter-spacing: 0.02em;
}

@keyframes chipIn {
  from {
    opacity: 0;
    filter: blur(4px);
    transform:
      translate(-50%, -50%)
      rotate(calc(var(--angle) * 1deg))
      translateY(calc(-1 * var(--orbit-r) + 12px))
      rotate(calc(var(--angle) * -1deg));
  }
  to {
    opacity: 1;
    filter: none;
    transform:
      translate(-50%, -50%)
      rotate(calc(var(--angle) * 1deg))
      translateY(calc(-1 * var(--orbit-r)))
      rotate(calc(var(--angle) * -1deg));
  }
}

.orbit-note {
  margin-top: 1rem;
  font-size: 0.72rem;
  line-height: 1.55;
  color: var(--text-muted);
  text-align: center;
  max-width: 17rem;
  opacity: 0.92;
}

@media (prefers-reduced-motion: reduce) {
  .orbit-ring--outer,
  .orbit-ring--inner {
    animation: none;
  }
  .orbit-chip {
    animation: none;
  }
  .hero-bot {
    animation: none;
  }
}

.hero-bot {
  flex: 1 1 auto;
  min-width: min(200px, 24vw);
  max-width: min(300px, 34vw);
  height: min(440px, 52vh);
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  filter: drop-shadow(0 18px 36px rgba(0, 0, 0, 0.35));
  transform-origin: 50% 80%;
  animation: heroBotPresence 6.5s ease-in-out infinite;
}
@keyframes heroBotPresence {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-6px) rotate(-1.25deg);
  }
}
.hero-bot-img {
  width: 100%;
  height: auto;
  max-height: 100%;
  display: block;
  object-fit: contain;
  object-position: center bottom;
  pointer-events: none;
  user-select: none;
}

@media (max-width: 1200px) {
  .hero-visual {
    width: min(620px, 54vw);
    height: min(460px, 54vh);
  }
  .orbit-stage {
    width: min(260px, 34vw);
    height: min(260px, 34vw);
    --orbit-r: min(102px, 13vw);
  }
  .solution-showcase {
    min-width: min(260px, 34vw);
    max-width: 300px;
  }
  .hero-bot {
    min-width: min(160px, 20vw);
    max-width: min(240px, 30vw);
    height: min(400px, 48vh);
  }
}

@media (max-width: 1050px) {
  .hero-visual-inner {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .orbit-stage {
    width: min(280px, 72vw);
    height: min(280px, 72vw);
    --orbit-r: min(108px, 28vw);
  }
  .hero-bot {
    max-width: 220px;
    height: min(280px, 36vh);
    align-self: center;
  }
}

@media (max-width: 900px) {
  .hero-visual { display: none; }
  h1 { letter-spacing: -1px; }
}
</style>

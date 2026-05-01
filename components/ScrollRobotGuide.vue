<template>
  <div class="scroll-robot" aria-hidden="true">
    <svg
      ref="svgRef"
      class="robot-svg"
      viewBox="0 0 200 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Cable / beam toward content -->
      <line
        ref="cableRef"
        class="cable"
        x1="28"
        y1="120"
        x2="118"
        y2="48"
        stroke="url(#beamGrad)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="6 10"
      />
      <defs>
        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.15" />
          <stop offset="50%" stop-color="var(--accent)" stop-opacity="0.85" />
          <stop offset="100%" stop-color="var(--primary-light)" stop-opacity="0.35" />
        </linearGradient>
      </defs>

      <!-- Arm group: rotates as user scrolls (pull metaphor) -->
      <g ref="armGroupRef" class="arm-group" transform="translate(24, 108)">
        <path
          class="arm"
          d="M 0 0 L 52 -38 L 96 -8 L 88 12 L 48 -18 L 8 18 Z"
          fill="rgba(var(--rgb-primary), 0.28)"
          stroke="var(--primary-light)"
          stroke-width="1.5"
        />
        <circle cx="0" cy="0" r="8" fill="var(--surface2)" stroke="var(--primary)" stroke-width="1.5" />
      </g>

      <!-- Torso / head -->
      <g class="torso">
        <rect x="56" y="132" width="88" height="96" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="1.2" />
        <rect x="72" y="148" width="56" height="10" rx="2" fill="var(--primary)" opacity="0.35" />
        <rect x="72" y="166" width="40" height="6" rx="2" fill="var(--text-dim)" />
        <rect x="72" y="178" width="48" height="6" rx="2" fill="var(--text-dim)" />
        <circle cx="100" cy="210" r="6" fill="var(--accent)" opacity="0.9" />
      </g>
      <g class="head">
        <rect x="68" y="56" width="64" height="52" rx="16" fill="var(--surface2)" stroke="var(--primary)" stroke-width="1.5" />
        <circle cx="88" cy="82" r="6" fill="var(--accent)" />
        <circle cx="112" cy="82" r="6" fill="var(--accent)" />
        <rect x="84" y="96" width="32" height="4" rx="2" fill="var(--primary-light)" opacity="0.5" />
      </g>
    </svg>
    <p class="robot-caption">scroll</p>
  </div>
</template>

<script setup lang="ts">
const svgRef = ref<SVGSVGElement | null>(null)
const armGroupRef = ref<SVGGElement | null>(null)
const cableRef = ref<SVGLineElement | null>(null)

let st: { kill: () => void } | null = null

onMounted(() => {
  if (!import.meta.client) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  void (async () => {
    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const arm = armGroupRef.value
    const cable = cableRef.value
    if (!arm) return

    gsap.set(arm, { transformOrigin: '0px 0px', rotation: 18 })

    st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.05,
      onUpdate(self) {
        const p = self.progress
        gsap.set(arm, { rotation: 18 - p * 46, x: p * 6 })
        if (cable) {
          const dash = 6 + p * 10
          cable.setAttribute('stroke-dasharray', `${dash} ${12 + p * 8}`)
        }
      },
    })
  })()
})

onUnmounted(() => {
  st?.kill()
  st = null
})
</script>

<style scoped>
.scroll-robot {
  position: fixed;
  right: max(12px, env(safe-area-inset-right));
  top: 50%;
  transform: translateY(-40%);
  width: min(100px, 8vw);
  z-index: 40;
  pointer-events: none;
  opacity: 0.88;
  filter: drop-shadow(0 0 20px rgba(10, 110, 212, 0.25));
}

.robot-svg {
  width: 100%;
  height: auto;
  display: block;
}

.cable {
  opacity: 0.85;
}

.robot-caption {
  font-family: var(--font-sans);
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-dim);
  text-align: center;
  margin-top: 0.35rem;
  opacity: 0.65;
}

@media (max-width: 900px) {
  .scroll-robot {
    display: none;
  }
}
</style>

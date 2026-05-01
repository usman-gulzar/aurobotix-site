/**
 * Scroll-scrubbed section motion + alternating L/R reveals (GSAP ScrollTrigger).
 * Respects prefers-reduced-motion.
 */
export function useScrollAnimations() {
  let ctx: { revert: () => void } | null = null
  let cancelled = false

  onMounted(() => {
    if (!import.meta.client) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('visible')
      })
      return
    }

    cancelled = false

    void (async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return

      ctx = gsap.context(() => {
        const hero = document.querySelector('#home')
        if (hero) {
          gsap.fromTo(
            hero.querySelectorAll('.hero-content > *'),
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              stagger: 0.09,
              ease: 'power3.out',
              delay: 0.08,
            }
          )
          const hv = hero.querySelector('.hero-visual')
          if (hv) {
            gsap.fromTo(
              hv,
              { opacity: 0, x: 90, scale: 0.92 },
              { opacity: 1, x: 0, scale: 1, duration: 1.05, ease: 'power3.out', delay: 0.2 }
            )
            gsap.to(hv, {
              y: -36,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
              },
            })
          }
        }

        gsap.utils.toArray<HTMLElement>('.stats-strip .stat').forEach((stat, i) => {
          gsap.fromTo(
            stat,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: stat.closest('.stats-strip'),
                start: `top ${92 - i * 4}%`,
                end: 'top 72%',
                scrub: 0.65,
              },
            }
          )
        })

        gsap.utils.toArray<HTMLElement>('main section').forEach((section) => {
          if (section.id === 'home') return

          gsap.fromTo(
            section,
            {
              yPercent: 10,
              opacity: 0.82,
              transformOrigin: '50% 0%',
            },
            {
              yPercent: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 68%',
                scrub: 1.15,
              },
            }
          )
        })

        gsap.utils.toArray<HTMLElement>('main section').forEach((section) => {
          const reveals = section.querySelectorAll<HTMLElement>('.reveal')
          reveals.forEach((el, idx) => {
            const fromLeft = idx % 2 === 0
            gsap.fromTo(
              el,
              {
                opacity: 0,
                x: fromLeft ? -72 : 72,
                y: 18,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 92%',
                  end: 'top 52%',
                  scrub: 0.85,
                },
              }
            )
          })
        })

        ScrollTrigger.refresh()
      })
    })()
  })

  onUnmounted(() => {
    cancelled = true
    ctx?.revert()
    ctx = null
  })
}

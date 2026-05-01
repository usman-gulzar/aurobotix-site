/** Offset for fixed nav (~72px) + small gap */
const NAV_OFFSET_PX = 80

/**
 * Smooth-scroll to a section by `#id` without updating `location.hash`
 * (use from click handlers with preventDefault).
 */
export function scrollToPageSection(hashOrId: string) {
  if (!import.meta.client) return
  const id = hashOrId.startsWith('#') ? hashOrId.slice(1) : hashOrId
  if (!id || id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

/** Use on in-page links: `@click="handleInPageAnchorClick($event, link.href)"` */
export function handleInPageAnchorClick(e: MouseEvent, href: string) {
  if (!href.startsWith('#')) return
  e.preventDefault()
  scrollToPageSection(href)
}

import type { Directive } from 'vue'

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
)

export const vReveal: Directive = {
  mounted(el, binding) {
    let variant = 'up'
    if (binding.modifiers.left)  variant = 'left'
    if (binding.modifiers.right) variant = 'right'
    if (binding.modifiers.scale) variant = 'scale'
    if (binding.modifiers.fade)  variant = 'fade'

    el.classList.add('reveal', `reveal-${variant}`)

    if (typeof binding.value === 'number') {
      el.style.transitionDelay = `${binding.value}ms`
    }

    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  },
}

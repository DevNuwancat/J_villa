<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logo_stroke from '../assets/logo_stroke.png'

const props = withDefaults(defineProps<{
  subLinks?: { href: string; label: string }[]
}>(), {
  subLinks: () => [],
})

const route = useRoute()
const isHome = computed(() => route.path === '/')

const navLinks = [
  { hash: '#about',      label: 'Our Story'  },
  { hash: '#rooms',      label: 'Villas'     },
  { hash: '#experience', label: 'Experience' },
  { hash: '#location',   label: 'Location'   },
  { hash: '#book',       label: 'Reserve'    },
]

function navHref(hash: string) {
  return isHome.value ? hash : `/${hash}`
}

const mobileMenuOpen = ref(false)
const navScrolled    = ref(false)
const temperature    = ref('32 °C')

function onScroll() {
  navScrolled.value = window.scrollY > 80
}

async function fetchWeather() {
  try {
    const res  = await fetch('https://api.open-meteo.com/v1/forecast?latitude=7.9573&longitude=80.7600&current_weather=true')
    const data = await res.json()
    if (data.current_weather) {
      temperature.value = Math.round(data.current_weather.temperature) + ' °C'
    }
  } catch {
    // keep default value if fetch fails
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  fetchWeather()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <!-- ════════════════════════════════════════════════════════════
       TOP INFO BAR
  ════════════════════════════════════════════════════════════ -->
  <div class="hidden md:flex fixed top-0 left-0 right-0 z-[200]
              bg-jungle/95 backdrop-blur-2xl border-b border-gold/20
              px-10 py-2 items-center justify-between gap-4">

    <!-- Left side: address + live temperature -->
    <div class="flex items-center gap-8">
      <div class="flex items-center gap-2 text-stone text-xs tracking-wide font-extralight">
        <svg class="w-3 h-3 opacity-60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
        No 154/A/1, Ilukwala, Sigiriya, Sri Lanka
      </div>
      <div class="flex items-center gap-2 text-stone text-xs tracking-wide font-extralight">
        <svg class="w-3 h-3 opacity-60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <span class="font-display text-gold-light text-base font-light">{{ temperature }}</span>
        <span class="opacity-60">· Tropical</span>
      </div>
    </div>

    <!-- Center: brand logo — clicking goes home -->
    <RouterLink to="/" class="absolute left-1/2 -translate-x-1/2">
      <img :src="logo_stroke" alt="J Villa" class="h-12 w-22 object-contain hover:opacity-80 transition-opacity">
    </RouterLink>

    <!-- Right side: phone + Book Now -->
    <div class="flex items-center gap-7">
      <a href="tel:+94701560350" class="flex items-center gap-2 text-stone text-xs tracking-wide font-extralight hover:text-gold-light transition-colors">
        <svg class="w-3 h-3 opacity-60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
        </svg>
        +94 70 156 0350
      </a>
      <a :href="navHref('#book')"
         class="inline-flex items-center gap-2 bg-gold text-forest-deep
                text-[0.68rem] tracking-[0.18em] uppercase font-medium
                px-5 py-[0.42rem] hover:bg-gold-light transition-colors">
        <svg class="w-[11px] h-[11px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Book Now
      </a>
    </div>
  </div>


  <!-- ════════════════════════════════════════════════════════════
       MAIN NAVIGATION BAR
  ════════════════════════════════════════════════════════════ -->
  <nav
    class="fixed left-0 right-0 z-[190] flex items-center justify-between md:justify-center
           px-6 md:px-10 py-3 backdrop-blur-md transition-all duration-300
           top-0 md:top-[43px]"
    :class="navScrolled ? 'bg-jungle/95' : 'bg-jungle/55'"
  >
    <!-- Mobile logo — router-link to home -->
    <RouterLink to="/"
      class="font-display text-lg font-light text-gold-light tracking-[0.12em] md:hidden hover:text-gold transition-colors">
      J Villla
    </RouterLink>

    <!-- Desktop nav links -->
    <ul class="hidden md:flex gap-11 list-none">
      <li v-for="link in navLinks" :key="link.hash">
        <a :href="navHref(link.hash)"
           class="relative group text-stone/75 text-[0.7rem] tracking-[0.22em]
                  uppercase font-light hover:text-gold-light transition-colors">
          {{ link.label }}
          <span class="absolute bottom-[-3px] left-0 right-0 h-px bg-gold
                       scale-x-0 group-hover:scale-x-100 transition-transform origin-left">
          </span>
        </a>
      </li>
    </ul>

    <!-- Hamburger — mobile only -->
    <button
      @click="mobileMenuOpen = !mobileMenuOpen"
      class="md:hidden flex flex-col justify-center gap-[5px] p-2 cursor-pointer"
      aria-label="Toggle navigation menu"
    >
      <span class="block w-6 h-px bg-stone transition-all duration-300 origin-center"
            :class="mobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''"></span>
      <span class="block w-6 h-px bg-stone transition-all duration-300"
            :class="mobileMenuOpen ? 'opacity-0 scale-x-0' : ''"></span>
      <span class="block w-6 h-px bg-stone transition-all duration-300 origin-center"
            :class="mobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''"></span>
    </button>
  </nav>


  <!-- ════════════════════════════════════════════════════════════
       SUB-NAV — shown only when subLinks are passed (villa detail)
  ════════════════════════════════════════════════════════════ -->
  <div
    v-if="props.subLinks.length"
    class="hidden md:flex fixed left-0 right-0 z-185
           top-10.75 md:top-22.5
           bg-forest-deep/95 backdrop-blur-md border-b border-gold/10
           items-center justify-center gap-10 py-2.5 transition-all duration-300"
  >
    <a
      v-for="link in props.subLinks"
      :key="link.href"
      :href="link.href"
      class="relative group text-stone/60 text-[0.65rem] tracking-[0.26em]
             uppercase font-light hover:text-gold-light transition-colors"
    >
      {{ link.label }}
      <span class="absolute -bottom-0.75 left-0 right-0 h-px bg-gold
                   scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
    </a>
  </div>


  <!-- ════════════════════════════════════════════════════════════
       MOBILE FULL-SCREEN MENU OVERLAY
  ════════════════════════════════════════════════════════════ -->
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
  >
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 z-[180] bg-jungle/98 backdrop-blur-xl
             flex flex-col items-center justify-center gap-8 md:hidden"
    >
      <a
        v-for="link in navLinks"
        :key="link.hash"
        :href="navHref(link.hash)"
        @click="mobileMenuOpen = false"
        class="font-display text-4xl font-light text-cream hover:text-gold-light transition-colors tracking-wide"
      >
        {{ link.label }}
      </a>

      <!-- Sub-links in mobile menu -->
      <template v-if="props.subLinks.length">
        <div class="w-16 h-px bg-gold/30 my-2"></div>
        <a
          v-for="link in props.subLinks"
          :key="link.href + '-m'"
          :href="link.href"
          @click="mobileMenuOpen = false"
          class="font-display text-2xl font-light text-stone/70 hover:text-gold-light transition-colors tracking-wide"
        >
          {{ link.label }}
        </a>
      </template>

      <a :href="navHref('#book')"
         @click="mobileMenuOpen = false"
         class="mt-4 inline-block bg-gold text-forest-deep
                text-sm tracking-[0.18em] uppercase font-medium
                px-8 py-3 hover:bg-gold-light transition-colors">
        Book Now
      </a>
    </div>
  </Transition>
</template>

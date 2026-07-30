<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'
import { useLkrRate, usdToLkr } from '../composables/useLkrRate'

import heroImg  from '../assets/villa_view.webp'
import _g1 from '../assets/inside_room/5.webp'
import _g2 from '../assets/inside_room/7.webp'
import _g3 from '../assets/inside_room/8.webp'
import _g4 from '../assets/inside_room/11.webp'
import _g5 from '../assets/inside_room/12.webp'
import _g6 from '../assets/inside_room/13.webp'
import _g7 from '../assets/inside_room/14.webp'
import _g8 from '../assets/inside_room/15.webp'
import _g9 from '../assets/inside_room/16.webp'

const route  = useRoute()
const router = useRouter()

/* ── Villa data ──────────────────────────────────────────────── */
const villas: Record<string, {
  id: string
  tag: string
  name: string
  tagline: string
  desc: string[]
  stats: { icon: string; label: string; value: string }[]
  highlights: string[]
  price: string
  otherId: string
  otherName: string
  otherTag: string
  otherPrice: string
}> = {
  'stone-suite': {
    id:        'stone-suite',
    tag:       'Private Pool Chalet',
    name:      'J Villa Sigiriya',
    tagline:   'Private Pool Chalets Nestled in the Heart of Sigiriya',
    desc: [
      'J Villa Sigiriya offers elegant private pool chalets set around a serene garden and terrace. Each chalet features its own balcony with garden, pool, or mountain views, along with free WiFi, air-conditioning, and a private entrance — built for total privacy and comfort.',
      'Located just 9 km from Sigiriya Airport, the property is minutes from Pidurangala Rock (3.5 km) and the UNESCO-listed Sigiriya Rock Fortress (4.3 km). Free private parking is available on-site, and every morning begins with a Continental and Asian breakfast.',
    ],
    stats: [
      { icon: 'users',  label: 'Guests',    value: '2'       },
      { icon: 'bed',    label: 'Bed',       value: 'King'    },
      { icon: 'bath',   label: 'Bathroom',  value: 'Private' },
      { icon: 'pool',   label: 'Pool',      value: 'Private' },
      { icon: 'size',   label: 'Rating',    value: '10.0'    },
      { icon: 'view',   label: 'View',      value: 'Mountain'},
    ],
    highlights: [
      'Private outdoor swimming pool',
      'Free WiFi throughout',
      'Air-conditioning & private entrance',
      'Balcony with garden, pool or mountain view',
      'Tea/coffee maker & work desk',
      'Continental & Asian breakfast',
      'Free private parking on-site',
      'Flat-screen TV & free toiletries',
    ],
    price:      'From $100 / night',
    otherId:    'wood-haven',
    otherName:  'The Wood Haven',
    otherTag:   'Villa Two',
    otherPrice: 'From $100 / night',
  },
  'wood-haven': {
    id:        'wood-haven',
    tag:       'Private Pool Chalet',
    name:      'J Villa Sigiriya',
    tagline:   'Private Pool Chalets Nestled in the Heart of Sigiriya',
    desc: [
      'J Villa Sigiriya offers elegant private pool chalets set around a serene garden and terrace. Each chalet features its own balcony with garden, pool, or mountain views, along with free WiFi, air-conditioning, and a private entrance — built for total privacy and comfort.',
      'Located just 9 km from Sigiriya Airport, the property is minutes from Pidurangala Rock (3.5 km) and the UNESCO-listed Sigiriya Rock Fortress (4.3 km). Free private parking is available on-site, and every morning begins with a Continental and Asian breakfast.',
    ],
    stats: [
      { icon: 'users',  label: 'Guests',    value: '2'       },
      { icon: 'bed',    label: 'Bed',       value: 'King'    },
      { icon: 'bath',   label: 'Bathroom',  value: 'Private' },
      { icon: 'pool',   label: 'Pool',      value: 'Private' },
      { icon: 'size',   label: 'Rating',    value: '10.0'    },
      { icon: 'view',   label: 'View',      value: 'Mountain'},
    ],
    highlights: [
      'Private outdoor swimming pool',
      'Free WiFi throughout',
      'Air-conditioning & private entrance',
      'Balcony with garden, pool or mountain view',
      'Tea/coffee maker & work desk',
      'Continental & Asian breakfast',
      'Free private parking on-site',
      'Flat-screen TV & free toiletries',
    ],
    price:      'From $100 / night',
    otherId:    'stone-suite',
    otherName:  'The Stone Suite',
    otherTag:   'Villa One',
    otherPrice: 'From $100 / night',
  },
}

const villa = computed(() => villas[route.params.id as string] ?? villas['stone-suite'])

const lkrRate = useLkrRate()

function lkrPrice(price: string) {
  const usd = Number(price.match(/\d+/)?.[0] ?? 0)
  return `Rs ${usdToLkr(usd, lkrRate.value)}`
}

/* ── Gallery images (shared set) ────────────────────────────── */
const galleryImages = [
  { src: _g1, label: 'Bedroom'        },
  { src: _g2, label: 'Stone Bathroom' },
  { src: _g3, label: 'Living Area'    },
  { src: _g4, label: 'Dining'         },
  { src: _g5, label: 'Terrace'        },
  { src: _g6, label: 'Infinity Pool'  },
  { src: _g7, label: 'Villa Exterior' },
  { src: _g8, label: 'Kitchen'        },
  { src: _g9, label: 'Sunset Views'   },
]

/* ── Lightbox ────────────────────────────────────────────────── */
const lightboxIndex = ref(-1)
function openLightbox(i: number) { lightboxIndex.value = i }
function closeLightbox()          { lightboxIndex.value = -1 }
function lightboxPrev() {
  lightboxIndex.value = (lightboxIndex.value - 1 + galleryImages.length) % galleryImages.length
}
function lightboxNext() {
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryImages.length
}

/* ── Stat icon paths ─────────────────────────────────────────── */
const iconPaths: Record<string, string> = {
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 3a4 4 0 110 8 4 4 0 010-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  bed:   'M3 12h18M3 12V6a1 1 0 011-1h4a1 1 0 011 1v6M3 12v6m18-6v6M9 7h6v5H9V7zM1 20h22',
  bath:  'M4 12h16M4 12a4 4 0 01-4-4V4h4M4 12v8M20 12a4 4 0 004-4V4h-4M20 12v8M8 20h8',
  pool:  'M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 18c2-3 4-3 6 0s4 3 6 0 4-3 6 0M12 3v5M9 5l3-2 3 2',
  size:  'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  view:  'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0',
}
</script>

<template>
  <div class="bg-jungle text-cream font-body overflow-x-hidden">

    <AppNav :sub-links="[
      { href: '#overview', label: 'Overview'  },
      { href: '#gallery',  label: 'Gallery'   },
      { href: '#book',     label: 'Reserve'   },
    ]" />

    <!-- ════════════════════════════════════════════════════════
         HERO — full-screen hero.jpg with villa name overlay
    ════════════════════════════════════════════════════════ -->
    <section id="overview" class="relative h-screen overflow-hidden">
      <img
        :src="heroImg"
        alt="J Villa Sigiriya private pool chalet near Sigiriya Rock Fortress"
        class="absolute inset-0 w-full h-full object-cover scale-[1.03]"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-jungle/95"></div>

      <!-- Text -->
      <div class="absolute inset-0 z-10 flex flex-col items-center justify-end
                  pb-28 md:pb-32 text-center px-6">
        <p class="text-[0.63rem] tracking-[0.42em] uppercase text-gold-light font-extralight mb-4
                  opacity-0 animate-[fadeUp_1s_0.3s_forwards]">
          {{ villa.tag }} · J Villla · Sigiriya
        </p>
        <h1 class="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-light leading-[1.05] text-white
                   opacity-0 animate-[fadeUp_1s_0.5s_forwards]"
            style="text-shadow:0 2px 24px rgba(0,0,0,0.7)">
          {{ villa.name }}
        </h1>
        <p class="text-[0.78rem] text-stone tracking-[0.16em] font-extralight mt-3 uppercase
                  opacity-0 animate-[fadeUp_1s_0.7s_forwards]"
           style="text-shadow:0 1px 8px rgba(0,0,0,0.7)">
          {{ villa.tagline }}
        </p>
        <div class="mt-9 flex gap-3 flex-wrap justify-center opacity-0 animate-[fadeUp_1s_0.9s_forwards]">
          <a href="#book"
             class="bg-gold text-forest-deep px-8 py-3.5 text-[0.73rem] tracking-[0.2em]
                    uppercase font-medium hover:bg-gold-light hover:-translate-y-0.5 transition-all">
            Reserve This Villa
          </a>
          <a href="#gallery"
             class="border border-cream/35 text-cream px-8 py-3.5 text-[0.73rem] tracking-[0.2em]
                    uppercase font-extralight hover:border-gold-light hover:text-gold-light transition-all">
            View Gallery
          </a>
        </div>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════
         QUICK STATS BAR
    ════════════════════════════════════════════════════════ -->
    <div class="bg-forest-deep border-b border-gold/10 py-5 px-4 md:px-12
                flex flex-wrap items-center justify-center gap-6 md:gap-14">
      <div
        v-for="(stat, i) in villa.stats"
        :key="stat.label"
        v-reveal.scale="i * 80"
        class="flex flex-col items-center gap-1.5"
      >
        <svg class="w-4 h-4 text-gold opacity-70" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5">
          <path :d="iconPaths[stat.icon]"/>
        </svg>
        <span class="font-display text-base text-gold-light font-light leading-none">{{ stat.value }}</span>
        <span class="text-[0.58rem] tracking-[0.22em] uppercase text-stone/50 font-extralight">{{ stat.label }}</span>
      </div>
    </div>


    <!-- ════════════════════════════════════════════════════════
         DETAILS — description left, highlights right
    ════════════════════════════════════════════════════════ -->
    <section class="bg-forest-deep py-24 md:py-28 px-6 md:px-12">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24">

        <!-- Left: description -->
        <div v-reveal.left>
          <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
            About this Villa
          </span>
          <h2 class="font-display text-[clamp(1.9rem,3vw,2.8rem)] font-light leading-[1.15] text-cream mb-7">
            {{ villa.name }}
          </h2>
          <p v-for="(p, i) in villa.desc" :key="i"
             class="text-[0.9rem] leading-[1.9] text-stone/65 font-extralight"
             :class="i > 0 ? 'mt-5' : ''">
            {{ p }}
          </p>

          <div class="mt-10 flex gap-3 flex-wrap">
            <a href="#book"
               class="bg-gold text-forest-deep px-8 py-3.5 text-[0.73rem] tracking-[0.2em]
                      uppercase font-medium hover:bg-gold-light transition-all inline-block">
              Reserve Now
            </a>
            <a href="https://wa.me/94701560350" target="_blank"
               class="border border-gold/35 text-cream px-8 py-3.5 text-[0.73rem] tracking-[0.2em]
                      uppercase font-extralight hover:border-gold-light hover:text-gold-light transition-all inline-block">
              Enquire via WhatsApp
            </a>els
          </div>
        </div>

        <!-- Right: room highlights -->
        <div v-reveal.right>
          <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
            Room Highlights
          </span>
          <ul class="flex flex-col divide-y divide-gold/10">
            <li
              v-for="h in villa.highlights"
              :key="h"
              class="flex items-center gap-4 py-4 text-[0.85rem] text-stone/75 font-extralight tracking-wide"
            >
              <span class="w-5 h-px bg-gold shrink-0"></span>
              {{ h }}
            </li>
          </ul>

          <!-- Price tag -->
          <div class="mt-8 border border-gold/20 px-6 py-5 inline-block">
            <span class="text-[0.6rem] tracking-[0.3em] uppercase text-gold font-normal block mb-1">Starting from</span>
            <span class="font-display text-3xl text-gold-light font-light">{{ villa.price.replace('From ', '') }}</span>
            <span class="text-[0.7rem] text-stone/60 font-extralight block mt-1">≈ {{ lkrPrice(villa.price) }} / night</span>
            <span class="text-[0.65rem] text-stone/40 font-extralight block mt-1">per night · bed and breakfast</span>
          </div>

          <!-- Good to know / house rules -->
          <div class="mt-8">
            <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-4">
              Good to Know
            </span>
            <ul class="flex flex-col gap-2.5 text-[0.8rem] text-stone/60 font-extralight">
              <li>Check-in: 14:00 – 00:00 · Check-out: 07:00 – 11:00</li>
              <li>Cash only on arrival</li>
              <li>Children are not allowed · no cots or extra beds</li>
              <li>Pets are not allowed</li>
              <li>No age restriction on check-in</li>
              <li>English & Hindi spoken</li>
            </ul>
          </div>
        </div>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════
         GALLERY — portrait box grid, click to lightbox
    ════════════════════════════════════════════════════════ -->
    <section id="gallery" class="bg-jungle py-20 md:py-24">

      <div v-reveal class="text-center mb-10 px-6">
        <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
          The Gallery
        </span>
        <h2 class="font-display text-[clamp(2rem,3vw,3rem)] font-light leading-[1.15] text-cream">
          Inside the <em class="italic text-gold-light">{{ villa.name }}</em>
        </h2>
      </div>

      <!-- Portrait grid: 3 cols desktop, 2 cols mobile, aspect-[3/4] -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-0.5">
        <div
          v-for="(img, i) in galleryImages"
          :key="img.label"
          v-reveal.scale="i * 80"
          class="relative overflow-hidden group cursor-pointer aspect-[3/4]"
          @click="openLightbox(i)"
        >
          <img
            :src="img.src"
            :alt="img.label"
            class="absolute inset-0 w-full h-full object-cover
                   transition-all duration-600 group-hover:scale-[1.07] group-hover:brightness-50"
          />
          <!-- Hover: expand icon -->
          <div class="absolute inset-0 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg class="w-6 h-6 text-white/70" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.3">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </div>
        </div>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════
         BOOK SECTION
    ════════════════════════════════════════════════════════ -->
    <section id="book" class="bg-forest text-center border-t border-gold/15 py-20 md:py-24 px-6">
      <div v-reveal class="flex items-center gap-4 max-w-65 mx-auto mb-10">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent to-gold"></div>
        <div class="w-1.5 h-1.5 bg-gold rotate-45"></div>
        <div class="flex-1 h-px bg-gradient-to-l from-transparent to-gold"></div>
      </div>
      <span v-reveal class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">Reservations</span>
      <h2 v-reveal="100" class="font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-cream mb-4">
        Reserve {{ villa.name }}
      </h2>
      <p v-reveal="200" class="text-[0.88rem] text-stone/60 font-extralight leading-[1.85] max-w-110 mx-auto mb-10">
        Message us directly — no bots, no forms. Just us, ready to craft your perfect stay.
      </p>
      <div class="flex gap-3 justify-center flex-wrap mb-6">
        <!-- Booking.com -->
        <a href="https://www.booking.com/Share-pLuXQS0"
           target="_blank"
           class="inline-flex items-center gap-2.5 bg-[#003580] text-white
                  px-8 md:px-10 py-4 text-[0.75rem] tracking-[0.18em] uppercase font-medium
                  hover:bg-[#00224f] hover:-translate-y-0.5 transition-all">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.39 13.84c.28-.7.44-1.46.44-2.26 0-3.43-2.79-6.22-6.22-6.22H6.03V19.5h3.75v-4.22h4.83c.57 0 1.11-.09 1.62-.25l2.39 4.47h4.18l-2.41-5.66zM13.96 12H9.78V8.64h4.18c.93 0 1.68.75 1.68 1.68S14.89 12 13.96 12z"/>
          </svg>
          Book on Booking.com
        </a>

        <!-- WhatsApp -->
        <a href="https://wa.me/94701560350?text=Hello%20J%20Villla%2C%20I'd%20like%20to%20enquire%20about%20a%20stay."
           target="_blank"
           class="inline-flex items-center gap-2.5 bg-gold text-forest-deep
                  px-8 md:px-10 py-4 text-[0.75rem] tracking-[0.18em] uppercase font-medium
                  hover:bg-gold-light hover:-translate-y-0.5 transition-all">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp Us
        </a>

        <!-- Email -->
        <a href="mailto:jvillahotels@gmail.com?subject=Reservation%20Enquiry"
           class="inline-block border border-gold/35 text-cream
                  px-8 md:px-10 py-4 text-[0.75rem] tracking-[0.18em] uppercase font-extralight
                  hover:border-gold-light hover:text-gold-light transition-all">
          Email Us
        </a>
      </div>
      <p class="text-[0.68rem] text-stone/30 tracking-[0.1em] font-extralight">
        Typically respond within 2 hours · Available 7am – 9pm Sri Lanka Time
      </p>
    </section>


    <!-- ════════════════════════════════════════════════════════
         OTHER VILLA — quick link card
    ════════════════════════════════════════════════════════ -->
    <section class="bg-forest-deep border-t border-gold/10 py-20 md:py-24 px-6 md:px-12">
      <div class="max-w-6xl mx-auto">
        <!-- Single image with a centered "Back to Home" CTA -->
        <div
          class="relative overflow-hidden group cursor-pointer max-w-3xl mx-auto"
          @click="router.push('/')"
        >
          <img
            :src="_g9"
            alt="J Villa Sigiriya"
            class="w-full h-[340px] md:h-[420px] object-cover brightness-[0.55]
                   transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-[0.4]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-jungle/90 to-transparent"></div>

          <!-- Back to Home CTA -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="border border-gold/50 text-gold-light px-8 py-3
                         text-[0.68rem] tracking-[0.22em] uppercase font-light
                         transition-all duration-400 group-hover:border-gold group-hover:text-gold">
              ← Back to Home
            </span>
          </div>
        </div>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════
         LIGHTBOX
    ════════════════════════════════════════════════════════ -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="lightboxIndex >= 0"
        class="fixed inset-0 z-300 bg-black/93 backdrop-blur-sm flex items-center justify-center"
        @click.self="closeLightbox"
      >
        <button @click="closeLightbox"
                class="absolute top-5 right-6 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Close">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <p class="absolute top-6 left-1/2 -translate-x-1/2
                  text-[0.62rem] tracking-[0.28em] uppercase text-white/40 font-extralight">
          {{ lightboxIndex + 1 }} / {{ galleryImages.length }}
        </p>

        <button @click="lightboxPrev"
                class="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors"
                aria-label="Previous">
          <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div class="flex flex-col items-center gap-5 px-16 md:px-24 w-full max-w-4xl">
          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-[0.97]"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-[0.97]"
          >
            <img
              :key="lightboxIndex"
              :src="galleryImages[lightboxIndex].src"
              :alt="galleryImages[lightboxIndex].label"
              class="max-h-[80vh] max-w-full object-contain shadow-2xl"
            />
          </Transition>
        </div>

        <button @click="lightboxNext"
                class="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors"
                aria-label="Next">
          <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </Transition>

    <AppFooter />

  </div>
</template>


<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0);    }
}
</style>

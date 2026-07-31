<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'
import LocationMap from '../components/LocationMap.vue'
import { useLkrRate, usdToLkr } from '../composables/useLkrRate'

// Hero media imports — images and video
import hero1 from '../assets/hero/hero1.webp'
import hero2 from '../assets/hero/hero2.webp'
import hero3 from '../assets/hero/hero3.webp'
import elephant from '../assets/elephant.webp'

import inifinity_pool from '../assets/hero/Pool.webp'
import food from '../assets/hero/food2.webp'
import sigiriya from '../assets/sigiriya.webp'
import room1 from '../assets/J_vill_room.webp'

import near_spa from '../assets/near/spa.webp'
import near_temple from '../assets/near/temple.webp'
import near_rock from '../assets/near/pindurangala.webp'


import _ig1 from '../assets/insta_gallery/1.webp'
import _ig2 from '../assets/insta_gallery/2.webp'
import _ig3 from '../assets/insta_gallery/3.webp'
import _ig4 from '../assets/insta_gallery/4.webp'
import _ig7 from '../assets/insta_gallery/7.webp'
import _ig8 from '../assets/insta_gallery/8.webp'
import _ig13 from '../assets/insta_gallery/13.webp'
import _ig18 from '../assets/insta_gallery/18.webp'
import _ig20 from '../assets/insta_gallery/20.webp'
import _igPool from '../assets/insta_gallery/Pool.webp'
import _igFood from '../assets/insta_gallery/food.webp'
import _igHero2 from '../assets/insta_gallery/hero2.webp'

const galleryImages = [
  { src: _ig1,     label: 'The Villa'          },
  { src: _ig2,     label: 'Bedroom Retreat'    },
  { src: _ig3,     label: 'Jungle Terrace'     },
  { src: _ig4,     label: 'Stone Bathroom'     },
  { src: _ig7,     label: 'Villa Exterior'     },
  { src: _ig8,     label: 'Living Pavilion'    },
  { src: _ig13,    label: 'Open-Air Dining'    },
  { src: _ig18,    label: 'Kitchen & Dining'   },
  { src: _ig20,    label: 'Infinity Pool'      },
  { src: _igPool,  label: 'Forest Canopy Pool' },
  { src: _igFood,  label: 'Jungle Dining'      },
  { src: _igHero2, label: 'Sunset Views'       },
]

const lightboxIndex = ref(-1)

function openLightbox(i: number) { lightboxIndex.value = i }
function closeLightbox()          { lightboxIndex.value = -1 }
function lightboxPrev() {
  lightboxIndex.value = (lightboxIndex.value - 1 + galleryImages.length) % galleryImages.length
}
function lightboxNext() {
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryImages.length
}


/* ─────────────────────────────────────────────────────────────────
   HERO SLIDER DATA — four background images that rotate every 6s
───────────────────────────────────────────────────────────────── */
const heroSlides = [
  { type: 'image', src: hero1    },
  { type: 'image', src: hero2    },
  { type: 'image', src: hero3    },
]

/* ─────────────────────────────────────────────────────────────────
   VILLA / ROOM DATA — two villa cards shown in the Rooms section
───────────────────────────────────────────────────────────────── */
const rooms = [
  {
    id:    'stone-suite',
    image: room1,
    tag:      'Private Pool Chalet',
    name:     'J Villa Sigiriya',
    features: [
      'Private outdoor swimming pool',
      'Free WiFi throughout',
      'Balcony with garden, pool or mountain view',
      'Air-conditioning & private entrance',
      'Continental & Asian breakfast',
      'Free private parking on-site',
    ],
    price: 'From $100 / night',
  },
]

/* ─────────────────────────────────────────────────────────────────
   EXPERIENCE SECTION DATA — three full-height panels
   "align" controls whether the text is on the left or right side
───────────────────────────────────────────────────────────────── */
const experiences = [
  {
    image:    inifinity_pool,
    number:   '01',
    title:    'Infinity Pool',
    desc:     'Float above the forest canopy in our signature infinity pool. Designed to dissolve into the jungle horizon — a meditation as much as a swim.',
    link:     '#book',
    linkText: 'Reserve Now',
    align:    'left',
  },
  {
    image:    sigiriya,
    number:   '02',
    title:    'Sigiriya Rock',
    desc:     "UNESCO World Heritage wonder just 3km away. An ancient citadel rising 200 metres from the jungle floor — one of Asia's most breathtaking sights.",
    link:     '#location',
    linkText: 'Explore',
    align:    'right',
  },
  {
    image:    food,
    number:   '03',
    title:    'Explore Your Taste',
    desc:     'Breakfast served open-air each morning amid the quiet of the Sigiriya forest. Fresh tropical fruits, local spices, and nothing but stillness as your soundtrack.',
    link:     '#book',
    linkText: 'Book Your Stay',
    align:    'left',
  },
]

/* ─────────────────────────────────────────────────────────────────
   LOCATION PERKS DATA — distance list near Sigiriya
───────────────────────────────────────────────────────────────── */
const locationPerks = [
  { distance: '3 km',   name: 'Sigiriya Rock Fortress (UNESCO World Heritage)' },
  { distance: '20 min', name: 'Dambulla Cave Temple'                            },
  { distance: '45 min', name: 'Polonnaruwa Ancient City'                        },
  { distance: '4 hrs',  name: 'Bandaranaike International Airport, Colombo'     },
]

/* ─────────────────────────────────────────────────────────────────
   NEARBY EXPERIENCES — auto-scrolling carousel of things to do
───────────────────────────────────────────────────────────────── */
const nearbyExperiences = [
  {
    image: near_spa,
    title: 'Ancient Ayurvedic Spa',
    distance: '5 min away',
    desc: 'A traditional Ayurvedic spa just minutes from the villa — herbal oils, ancient remedies, total stillness.',
  },
  {
    image: elephant,
    title: 'Jungle Safari',
    distance: '30 min away',
    desc: 'Track elephants and native wildlife through the dry-zone jungle on a guided safari.',
  },
  {
    image: near_rock,
    title: 'Pidurangala Rock',
    distance: 'Minutes away',
    desc: 'Climb the rock face at dawn for the finest sunrise view of Sigiriya in Sri Lanka.',
  },
  {
    image: near_temple,
    title: 'Dambulla Cave Temple',
    distance: '20 min away',
    desc: 'A UNESCO World Heritage cave temple adorned with centuries-old Buddhist murals and statues.',
  },
]


const lkrRate = useLkrRate()

function lkrPrice(price: string) {
  const usd = Number(price.match(/\d+/)?.[0] ?? 0)
  return `Rs ${usdToLkr(usd, lkrRate.value)}`
}

const currentSlide = ref(0)

let sliderTimer: ReturnType<typeof setInterval>

function goToSlide(n: number) {
  currentSlide.value = ((n % heroSlides.length) + heroSlides.length) % heroSlides.length
  restartTimer()
}

function changeSlide(dir: number) {
  goToSlide(currentSlide.value + dir)
}

function restartTimer() {
  clearInterval(sliderTimer)
  sliderTimer = setInterval(() => changeSlide(1), 6000)
}

onMounted(() => restartTimer())
onUnmounted(() => clearInterval(sliderTimer))
</script>

<template>
  <!-- Root wrapper — sets the base background colour and font -->
  <div class="bg-jungle text-cream font-body overflow-x-hidden">


    <!-- ════════════════════════════════════════════════════════════
         NAVIGATION — top info bar + main nav + mobile menu overlay
         Extracted into AppNav for reuse across views.
    ════════════════════════════════════════════════════════════ -->
    <AppNav />


    <!-- ════════════════════════════════════════════════════════════
         HERO SECTION — full-screen image slider
         Four slides fade in/out automatically every 6 seconds.
         Users can also click the arrows or dots to navigate.
    ════════════════════════════════════════════════════════════ -->
    <section id="home" class="relative h-screen overflow-hidden">

      <!-- ── Slides loop ────────────────────────────────────────── -->
      <!-- Each slide is stacked on top of each other (absolute).   -->
      <!-- Only the active one (currentSlide) has opacity-100.      -->
      <div
        v-for="(slide, i) in heroSlides"
        :key="i"
        class="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        :class="i === currentSlide ? 'opacity-100' : 'opacity-0'"
      >
        <!-- IMAGE slide — slow Ken-Burns zoom when active -->
        <div
          class="absolute inset-0 bg-cover bg-center transition-transform duration-[9000ms] ease-in-out"
          :class="i === currentSlide ? 'scale-100' : 'scale-[1.06]'"
          :style="{ backgroundImage: `url('${slide.src}')` }"
        ></div>

        <!-- Gradient overlay: subtle at top, dark at bottom for text readability -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-jungle/95"></div>
      </div>

      <!-- ── Hero text content ──────────────────────────────────── -->
      <div class="absolute inset-0 z-10 flex flex-col items-center justify-end
                  pb-28 md:pb-32 text-center px-6">

        <!-- Small eyebrow label -->
        <p class="text-[0.68rem] tracking-[0.42em] uppercase text-gold-light font-extralight mb-5
                  opacity-0 animate-[fadeUp_1s_0.3s_forwards]"
           style="text-shadow: 0 2px 12px rgba(0,0,0,0.8)">
          Eco Luxury · Sigiriya · Sri Lanka
        </p>

        <!-- Main headline -->
        <h1 class="font-display text-[clamp(3rem,7vw,6.5rem)] font-light leading-[1.05] text-white
                   opacity-0 animate-[fadeUp_1s_0.5s_forwards]"
            style="text-shadow: 0 2px 24px rgba(0,0,0,0.7)">
          Where Sigiriya<br>Meets <em class="italic text-gold-light">Luxury</em>
        </h1>

        <!-- Sub-heading -->
        <p class="text-[0.8rem] text-stone tracking-[0.18em] font-extralight mt-4 uppercase
                  opacity-0 animate-[fadeUp_1s_0.7s_forwards]"
           style="text-shadow: 0 1px 8px rgba(0,0,0,0.7)">
          Two Private Villas · Infinity Pool · Stone &amp; Wood
        </p>

        <!-- Call-to-action buttons -->
        <div class="mt-10 flex gap-3 flex-wrap justify-center opacity-0 animate-[fadeUp_1s_0.9s_forwards]">
          <a href="#book"
             class="bg-gold text-forest-deep px-8 py-3.5 text-[0.75rem] tracking-[0.2em]
                    uppercase font-medium hover:bg-gold-light hover:-translate-y-0.5 transition-all">
            Reserve Your Villa
          </a>
          <a href="#rooms"
             class="border border-cream/35 text-cream px-8 py-3.5 text-[0.75rem] tracking-[0.2em]
                    uppercase font-extralight hover:border-gold-light hover:text-gold-light transition-all">
            Discover Rooms
          </a>
        </div>
      </div>

      <!-- ── Previous / Next arrow buttons ─────────────────────── -->
      <div class="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20
                  flex justify-between px-4 md:px-8 pointer-events-none">
        <button
          @click="changeSlide(-1)"
          class="pointer-events-auto w-12 h-12 border border-gold/40 bg-jungle/35 text-gold-light
                 flex items-center justify-center backdrop-blur-sm hover:bg-gold/20 hover:border-gold transition-all"
          aria-label="Previous slide"
        >
          <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button
          @click="changeSlide(1)"
          class="pointer-events-auto w-12 h-12 border border-gold/40 bg-jungle/35 text-gold-light
                 flex items-center justify-center backdrop-blur-sm hover:bg-gold/20 hover:border-gold transition-all"
          aria-label="Next slide"
        >
          <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <!-- ── Dot indicators ─────────────────────────────────────── -->
      <!-- Active dot is wider and gold; others are short and white  -->
      <div class="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        <button
          v-for="(_, i) in heroSlides"
          :key="i"
          @click="goToSlide(i)"
          class="h-0.5 transition-all duration-300 cursor-pointer"
          :class="i === currentSlide ? 'w-11 bg-gold' : 'w-7 bg-white/25'"
          :aria-label="`Go to slide ${i + 1}`"
        ></button>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════════
         INFO STRIP — quick highlight badges below the hero
    ════════════════════════════════════════════════════════════ -->
    <div class="bg-forest-deep border-b border-gold/10 py-6 px-4 md:px-12
                flex flex-wrap items-center justify-center gap-5 md:gap-11">
      <div
        v-for="item in ['2 Exclusive Villas', 'Infinity Pool', 'Eco Certified', 'Stone & Wood Interiors', 'Total Privacy', 'Near Sigiriya Rock']"
        :key="item"
        class="flex items-center gap-3 text-stone text-[0.7rem] tracking-[0.2em] uppercase font-extralight"
      >
        <!-- Small gold dot separator -->
        <span class="w-1 h-1 rounded-full bg-gold shrink-0"></span>
        {{ item }}
      </div>
    </div>


    <!-- ════════════════════════════════════════════════════════════
         ABOUT SECTION — story text on the left, image on the right
         On mobile, the image stacks below the text.
    ════════════════════════════════════════════════════════════ -->
    <section id="about" class="bg-forest-deep py-24 md:py-28 px-6 md:px-12">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

        <!-- Left: Story text -->
        <div v-reveal.left>
          <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
            The Villa
          </span>
          <h2 class="font-display text-[clamp(2.2rem,3.5vw,3.2rem)] font-light leading-[1.15] text-cream">
            A Hidden Sanctuary<br>in <em class="italic text-gold-light">Sigiriya</em>
          </h2>
          <p class="text-[0.9rem] leading-[1.9] text-stone/65 font-extralight mt-6">
            Nestled among centuries-old jungle near the iconic Sigiriya rock fortress, J Villla offers
            two exclusive luxury villas crafted from natural stone and reclaimed wood — built in harmony
            with the land, not against it.
          </p>
          <p class="text-[0.9rem] leading-[1.9] text-stone/65 font-extralight mt-4">
            Designed for those who seek total privacy without sacrifice. You will not hear your neighbours.
            You will hear the birds, the wind through the trees, and nothing more.
          </p>
        </div>

        <!-- Right: Image with a floating "2 Luxury Villas" badge -->
        <div v-reveal.right class="relative mt-8 md:mt-0">
          <img
            :src="hero3"
            alt="J Villa Sigiriya private pool chalet exterior in the Sigiriya jungle"
            class="w-full h-90 md:h-125 object-cover block"
          />
          <!-- Badge overlaps the bottom-left corner of the image -->
          <div class="absolute -bottom-6 -left-4 md:-left-6 bg-forest-mid border border-gold/30 px-7 py-6 md:px-8 md:py-7">
            <span class="font-display text-[3.8rem] text-gold-light font-light leading-none block">2</span>
            <span class="text-[0.62rem] tracking-[0.2em] uppercase text-stone font-extralight block mt-1">Luxury Villas</span>
          </div>
        </div>

      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════════
         ROOMS / VILLAS SECTION
         Two villa cards side by side on desktop, stacked on mobile.
         Hover over a card to reveal the amenity list + price.
    ════════════════════════════════════════════════════════════ -->
    <section id="rooms" class="bg-jungle py-24 md:py-28 px-6 md:px-12">

      <!-- Section heading -->
      <div v-reveal class="text-center mb-16">
        <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
          Accommodation
        </span>
        <h2 class="font-display text-[clamp(2.2rem,3.5vw,3.2rem)] font-light leading-[1.15] text-cream">
          One Sanctuary,<br><em class="italic text-gold-light">Endless Serenity</em>
        </h2>
      </div>

      <!-- Villa card -->
      <div class="max-w-6xl mx-auto">

        <RouterLink
          v-for="(room, i) in rooms"
          :key="room.name"
          :to="`/villa/${room.id}`"
          v-reveal.scale="i * 150"
          class="relative overflow-hidden cursor-pointer group block"
        >
          <!-- Room image — zooms & darkens when you hover the card -->
          <img
            :src="room.image"
            :alt="room.name"
            class="w-full h-[70vh] md:h-[85vh] object-cover block brightness-90
                   transition-all duration-800 group-hover:scale-[1.06] group-hover:brightness-[0.35]"
          />

          <!-- Gradient: light at rest, deepens on hover via group -->
          <div class="absolute inset-0 bg-gradient-to-t from-jungle/70 via-transparent to-transparent
                      transition-all duration-[800ms] group-hover:from-jungle/95 group-hover:via-jungle/30" style="transition-duration:800ms"></div>

          <!-- Villa name — fades out on hover (desktop) -->
          <div class="absolute bottom-0 left-0 right-0 p-8 md:p-10
                      transition-all duration-500 md:group-hover:opacity-0 md:group-hover:translate-y-4">
            <span class="text-[0.63rem] tracking-[0.32em] uppercase text-gold-light font-light block mb-2">
              {{ room.tag }}
            </span>
            <span class="font-display text-3xl font-light text-cream block">
              {{ room.name }}
            </span>
            <!-- Always-visible tap affordance — hover reveals the full
                 amenities panel on desktop, but touch devices have no
                 hover state, so this pill is the only cue that the card
                 is tappable. Hidden on desktop where the hover panel
                 already does that job. -->
            <span class="md:hidden inline-flex items-center gap-2 mt-4 text-[0.68rem]
                         tracking-[0.2em] uppercase text-gold-light font-light
                         border border-gold-light/40 px-4 py-2">
              View Details
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </div>

          <!-- Amenities list + price — centered in the card on hover -->
          <div class="absolute inset-0 flex flex-col items-center justify-center px-10
                      opacity-0 transition-opacity duration-400 delay-100 group-hover:opacity-100">
            <span class="text-[0.63rem] tracking-[0.32em] uppercase text-gold-light font-light block mb-3 text-center">
              {{ room.tag }}
            </span>
            <span class="font-display text-4xl font-light text-cream block mb-6 text-center">
              {{ room.name }}
            </span>
            <div class="w-8 h-px bg-gold mb-6"></div>
            <ul class="flex flex-col gap-2.5 mb-7 w-full max-w-70">
              <li
                v-for="feature in room.features"
                :key="feature"
                class="flex items-center gap-3 text-[0.82rem] text-stone font-extralight tracking-wide"
              >
                <span class="w-[18px] h-px bg-gold shrink-0"></span>
                {{ feature }}
              </li>
            </ul>
            <p class="font-display text-2xl text-gold-light font-light">{{ room.price }}</p>
            <p class="text-[0.75rem] text-stone/60 font-extralight mt-1">≈ {{ lkrPrice(room.price) }} / night</p>
          </div>

        </RouterLink>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════════
         EXPERIENCE SECTION — three full-height panels stacked vertically
         Each has a full-bleed background image and text overlay.
         Alternates left-aligned and right-aligned text.
    ════════════════════════════════════════════════════════════ -->
    <section id="experience" class="bg-jungle">

      <div
        v-for="exp in experiences"
        :key="exp.number"
        class="relative h-[60vh] md:h-[88vh] overflow-hidden group"
      >
        <!-- Background image — bright, scales slightly on hover -->
        <div
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03] brightness-110"
          :style="{ backgroundImage: `url('${exp.image}')` }"
        ></div>

        <!-- Text-side dark band only — photo side stays fully clear -->
        <div
          class="absolute inset-0"
          :class="exp.align === 'left'
            ? 'bg-gradient-to-r from-black/70 via-black/35 to-transparent'
            : 'bg-gradient-to-l from-black/70 via-black/35 to-transparent'"
        ></div>

        <!-- Text content — aligned left or right depending on data -->
        <div
          v-reveal.fade
          class="absolute inset-0 flex flex-col justify-center px-8 md:px-20"
          :class="exp.align === 'right' ? 'items-end text-right' : 'items-start'"
        >
          <!-- Large faded number in the background -->
          <p class="font-display text-[5rem] text-gold/10 font-light leading-none mb-[-1.5rem]">
            {{ exp.number }}
          </p>
          <h3 class="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream mb-4"
              style="text-shadow: 0 2px 24px rgba(0,0,0,0.75)">
            {{ exp.title }}
          </h3>
          <p class="text-[0.88rem] text-stone/90 font-extralight leading-[1.85] max-w-[380px]"
             style="text-shadow: 0 1px 10px rgba(0,0,0,0.85)">
            {{ exp.desc }}
          </p>
          <a
            :href="exp.link"
            class="mt-8 inline-block px-8 py-3 border border-gold/35 text-gold-light
                   text-[0.68rem] tracking-[0.22em] uppercase font-light
                   hover:bg-gold/10 hover:border-gold transition-all"
          >
            {{ exp.linkText }}
          </a>
        </div>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════════
         LOCATION SECTION — text on the left, landscape photo on the right
    ════════════════════════════════════════════════════════════ -->
    <section id="location" class="bg-forest-deep grid grid-cols-1 md:grid-cols-2">

      <!-- Left: Getting here text + distance list -->
      <div v-reveal.left class="px-8 md:px-16 py-16 md:py-24 flex flex-col justify-center">
        <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
          Getting Here
        </span>
        <h2 class="font-display text-[clamp(2.2rem,3.5vw,3.2rem)] font-light leading-[1.15] text-cream">
          Near Sigiriya,<br><em class="italic text-gold-light">Far from Ordinary</em>
        </h2>
        <p class="text-[0.9rem] leading-[1.9] text-stone/65 font-extralight mt-6 max-w-[380px]">
          J Villla sits minutes from one of the world's most extraordinary ancient sites — the perfect
          base for exploring Sri Lanka's Cultural Triangle.
        </p>

        <!-- Address -->
        <p class="text-[0.8rem] text-stone/70 font-extralight mt-6 tracking-wide">
          No 154/A/1, Ilukwala, Sigiriya, Sri Lanka, 21120
        </p>

        <!-- Distance list -->
        <div class="mt-10 flex flex-col gap-5">
          <div
            v-for="perk in locationPerks"
            :key="perk.name"
            class="flex items-start gap-5 pb-5 border-b border-gold/10 last:border-0"
          >
            <!-- Distance in gold -->
            <span class="font-display text-xl text-gold font-light min-w-[3.5rem] shrink-0">
              {{ perk.distance }}
            </span>
            <!-- Attraction name -->
            <span class="text-[0.8rem] text-stone font-extralight leading-relaxed pt-0.5">
              {{ perk.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right: Live map showing the villa's exact location -->
      <div v-reveal.right class="min-h-75 md:min-h-0 overflow-hidden">
        <LocationMap class="w-full h-full" />
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════════
         NEARBY EXPERIENCES — auto-scrolling carousel
    ════════════════════════════════════════════════════════════ -->
    <section class="bg-jungle py-20 md:py-24 overflow-hidden">
      <div v-reveal class="text-center mb-14 px-6">
        <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
          Beyond the Villa
        </span>
        <h2 class="font-display text-[clamp(2.2rem,3.5vw,3.2rem)] font-light leading-[1.15] text-cream">
          Nearby <em class="italic text-gold-light">Experiences</em>
        </h2>
      </div>

      <div class="relative">
        <div class="flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          <!-- Two identical groups back-to-back — the track shifts by exactly one
               group's width so the loop point is invisible. -->
          <div v-for="g in 2" :key="g" class="flex shrink-0">
            <div
              v-for="exp in nearbyExperiences"
              :key="exp.title"
              class="relative w-70 md:w-85 h-95 md:h-110 shrink-0 overflow-hidden group"
            >
              <img :src="exp.image" :alt="exp.title"
                   class="absolute inset-0 w-full h-full object-cover brightness-75
                          transition-transform duration-700 group-hover:scale-[1.06]" />
              <div class="absolute inset-0 bg-linear-to-t from-jungle/95 via-jungle/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <span class="text-[0.6rem] tracking-[0.28em] uppercase text-gold-light font-light block mb-2">
                  {{ exp.distance }}
                </span>
                <h3 class="font-display text-xl text-cream font-light mb-2">{{ exp.title }}</h3>
                <p class="text-[0.78rem] text-stone/70 font-extralight leading-[1.7]">{{ exp.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════════
         INSTAGRAM GALLERY — profile header + 4×2 square grid
    ════════════════════════════════════════════════════════════ -->
    <section class="bg-jungle py-20 md:py-28">

      <!-- Page eyebrow -->
      <div v-reveal class="text-center mb-10 px-6">
        <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
          The Gallery
        </span>
        <h2 class="font-display text-[clamp(2.2rem,3.5vw,3.2rem)] font-light leading-[1.15] text-cream">
          Life at the <em class="italic text-gold-light">Villa</em>
        </h2>
      </div>

      <!-- Instagram handle label -->
      <div class="flex items-center justify-center gap-2 mb-6">
        <svg class="w-4 h-4 text-stone/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
        </svg>
        <span class="text-[0.68rem] tracking-[0.22em] uppercase text-stone/50 font-extralight">jvillahotels</span>
      </div>

      <!-- 4-column square grid — Instagram-style tight gap -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-0.5">
        <div
          v-for="(img, i) in galleryImages"
          :key="img.label"
          v-reveal.scale="i * 80"
          class="relative overflow-hidden group cursor-pointer aspect-square"
          @click="openLightbox(i)"
        >
          <img
            :src="img.src"
            :alt="img.label"
            class="absolute inset-0 w-full h-full object-cover
                   transition-all duration-500 group-hover:scale-[1.06] group-hover:brightness-50"
          />
        </div>
      </div>

      <!-- View more on Instagram -->
      <div class="text-center mt-8 px-6">
        <a
          href="https://instagram.com/jvillahotels"
          target="_blank"
          class="inline-flex items-center gap-2.5 text-stone/50 text-[0.68rem]
                 tracking-[0.2em] uppercase font-extralight hover:text-gold-light transition-colors"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
          </svg>
          View more on Instagram
        </a>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════════
         LIGHTBOX — full-screen image viewer with prev / next
    ════════════════════════════════════════════════════════════ -->
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
        class="fixed inset-0 z-300 bg-black/92 backdrop-blur-sm
               flex items-center justify-center"
        @click.self="closeLightbox"
      >
        <!-- Close button -->
        <button
          @click="closeLightbox"
          class="absolute top-5 right-6 text-white/60 hover:text-white transition-colors z-10"
          aria-label="Close gallery"
        >
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <!-- Counter -->
        <p class="absolute top-6 left-1/2 -translate-x-1/2
                  text-[0.62rem] tracking-[0.28em] uppercase text-white/40 font-extralight">
          {{ lightboxIndex + 1 }} / {{ galleryImages.length }}
        </p>

        <!-- Prev arrow -->
        <button
          @click="lightboxPrev"
          class="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors"
          aria-label="Previous image"
        >
          <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <!-- Image + label -->
        <div class="flex flex-col items-center gap-5 px-16 md:px-24 w-full max-w-5xl">
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
              class="max-h-[78vh] max-w-full object-contain shadow-2xl"
            />
          </Transition>
        </div>

        <!-- Next arrow -->
        <button
          @click="lightboxNext"
          class="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors"
          aria-label="Next image"
        >
          <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </Transition>


    <!-- ════════════════════════════════════════════════════════════
         BOOKING / RESERVE SECTION — contact call to action
    ════════════════════════════════════════════════════════════ -->
    <section id="book" class="bg-forest text-center border-t border-gold/15 py-24 md:py-28 px-6">

      <div v-reveal class="flex items-center gap-4 max-w-65 mx-auto mb-12">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent to-gold"></div>
        <div class="w-1.5 h-1.5 bg-gold rotate-45"></div>
        <div class="flex-1 h-px bg-gradient-to-l from-transparent to-gold"></div>
      </div>

      <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
        Reservations
      </span>
      <h2 class="font-display text-[clamp(2.2rem,3.5vw,3.2rem)] font-light leading-[1.15] text-cream mb-4">
        Reserve Your Villa
      </h2>
      <p class="text-[0.88rem] text-stone/60 font-extralight leading-[1.85] max-w-110 mx-auto mb-10">
        We keep it personal. Message us directly — no bots, no forms. Just us, ready to craft your
        perfect stay at J Villla.
      </p>

      <div class="flex gap-3 justify-center flex-wrap mb-6">

        <!-- Booking.com -->
        <a
          href="https://www.booking.com/Share-pLuXQS0"
          target="_blank"
          class="inline-flex items-center gap-2.5 bg-[#003580] text-white
                 px-8 md:px-10 py-4 text-[0.75rem] tracking-[0.18em] uppercase font-medium
                 hover:bg-[#00224f] hover:-translate-y-0.5 transition-all"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.39 13.84c.28-.7.44-1.46.44-2.26 0-3.43-2.79-6.22-6.22-6.22H6.03V19.5h3.75v-4.22h4.83c.57 0 1.11-.09 1.62-.25l2.39 4.47h4.18l-2.41-5.66zM13.96 12H9.78V8.64h4.18c.93 0 1.68.75 1.68 1.68S14.89 12 13.96 12z"/>
          </svg>
          Book on Booking.com
        </a>

        <!-- WhatsApp (gold filled button) -->
        <a
          href="https://wa.me/94701560350?text=Hello%20J%20Villla%2C%20I'd%20like%20to%20enquire%20about%20a%20stay."
          target="_blank"
          class="inline-flex items-center gap-2.5 bg-gold text-forest-deep
                 px-8 md:px-10 py-4 text-[0.75rem] tracking-[0.18em] uppercase font-medium
                 hover:bg-gold-light hover:-translate-y-0.5 transition-all"
        >
          <!-- WhatsApp logo SVG -->
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp Us
        </a>

        <!-- Email (ghost / outline button) -->
        <a
          href="mailto:jvillahotels@gmail.com?subject=Reservation%20Enquiry"
          class="inline-block border border-gold/35 text-cream
                 px-8 md:px-10 py-4 text-[0.75rem] tracking-[0.18em] uppercase font-extralight
                 hover:border-gold-light hover:text-gold-light transition-all"
        >
          Email Us
        </a>
      </div>

      <!-- Response time note -->
      <p class="text-[0.68rem] text-stone/30 tracking-[0.1em] font-extralight">
        Typically respond within 2 hours &nbsp;·&nbsp; Available 7am – 9pm Sri Lanka Time
      </p>
    </section>


    <!-- ════════════════════════════════════════════════════════════
         FOOTER — brand info and link columns
    ════════════════════════════════════════════════════════════ -->
    <AppFooter />

  </div><!-- end root wrapper -->
</template>


<style>
/* ─────────────────────────────────────────────────────────────────
   HERO FADE-UP ANIMATION
   Used by the hero heading, eyebrow and buttons.
   "forwards" keeps the element visible after the animation finishes.
───────────────────────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0);    }
}

/* ─────────────────────────────────────────────────────────────────
   NEARBY EXPERIENCES MARQUEE
   Scrolls the duplicated card list exactly one set-width to the left,
   looping seamlessly since the list is rendered twice.
───────────────────────────────────────────────────────────────── */
@keyframes marquee {
  from { transform: translateX(0);     }
  to   { transform: translateX(-50%); }
}
</style>

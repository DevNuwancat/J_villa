<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppNav from '../components/AppNav.vue'

// Hero media imports — images and video
import hero1 from '../assets/hero/hero1.jpg'
import heroVideo from '../assets/hero/video.mp4'
import the_villa from '../assets/the_villa.jpg'
import elephant from '../assets/elephant.jpg'

import inifinity_pool from '../assets/inifnity_pool.jpg'
import food from '../assets/food.jpg'
import sigiriya from '../assets/sigiriya.jpg'
import room1 from '../assets/room1.jpg'


import _g1 from '../assets/rooms/1.jpg'
import _g2 from '../assets/rooms/2.jpg'
import _g3 from '../assets/rooms/3.jpg'
import _g4 from '../assets/rooms/4.jpg'
import _g5 from '../assets/rooms/5.jpg'
import _g6 from '../assets/rooms/6.jpg'

const galleryImages = [
  { src: _g6,          label: 'Infinity Pool'       },
  { src: _g1,          label: 'The Stone Suite'     },
  { src: _g5,          label: 'Jungle Terrace'      },
  { src: _g2,          label: 'Stone Bathroom'      },
  { src: the_villa,    label: 'The Villa'            },
  { src: _g3,          label: 'Living Pavilion'     },
  { src: inifinity_pool, label: 'Forest Canopy Pool' },
  { src: _g4,          label: 'Open-Air Dining'     },
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
  { type: 'video', src: heroVideo },
  { type: 'image', src: hero1    },
]

/* ─────────────────────────────────────────────────────────────────
   VILLA / ROOM DATA — two villa cards shown in the Rooms section
───────────────────────────────────────────────────────────────── */
const rooms = [
  {
    id:    'stone-suite',
    image: room1,
    tag:      'Villa One',
    name:     'The Stone Suite',
    features: [
      'King bed with forest canopy view',
      'Open-air stone bathroom',
      'Private jungle terrace',
      'Handcrafted teak furniture',
      'Rain shower & soaking tub',
      'Direct infinity pool access',
    ],
    price: 'From $280 / night',
  },
  {
    id:    'wood-haven',
    image: room1,
    tag:      'Villa Two',
    name:     'The Wood Haven',
    features: [
      'King bed with panoramic view',
      'Full teak-panelled interior',
      'Private plunge pool',
      'Handwoven textile accents',
      'Outdoor shower sanctuary',
      'Dedicated butler service',
    ],
    price: 'From $320 / night',
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
    title:    'Jungle Dining',
    desc:     'Breakfast served open-air each morning. Fresh tropical fruits, local spices, and the sound of the ancient forest as your soundtrack.',
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
   FOOTER COLUMNS DATA
───────────────────────────────────────────────────────────────── */
const footerCols = [
  {
    title: 'Stay',
    links: [
      { href: '#rooms',      label: 'The Stone Suite' },
      { href: '#rooms',      label: 'The Wood Haven'  },
      { href: '#experience', label: 'Infinity Pool'   },
    ],
  },
  {
    title: 'Explore',
    links: [
      { href: '#location',   label: 'Getting Here'  },
      { href: '#location',   label: 'Sigiriya Rock' },
      { href: '#experience', label: 'Experiences'   },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: 'https://wa.me/94XXXXXXXXX', label: 'WhatsApp'    },
      { href: 'mailto:hello@jvillla.com',  label: 'Email'       },
      { href: '#book',                     label: 'Reserve Now' },
    ],
  },
]

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
          v-if="slide.type === 'image'"
          class="absolute inset-0 bg-cover bg-center transition-transform duration-[9000ms] ease-in-out"
          :class="i === currentSlide ? 'scale-100' : 'scale-[1.06]'"
          :style="{ backgroundImage: `url('${slide.src}')` }"
        ></div>

        <!-- VIDEO slide — muted + autoplay required by browsers, playsinline for iOS -->
        <video
          v-else
          :src="slide.src"
          class="absolute inset-0 w-full h-full object-cover"
          autoplay muted loop playsinline
        ></video>

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
          Where the Jungle<br>Meets <em class="italic text-gold-light">Luxury</em>
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
        <div>
          <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
            The Villa
          </span>
          <h2 class="font-display text-[clamp(2.2rem,3.5vw,3.2rem)] font-light leading-[1.15] text-cream">
            A Hidden Sanctuary<br>in the <em class="italic text-gold-light">Ancient Forest</em>
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
        <div class="relative mt-8 md:mt-0">
          <img
            :src="the_villa"
            alt="J Villla aerial view"
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
      <div class="text-center mb-16">
        <span class="text-[0.63rem] tracking-[0.42em] uppercase text-gold font-normal block mb-5">
          Accommodation
        </span>
        <h2 class="font-display text-[clamp(2.2rem,3.5vw,3.2rem)] font-light leading-[1.15] text-cream">
          Two Sanctuaries,<br><em class="italic text-gold-light">One Philosophy</em>
        </h2>
      </div>

      <!-- Grid of villa cards -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-[3px]">

        <!-- "group" on the card lets child elements react to the card's hover state -->
        <RouterLink
          v-for="room in rooms"
          :key="room.name"
          :to="`/villa/${room.id}`"
          class="relative overflow-hidden cursor-pointer group block"
        >
          <!-- Room image — zooms & darkens when you hover the card -->
          <img
            :src="room.image"
            :alt="room.name"
            class="w-full h-[420px] md:h-[520px] object-cover block brightness-[0.68]
                   transition-all duration-[800ms] group-hover:scale-[1.06] group-hover:brightness-50"
          />

          <!-- Dark gradient at the bottom so white text is readable -->
          <div class="absolute inset-0 bg-gradient-to-t from-jungle/90 to-transparent"></div>

          <!-- Villa name — fades out on hover -->
          <div class="absolute bottom-0 left-0 right-0 p-8 md:p-10
                      transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
            <span class="text-[0.63rem] tracking-[0.32em] uppercase text-gold-light font-light block mb-2">
              {{ room.tag }}
            </span>
            <span class="font-display text-3xl font-light text-cream block">
              {{ room.name }}
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
        <!-- Background image — scales slightly on hover -->
        <div
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
          :style="{ backgroundImage: `url('${exp.image}')` }"
        ></div>

        <!-- Directional gradient: fades from one side to give the text a dark backing -->
        <div
          class="absolute inset-0"
          :class="exp.align === 'left'
            ? 'bg-gradient-to-r from-jungle/90 via-jungle/55 to-transparent'
            : 'bg-gradient-to-l from-jungle/90 via-jungle/55 to-transparent'"
        ></div>

        <!-- Text content — aligned left or right depending on data -->
        <div
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
      <div class="px-8 md:px-16 py-16 md:py-24 flex flex-col justify-center">
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

      <!-- Right: Landscape photo (set via background-image, min-height on mobile) -->
       <img src:elephant alt="" class="min-h-[300px] md:min-h-0 bg-cover bg-center">
    </section>


    <!-- ════════════════════════════════════════════════════════════
         INSTAGRAM GALLERY — profile header + 4×2 square grid
    ════════════════════════════════════════════════════════════ -->
    <section class="bg-jungle py-20 md:py-28">

      <!-- Page eyebrow -->
      <div class="text-center mb-10 px-6">
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
        <span class="text-[0.68rem] tracking-[0.22em] uppercase text-stone/50 font-extralight">jvillla</span>
      </div>

      <!-- 4-column square grid — Instagram-style tight gap -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-0.5">
        <div
          v-for="(img, i) in galleryImages"
          :key="img.label"
          class="relative overflow-hidden group cursor-pointer aspect-square"
          @click="openLightbox(i)"
        >
          <img
            :src="img.src"
            :alt="img.label"
            class="absolute inset-0 w-full h-full object-cover
                   transition-all duration-500 group-hover:scale-[1.06] group-hover:brightness-50"
          />
          <!-- Instagram-style hover overlay: heart + views -->
          <div class="absolute inset-0 flex items-center justify-center gap-6
                      opacity-0 group-hover:opacity-100 transition-opacity duration-250">
            <div class="flex items-center gap-1.5 text-white font-semibold text-sm">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>148</span>
            </div>
            <div class="flex items-center gap-1.5 text-white font-semibold text-sm">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              <span>1.2k</span>
            </div>
          </div>
        </div>
      </div>

      <!-- View more on Instagram -->
      <div class="text-center mt-8 px-6">
        <a
          href="https://instagram.com/jvillla"
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
          <p class="text-[0.65rem] tracking-[0.3em] uppercase text-white/40 font-extralight">
            {{ galleryImages[lightboxIndex].label }}
          </p>
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

      <!-- Decorative gold divider with a diamond in the middle -->
      <div class="flex items-center gap-4 max-w-[260px] mx-auto mb-12">
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
      <p class="text-[0.88rem] text-stone/60 font-extralight leading-[1.85] max-w-[440px] mx-auto mb-10">
        We keep it personal. Message us directly — no bots, no forms. Just us, ready to craft your
        perfect stay at J Villla.
      </p>

      <!-- WhatsApp + Email buttons -->
      <div class="flex gap-3 justify-center flex-wrap mb-6">

        <!-- WhatsApp (gold filled button) -->
        <a
          href="https://wa.me/94XXXXXXXXX?text=Hello%20J%20Villla%2C%20I'd%20like%20to%20enquire%20about%20a%20stay."
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
          href="mailto:hello@jvillla.com?subject=Reservation%20Enquiry"
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
    <footer class="bg-forest-deep border-t border-gold/10 px-6 md:px-12 pt-14 pb-8">

      <div class="max-w-6xl mx-auto flex flex-wrap justify-between items-start gap-8">

        <!-- Brand column -->
        <div>
          <p class="font-display text-[1.6rem] font-light text-gold-light tracking-[0.1em]">J Villla</p>
          <p class="text-[0.63rem] tracking-[0.25em] uppercase text-stone/50 font-extralight mt-2">
            Eco Luxury · Sigiriya · Sri Lanka
          </p>
        </div>

        <!-- Link columns — Stay / Explore / Contact -->
        <div class="flex flex-wrap gap-10 md:gap-16">
          <div v-for="col in footerCols" :key="col.title">
            <h4 class="text-[0.6rem] tracking-[0.35em] uppercase text-gold font-normal mb-4">
              {{ col.title }}
            </h4>
            <ul class="flex flex-col gap-2">
              <li v-for="link in col.links" :key="link.label">
                <a
                  :href="link.href"
                  class="text-[0.77rem] text-stone/60 font-extralight hover:text-gold-light hover:opacity-100 transition-all"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom copyright bar -->
      <p class="text-center text-[0.63rem] text-stone/30 tracking-[0.1em] font-extralight
                mt-10 pt-8 border-t border-white/[0.04]">
        © 2025 J Villla · All rights reserved · Designed with care for the land
      </p>
    </footer>

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
</style>

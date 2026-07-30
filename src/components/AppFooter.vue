<script setup lang="ts">
import bigLogo from '../assets/big_logo.png'

const footerCols = [
  {
    title: 'Stay',
    links: [
      { href: '/#rooms',      label: 'Private Pool Chalet' },
      { href: '/#experience', label: 'Infinity Pool'       },
    ],
  },
  {
    title: 'Explore',
    links: [
      { href: '/#location',   label: 'Getting Here'  },
      { href: '/#location',   label: 'Sigiriya Rock' },
      { href: '/#experience', label: 'Experiences'   },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: 'https://wa.me/94701560350', label: 'WhatsApp'    },
      { href: 'mailto:jvillahotels@gmail.com',  label: 'Email'       },
      { href: '/#book',                    label: 'Reserve Now' },
    ],
  },
]
</script>

<template>
  <footer class="bg-forest-deep border-t border-gold/10 px-6 md:px-12 pt-16 pb-8">

    <div class="max-w-6xl mx-auto flex flex-wrap justify-between items-start gap-10">

      <!-- Brand column with big logo -->
      <div class="flex flex-col items-start gap-4">
        <img :src="bigLogo" alt="J Villa" class="w-28 opacity-90" />
        <p class="text-[0.63rem] tracking-[0.25em] uppercase text-stone/50 font-extralight">
          Eco Luxury · Sigiriya · Sri Lanka
        </p>
        <p class="text-[0.72rem] text-stone/50 font-extralight leading-relaxed">
          No 154/A/1, Ilukwala, Sigiriya, Sri Lanka, 21120
        </p>
        <!-- Social row -->
        <div class="flex items-center gap-4 mt-1">
          <a href="https://instagram.com/jvillahotels" target="_blank"
             class="text-stone/40 hover:text-gold-light transition-colors" aria-label="Instagram">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://wa.me/94701560350" target="_blank"
             class="text-stone/40 hover:text-gold-light transition-colors" aria-label="WhatsApp">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Link columns -->
      <div class="flex flex-wrap gap-10 md:gap-16">
        <div v-for="col in footerCols" :key="col.title">
          <h4 class="text-[0.6rem] tracking-[0.35em] uppercase text-gold font-normal mb-4">
            {{ col.title }}
          </h4>
          <ul class="flex flex-col gap-2">
            <li v-for="link in col.links" :key="link.label">
              <a
                :href="link.href"
                class="text-[0.77rem] text-stone/60 font-extralight hover:text-gold-light transition-all"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <p class="text-center text-[0.63rem] text-stone/30 tracking-[0.1em] font-extralight
              mt-10 pt-8 border-t border-white/4">
      © 2025 J Villla · All rights reserved · Designed with care for the land
    </p>
  </footer>
</template>

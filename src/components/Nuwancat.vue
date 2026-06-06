<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)
const copied = ref(false)

const stack = [
  {  name: 'Vue 3', desc: 'Composition API' },
  {  name: 'TypeScript', desc: 'Fully typed' },
  {  name: 'Tailwind v4', desc: 'No config file' },
  {  name: 'Vue Router', desc: 'SPA ready' },
]

onMounted(() => {
  setTimeout(() => { visible.value = true }, 100)
})

const installCmd = 'npx create-nuwancat-app my-project'

function copy() {
  navigator.clipboard.writeText(installCmd)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <main class="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

    <!-- grid background -->
    <div class="fixed inset-0 pointer-events-none" style="background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 60px 60px;"></div>

    <!-- top glow -->
    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none" style="background: radial-gradient(ellipse, rgba(99,232,170,0.07) 0%, transparent 70%);"></div>

    <div class="relative z-10 max-w-2xl mx-auto px-6 py-20 flex flex-col items-center text-center">

      <!-- logo -->
      <div
        class="mb-8 transition-all duration-700"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <div class="relative inline-block">
          <div class="absolute inset-0 rounded-2xl blur-xl opacity-30" style="background: rgba(99,232,170,0.4);"></div>
          <img
            src="https://i.imgur.com/bcckeY0.jpeg"
            alt="nuwancat logo"
            class="relative w-20 h-20 rounded-2xl object-cover border border-white/10"
          />
        </div>
      </div>

      <!-- heading -->
      <div
        class="transition-all duration-700 delay-100"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <p class="text-xs font-mono tracking-[0.3em] text-white/25 uppercase mb-4">by nuwancat</p>
        <h1 class="text-6xl font-bold tracking-tight" style="font-family: 'Georgia', serif; letter-spacing: -0.03em;">
          vue<span style="color: #63e8aa;">-new</span>
        </h1>
        <p class="text-white/40 text-base mt-5 leading-relaxed max-w-sm mx-auto">
          Scaffold Vue 3 + TypeScript + Tailwind v4 in one command.
          No config. No setup fatigue. Just code.
        </p>
      </div>

      <!-- install command box -->
      <div
        class="w-full mt-10 transition-all duration-700 delay-200"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <div class="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 font-mono text-sm hover:border-white/20 transition-colors">
          <span class="text-white/20 select-none">$</span>
          <span class="flex-1 text-left text-white/70">{{ installCmd }}</span>
          <button
            @click="copy"
            class="text-xs px-3 py-1.5 rounded-lg border transition-all duration-200"
            :class="copied
              ? 'border-[#63e8aa]/40 text-[#63e8aa]'
              : 'border-white/10 text-white/30 hover:text-white/60 hover:border-white/20'"
          >
            {{ copied ? '✓ copied' : 'copy' }}
          </button>
        </div>
      </div>

      <!-- stack grid -->
      <div
        class="w-full mt-6 transition-all duration-700 delay-300"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <div class="grid grid-cols-2 gap-2 text-left">
          <div
            v-for="item in stack"
            :key="item.name"
            class="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 hover:bg-white/[0.06] transition-colors"
          >
            
            <div>
              <p class="text-sm font-medium text-white/75">{{ item.name }}</p>
              <p class="text-xs text-green-300">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- divider -->
      <div
        class="w-full mt-14 mb-10 flex items-center gap-4 transition-all duration-700 delay-[400ms]"
        :class="visible ? 'opacity-100' : 'opacity-0'"
      >
        <div class="flex-1 h-px bg-white/[0.08]"></div>
        <span class="text-white/20 text-xs font-mono tracking-widest">support the project</span>
        <div class="flex-1 h-px bg-white/[0.08]"></div>
      </div>

      <!-- ko-fi card -->
      <div
        class="w-full transition-all duration-700 delay-[500ms]"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <div class="relative rounded-2xl border border-[#ffa629]/20 bg-[#ffa629]/3 p-8 text-left">
          <!-- corner accent -->
          <div class="absolute top-0 right-0 w-32 h-32 rounded-2xl pointer-events-none overflow-hidden">
            <div class="absolute -top-8 -right-8 w-24 h-24 rounded-full" style="background: radial-gradient(circle, rgba(255,166,41,0.12) 0%, transparent 70%);"></div>
          </div>

          <p class="text-green-300 text-xs font-mono tracking-widest uppercase mb-3">open source · free forever</p>
          <p class="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
            I built this at 2am so you don't have
            to spend your morning setting up Vite configs. 🇱🇰<br/><br/>
            A coffee = 3 more hours I spend on tools like this
            instead of client work. That's the whole deal. ☕
          </p>

          <a
            href="https://ko-fi.com/nuwancat"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style="background: #ffa629; color: #0a0a0a;"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 2.98.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/>
            </svg>
            Support on Ko-fi
          </a>

          <p class="text-white/20 text-xs font-mono mt-3">https://ko-fi.com/nuwancat</p>
        </div>
      </div>

      

      <!-- github link -->
      <div
        class="mt-6 transition-all duration-700 delay-[600ms]"
        :class="visible ? 'opacity-100' : 'opacity-0'"
      >
        <a
          href="https://github.com/DevNuwancat"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-white/20 hover:text-white/50 transition-colors text-sm font-mono"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          DevNuwancat
        </a>
      </div>

      <!-- footer -->
      <p class="mt-16 text-white/40 text-xs font-mono">
        vue-new · mit license · made in sri lanka 🇱🇰
      </p>

    </div>
  </main>
</template>
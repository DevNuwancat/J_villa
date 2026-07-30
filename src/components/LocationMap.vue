<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const LAT = 7.98434640
const LNG = 80.76405160

const mapEl = ref<HTMLDivElement | null>(null)
let map: L.Map | null = null

onMounted(() => {
  if (!mapEl.value) return

  const icon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  map = L.map(mapEl.value, {
    center: [LAT, LNG],
    zoom: 15,
    scrollWheelZoom: false,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map)

  L.marker([LAT, LNG], { icon })
    .addTo(map)
    .bindPopup('J Villla — No 154/A/1, Ilukwala, Sigiriya')
})

onUnmounted(() => {
  map?.remove()
})
</script>

<template>
  <div ref="mapEl" class="w-full h-full"></div>
</template>

<style scoped>
:deep(.leaflet-popup-content-wrapper) {
  background: #1a2b22;
  color: #f4efe6;
  border: 1px solid rgba(197, 165, 90, 0.3);
}
:deep(.leaflet-popup-content) {
  font-size: 0.78rem;
  letter-spacing: 0.02em;
}
:deep(.leaflet-popup-tip) {
  background: #1a2b22;
}
</style>

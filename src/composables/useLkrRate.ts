import { ref } from 'vue'

const lkrRate = ref(300)

let fetched = false

export function useLkrRate() {
  if (!fetched) {
    fetched = true
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data?.rates?.LKR) lkrRate.value = data.rates.LKR
      })
      .catch(() => {
        // keep fallback rate if fetch fails
      })
  }
  return lkrRate
}

export function usdToLkr(usd: number, rate: number) {
  return Math.round(usd * rate).toLocaleString('en-US')
}

import type { Currency } from '../types'

export const toDirectionalRate = (rate: number, base: Currency) => {
  if (!Number.isFinite(rate) || rate <= 0) {
    return 0
  }
  const directional = base === 'EUR' ? rate : 1 / rate
  return Number(directional.toFixed(4))
}

export const toCanonicalRate = (directionalRate: number, base: Currency) => {
  if (!Number.isFinite(directionalRate) || directionalRate <= 0) {
    return null
  }
  const canonical = base === 'EUR' ? directionalRate : 1 / directionalRate
  return Number(canonical.toFixed(4))
}

export const formatRateInputValue = (rate: number) => {
  if (!Number.isFinite(rate) || rate <= 0) {
    return ''
  }
  return Number(rate).toFixed(4)
}

import type { Currency } from '../types'

export const CURRENCY_FLAGS: Record<Currency, string> = {
  EUR: '🇪🇺',
  USD: '🇺🇸',
}

export const CURRENCY_LABELS: Record<Currency, string> = {
  EUR: 'Euro',
  USD: 'Dollar',
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
}

export const CURRENCY_OPTIONS: Currency[] = ['EUR', 'USD']

const currencyNumberFormatters: Record<Currency, Intl.NumberFormat> = {
  EUR: new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  USD: new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
}

export const formatCurrency = (value: number, currency: Currency) => {
  if (!Number.isFinite(value)) {
    return `0.00 ${CURRENCY_SYMBOLS[currency]}`
  }
  return `${currencyNumberFormatters[currency].format(value)} ${CURRENCY_SYMBOLS[currency]}`
}

export type Currency = 'EUR' | 'USD'

export type RateDirection = 'up' | 'down' | 'flat'

export type HistoryEntry = {
  id: number
  timestamp: string
  realRate: number
  manualRate: number | null
  inputAmount: number
  inputCurrency: Currency
  outputAmount: number
  outputCurrency: Currency
}


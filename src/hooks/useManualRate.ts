import { useCallback, useEffect, useRef, useState } from 'react'
import type { Currency } from '../types'
import { formatPercent } from '../utils/formatters'
import {
  formatRateInputValue,
  toCanonicalRate,
  toDirectionalRate,
} from '../utils/rates'

type UseManualRateOptions = {
  realRate: number
  baseCurrency: Currency
  driftLimit: number
  initialInput?: string
}

const sanitizeDirectionalValue = (value: string) => {
  const trimmed = value.trim()
  if (trimmed === '') {
    return null
  }
  const parsed = parseFloat(trimmed)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null
  }
  return parsed
}

const useManualRate = ({
  realRate,
  baseCurrency,
  driftLimit,
  initialInput = '1.10',
}: UseManualRateOptions) => {
  const [manualInput, setManualInput] = useState(initialInput)
  const [manualRate, setManualRate] = useState<number | null>(null)
  const [manualActive, setManualActive] = useState(false)
  const [manualBanner, setManualBanner] =
    useState('Taux réel appliqué.')
  const previousCurrency = useRef<Currency>(baseCurrency)

  const disableManualRate = useCallback((message = 'Taux réel appliqué.') => {
    setManualActive(false)
    setManualRate(null)
    setManualBanner(message)
  }, [])

  const parseInputToCanonical = useCallback(() => {
    const directional = sanitizeDirectionalValue(manualInput)
    if (directional === null) {
      return null
    }
    return toCanonicalRate(directional, baseCurrency)
  }, [manualInput, baseCurrency])

  useEffect(() => {
    if (!manualActive || manualRate === null) {
      return
    }
    const drift = Math.abs(manualRate - realRate) / realRate
    if (drift > driftLimit) {
      disableManualRate(
        'Taux manuel désactivé : l’écart dépasse 2 %. Retour au taux réel.',
      )
      return
    }

    setManualBanner(`Taux manuel appliqué — écart ${formatPercent(drift * 100)}`)
  }, [manualActive, manualRate, realRate, driftLimit, disableManualRate])

  useEffect(() => {
    if (!manualActive) {
      return
    }
    const canonical = parseInputToCanonical()
    if (canonical === null) {
      disableManualRate('Taux manuel désactivé : saisie invalide.')
      return
    }
    setManualRate(canonical)
  }, [manualInput, manualActive, parseInputToCanonical, disableManualRate])

  useEffect(() => {
    if (previousCurrency.current === baseCurrency) {
      return
    }
    const previous = previousCurrency.current
    previousCurrency.current = baseCurrency
    const directional = sanitizeDirectionalValue(manualInput)
    if (directional === null) {
      setManualInput('')
      return
    }
    const canonical = toCanonicalRate(directional, previous)
    if (canonical === null) {
      setManualInput('')
      return
    }
    const nextDirectional = toDirectionalRate(canonical, baseCurrency)
    setManualInput(formatRateInputValue(nextDirectional))
  }, [baseCurrency, manualInput])

  const handleManualInputChange = (value: string) => {
    const normalized = value.replace(',', '.')
    if (normalized === '' || /^\d*\.?\d*$/.test(normalized)) {
      setManualInput(normalized)
    }
  }

  const handleToggleManualRate = (checked: boolean) => {
    if (!checked) {
      disableManualRate()
      return
    }
    const canonical = parseInputToCanonical()
    if (canonical === null) {
      setManualBanner('Merci de saisir un taux valide.')
      setManualActive(false)
      setManualRate(null)
      return
    }
    setManualRate(canonical)
    setManualActive(true)
    setManualBanner('Taux manuel appliqué.')
  }

  const manualMessageTone = manualBanner.includes('désactivé')
    ? 'text-warning'
    : manualBanner.includes('manuel')
      ? 'text-emerald-300'
      : 'text-slate-300'

  const manualRateDisplay =
    manualRate !== null ? toDirectionalRate(manualRate, baseCurrency) : null
  const displayRealRate = toDirectionalRate(realRate, baseCurrency)
  const manualDiffPercent =
    manualRateDisplay !== null && displayRealRate !== 0
      ? (Math.abs(manualRateDisplay - displayRealRate) / displayRealRate) * 100
      : 0

  return {
    manualInput,
    manualActive,
    manualRate,
    manualBanner,
    manualMessageTone,
    manualRateDisplay,
    manualDiffPercent,
    handleManualInputChange,
    handleToggleManualRate,
  }
}

export default useManualRate


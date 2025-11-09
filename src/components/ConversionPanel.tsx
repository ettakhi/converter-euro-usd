import type { ChangeEvent } from 'react'
import {
  CURRENCY_FLAGS,
  CURRENCY_LABELS,
  CURRENCY_OPTIONS,
  CURRENCY_SYMBOLS,
  formatCurrency,
} from '../constants/currency'
import { rateFormatter } from '../utils/formatters'
import type { Currency } from '../types'

type ConversionPanelProps = {
  amount: string
  inputCurrency: Currency
  outputCurrency: Currency
  convertedValue: number
  effectiveRate: number
  manualActive: boolean
  canAddHistory: boolean
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSelectCurrency: (currency: Currency) => void
  onAddHistory: () => void
}

const ConversionPanel = ({
  amount,
  inputCurrency,
  outputCurrency,
  convertedValue,
  effectiveRate,
  manualActive,
  canAddHistory,
  onAmountChange,
  onSelectCurrency,
  onAddHistory,
}: ConversionPanelProps) => (
  <div className="rounded-3xl bg-slate-950/80 p-6 shadow-panel">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
          Convertisseur
        </p>
        <h2 className="text-2xl font-semibold text-white">
          {CURRENCY_LABELS[inputCurrency]} ⇄ {CURRENCY_LABELS[outputCurrency]}
        </h2>
      </div>
      <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-400">
        Basé sur le taux {manualActive ? 'manuel' : 'réel'}
      </span>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-2 rounded-full bg-slate-900/70 p-1">
      {CURRENCY_OPTIONS.map((currency) => (
        <button
          key={currency}
          type="button"
          onClick={() => onSelectCurrency(currency)}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            inputCurrency === currency
              ? 'bg-white text-slate-900 shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-lg">{CURRENCY_FLAGS[currency]}</span>
          <span>{currency}</span>
        </button>
      ))}
    </div>

    <div className="mt-6 space-y-4">
      <label className="text-sm font-medium text-slate-300">
        Vous saisissez ({CURRENCY_LABELS[inputCurrency]})
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-500">
          {CURRENCY_SYMBOLS[inputCurrency]}
        </span>
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          value={amount}
          onChange={onAmountChange}
          placeholder="0.00"
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 pl-14 text-3xl font-semibold text-white outline-none focus:border-lagoon focus:ring-2 focus:ring-lagoon"
        />
      </div>
    </div>

    <div className="mt-6 rounded-3xl bg-slate-900/70 p-5">
      <p className="text-sm font-medium text-slate-400">
        Vous obtenez ({CURRENCY_LABELS[outputCurrency]})
      </p>
      <p className="mt-2 text-4xl font-semibold text-white">
        {formatCurrency(
          Number.isFinite(convertedValue) ? convertedValue : 0,
          outputCurrency,
        )}
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Taux appliqué : {rateFormatter.format(effectiveRate)}
      </p>
    </div>

    <button
      type="button"
      onClick={onAddHistory}
      disabled={!canAddHistory}
      className={`mt-6 w-full rounded-2xl px-4 py-3 text-base font-semibold transition ${
        canAddHistory
          ? 'bg-lagoon text-slate-950 hover:bg-lagoonDark'
          : 'cursor-not-allowed bg-slate-800 text-slate-500'
      }`}
    >
      Ajouter à l’historique
    </button>
  </div>
)

export default ConversionPanel

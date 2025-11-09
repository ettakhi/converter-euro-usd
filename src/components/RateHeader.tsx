import type { Currency, RateDirection } from '../types'
import { CURRENCY_LABELS } from '../constants/currency'
import { rateFormatter } from '../utils/formatters'

const directionStyle: Record<
  RateDirection,
  { label: string; icon: string; className: string }
> = {
  up: {
    label: 'En hausse',
    icon: '↑',
    className:
      'text-emerald-300 border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  },
  down: {
    label: 'En baisse',
    icon: '↓',
    className:
      'text-rose-300 border-rose-500/40 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.12)]',
  },
  flat: {
    label: 'Stable',
    icon: '→',
    className: 'text-slate-200 border-slate-600/60 bg-slate-700/30',
  },
}

type RateHeaderProps = {
  rate: number
  direction: RateDirection
  baseCurrency: Currency
  quoteCurrency: Currency
}

const RateHeader = ({
  rate,
  direction,
  baseCurrency,
  quoteCurrency,
}: RateHeaderProps) => (
  <header className="rounded-3xl bg-gradient-to-br from-slate-950 to-slate-900 p-6 shadow-panel">
    <div className="flex flex-wrap items-start justify-between gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
          Taux {baseCurrency}/{quoteCurrency} en direct
        </p>
        <p className="mt-3 text-5xl font-semibold text-white">
          {rateFormatter.format(rate)}
        </p>
        <p className="mt-2 text-sm text-slate-400">
          1 {CURRENCY_LABELS[baseCurrency]} = {rateFormatter.format(rate)}{' '}
          {CURRENCY_LABELS[quoteCurrency]}
        </p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <div
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${directionStyle[direction].className}`}
        >
          <span>{directionStyle[direction].icon}</span>
          <span>{directionStyle[direction].label}</span>
        </div>
        <p className="text-xs text-slate-500">
          Actualisation automatique toutes les 3 secondes
        </p>
      </div>
    </div>
  </header>
)

export default RateHeader

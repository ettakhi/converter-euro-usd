import { CURRENCY_LABELS } from '../constants/currency'
import { rateFormatter, formatPercent } from '../utils/formatters'
import type { Currency } from '../types'

type ManualRateCardProps = {
  manualInput: string
  manualActive: boolean
  manualBanner: string
  manualBannerTone: string
  manualRateDisplay: number | null
  manualDiffPercent: number
  baseCurrency: Currency
  quoteCurrency: Currency
  onManualInputChange: (value: string) => void
  onToggleManual: (checked: boolean) => void
}

const ManualRateCard = ({
  manualInput,
  manualActive,
  manualBanner,
  manualBannerTone,
  manualRateDisplay,
  manualDiffPercent,
  baseCurrency,
  quoteCurrency,
  onManualInputChange,
  onToggleManual,
}: ManualRateCardProps) => (
  <div className="rounded-3xl bg-slate-950/80 p-6 shadow-panel">
    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
      Gestion du taux
    </p>
    <h2 className="mt-2 text-2xl font-semibold text-white">Taux manuel</h2>
    <p className="mt-2 text-sm text-slate-400">
      Activez le verrou pour figer le taux tant que l’écart avec le réel
      reste inférieur à 2&nbsp;%.
    </p>

    <div className="mt-6 space-y-3">
      <label className="text-sm font-medium text-slate-300">
        Fixer un taux ({CURRENCY_LABELS[baseCurrency]} →{' '}
        {CURRENCY_LABELS[quoteCurrency]})
      </label>
      <input
        type="text"
        inputMode="decimal"
        pattern="[0-9]*[.,]?[0-9]*"
        value={manualInput}
        onChange={(event) => onManualInputChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-lg font-semibold text-white outline-none focus:border-lagoon focus:ring-2 focus:ring-lagoon"
      />
      <label className="flex items-center gap-3 text-sm font-medium text-slate-200">
        <input
          type="checkbox"
          checked={manualActive}
          onChange={(event) => onToggleManual(event.target.checked)}
          className="h-5 w-5 rounded border-slate-600 bg-slate-900 text-lagoon accent-lagoon"
        />
        Verrouiller ce taux
      </label>
    </div>

    <p className={`mt-4 text-sm font-medium ${manualBannerTone}`}>
      {manualBanner}
    </p>
    {manualRateDisplay !== null && (
      <p className="mt-2 text-xs text-slate-400">
        Taux choisi&nbsp;: {rateFormatter.format(manualRateDisplay)} — écart actuel&nbsp;:{' '}
        {formatPercent(manualDiffPercent)}
      </p>
    )}
  </div>
)

export default ManualRateCard

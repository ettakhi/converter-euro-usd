import {
  CURRENCY_FLAGS,
  formatCurrency,
} from '../constants/currency'
import type { HistoryEntry } from '../types'
import { rateFormatter, timeFormatter } from '../utils/formatters'
import { toDirectionalRate } from '../utils/rates'

type HistoryTableProps = {
  history: HistoryEntry[]
}

const HistoryTable = ({ history }: HistoryTableProps) => (
  <section className="rounded-3xl bg-slate-950/80 p-6 shadow-panel">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
          Historique
        </p>
        <h2 className="text-2xl font-semibold text-white">
          5 dernières conversions
        </h2>
      </div>
      <span className="text-xs text-slate-500">
        {history.length}/5 enregistrées
      </span>
    </div>

    {history.length === 0 ? (
      <p className="mt-6 text-sm text-slate-400">
        L’historique apparaîtra ici après vos conversions.
      </p>
    ) : (
      <div className="mt-6 overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left text-sm text-slate-300">
          <thead className="border-b border-slate-800/60 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium">Demande</th>
              <th className="px-3 py-2 font-medium">Taux réel</th>
              <th className="px-3 py-2 font-medium">Taux saisi</th>
              <th className="px-3 py-2 font-medium">Valeur saisie</th>
              <th className="px-3 py-2 font-medium">Valeur calculée</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id} className="border-b border-slate-800/40 last:border-0">
                <td className="px-3 py-3 text-xs text-slate-400">
                  {timeFormatter.format(new Date(entry.timestamp))}
                </td>
                <td className="px-3 py-3 font-mono text-sm">
                  {rateFormatter.format(
                    toDirectionalRate(entry.realRate, entry.inputCurrency),
                  )}
                </td>
                <td className="px-3 py-3 font-mono text-sm">
                  {entry.manualRate
                    ? rateFormatter.format(
                        toDirectionalRate(entry.manualRate, entry.inputCurrency),
                      )
                    : '—'}
                </td>
                <td className="px-3 py-3">
                  <span className="flex items-center gap-2">
                    {formatCurrency(entry.inputAmount, entry.inputCurrency)}
                    <span className="text-xs text-slate-500">
                      {CURRENCY_FLAGS[entry.inputCurrency]}
                    </span>
                  </span>
                </td>
                <td className="px-3 py-3 font-semibold text-white">
                  <span className="flex items-center gap-2">
                    {formatCurrency(entry.outputAmount, entry.outputCurrency)}
                    <span className="text-xs text-slate-500">
                      {CURRENCY_FLAGS[entry.outputCurrency]}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
)

export default HistoryTable

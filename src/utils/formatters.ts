export const rateFormatter = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

const percentFormatter = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export const timeFormatter = new Intl.DateTimeFormat('fr-FR', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

export const formatPercent = (value: number) => `${percentFormatter.format(value)} %`


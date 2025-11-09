import { useEffect, useState } from 'react'
import type { RateDirection } from '../types'

type UseLiveRateOptions = {
  baseRate: number
  variation: number
  interval: number
}

const useLiveRate = ({
  baseRate,
  variation,
  interval,
}: UseLiveRateOptions) => {
  const [realRate, setRealRate] = useState(baseRate)
  const [rateDirection, setRateDirection] =
    useState<RateDirection>('flat')

  useEffect(() => {
    const id = setInterval(() => {
      setRealRate((current) => {
        const delta = Math.random() * (variation * 2) - variation
        const next = Number(Math.max(0.2, current + delta).toFixed(4))
        setRateDirection(
          next > current ? 'up' : next < current ? 'down' : 'flat',
        )
        return next
      })
    }, interval)

    return () => clearInterval(id)
  }, [variation, interval])

  return { realRate, rateDirection }
}

export default useLiveRate


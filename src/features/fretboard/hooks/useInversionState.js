import { useState, useCallback } from 'react'

export const INVERSION_OPTIONS = [
  { value: 0, label: 'Fundamental' },
  { value: 1, label: '1ra inv.' },
  { value: 2, label: '2da inv.' },
  { value: 3, label: '3ra inv.' },
]

export function useInversionState() {
  const [activeInversion, setActiveInversion] = useState(0)

  const selectInversion = useCallback((value) => {
    setActiveInversion(value)
  }, [])

  return {
    activeInversion,
    selectInversion,
    INVERSION_OPTIONS,
  }
}

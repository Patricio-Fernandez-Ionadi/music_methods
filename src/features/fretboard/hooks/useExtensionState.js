import { useState, useMemo, useCallback } from 'react'

const EXTENSION_OPTIONS = [
  { key: '7', label: '7' },
  { key: 'b7', label: '♭7' },
  { key: '6', label: '6' },
  { key: '9', label: '9' },
  { key: '11', label: '11' },
  { key: 'sus4', label: 'sus4' },
  { key: 'sus2', label: 'sus2' },
]

export function useExtensionState(normalizedExtensionNotes) {
  const [activeExtensions, setActiveExtensions] = useState([])

  const toggleExtension = useCallback((ext) => {
    setActiveExtensions((prev) =>
      prev.includes(ext) ? prev.filter((e) => e !== ext) : [...prev, ext],
    )
  }, [])

  const currentExtensions = useMemo(() => {
    if (!normalizedExtensionNotes) return {}
    const result = {}
    activeExtensions.forEach((ext) => {
      result[ext] = normalizedExtensionNotes[ext] || null
    })
    return result
  }, [normalizedExtensionNotes, activeExtensions])

  return {
    activeExtensions,
    setActiveExtensions,
    toggleExtension,
    currentExtensions,
    EXTENSION_OPTIONS,
  }
}

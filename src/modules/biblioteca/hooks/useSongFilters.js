import { useState, useMemo } from 'react'

/**
 * Estado inicial de los filtros: todos vacíos (ningún filtro activo).
 */
const INITIAL_FILTERS = { name: '', artist: '', key: '' }

/**
 * Hook que maneja los filtros independientes de búsqueda.
 *
 * Expone:
 * - `filters`     → valores actuales de cada filtro
 * - `setFilter`   → actualiza un filtro por su nombre
 * - `filtered`    → lista de canciones que pasan todos los filtros activos
 *
 * @param {Array} songs - Lista completa de canciones
 * @returns {{ filters: { name: string, artist: string, key: string }, setFilter: (name: string, value: string) => void, filtered: Array }}
 */
export function useSongFilters(songs) {
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  /** @type {(name: string, value: string) => void} */
  const setFilter = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  /**
   * Canciones filtradas. Se recalcula solo cuando cambian los filtros o la lista.
   * Cada filtro es independiente: si está vacío no afecta el resultado.
   */
  const filtered = useMemo(
    () =>
      songs.filter(s => {
        const nameMatch =
          !filters.name ||
          s.name.toLowerCase().includes(filters.name.toLowerCase())
        const artistMatch =
          !filters.artist ||
          s.artist.toLowerCase().includes(filters.artist.toLowerCase())
        const keyMatch =
          !filters.key ||
          s.key.toLowerCase().includes(filters.key.toLowerCase())
        return nameMatch && artistMatch && keyMatch
      }),
    [songs, filters],
  )

  return { filters, setFilter, filtered }
}

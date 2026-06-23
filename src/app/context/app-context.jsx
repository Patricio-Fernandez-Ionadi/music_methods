import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { MODES, SCALES } from '../../data'
import { INITIAL_SONGS } from '../../data/biblioteca'

const STORAGE_KEY = 'biblioteca-songs'
const AppContext = createContext(null)

/**
 * Proveedor de estado global de la aplicación.
 * Centraliza:
 * - Tónica y modo seleccionados (para funcional/modos)
 * - Escala y triadas derivadas
 * - Lista de canciones de la biblioteca (persistida en localStorage)
 * - Canción en edición (para el flujo editar → formulario)
 */
export function AppProvider({ children }) {
	const [selectedTonic, setSelectedTonic] = useState('C')
	const [selectedMode, setSelectedMode] = useState(MODES.jonico)

	/** Canciones persistentes: mergea localStorage con INITIAL_SONGS sin duplicar y sincroniza cambios. */
	const [songs, setSongs] = useState(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY)
			const existing = saved ? JSON.parse(saved) : []
			const known = new Map(existing.map(s => [s.name + '|' + s.artist, s]))
			const merged = [...existing]
			let maxId = existing.reduce((max, s) => Math.max(max, s.id || 0), 0)
			for (const song of INITIAL_SONGS) {
				const key = song.name + '|' + song.artist
				if (known.has(key)) {
					const old = known.get(key)
					const oldContent = JSON.stringify({ lyrics: old.lyrics, tabs: old.tabs, key: old.key })
					const newContent = JSON.stringify({ lyrics: song.lyrics, tabs: song.tabs, key: song.key })
					if (oldContent !== newContent) {
						const idx = merged.findIndex(s => s.name + '|' + s.artist === key)
						if (idx !== -1) merged[idx] = { ...song, id: old.id }
					}
				} else {
					maxId++
					merged.push({ ...song, id: maxId })
				}
			}
			return merged.length ? merged : INITIAL_SONGS
		} catch {
			return INITIAL_SONGS
		}
	})

	/** Persiste cada vez que cambia la lista. */
	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(songs))
		} catch {
			/* quota excedida o deshabilitado — se ignora */
		}
	}, [songs])

	/** Canción seleccionada para editar (se precarga en el formulario). */
	const [editingSong, setEditingSong] = useState(null)

	const currentScale = useMemo(
		() => SCALES[selectedTonic]?.[selectedMode.id] || [],
		[selectedTonic, selectedMode],
	)

	const rawTriads = useMemo(() => {
		if (currentScale.length !== 7) return []
		return [
			[currentScale[0], currentScale[2], currentScale[4]],
			[currentScale[1], currentScale[3], currentScale[5]],
			[currentScale[2], currentScale[4], currentScale[6]],
			[currentScale[3], currentScale[5], currentScale[0]],
			[currentScale[4], currentScale[6], currentScale[1]],
			[currentScale[5], currentScale[0], currentScale[2]],
			[currentScale[6], currentScale[1], currentScale[3]],
		]
	}, [currentScale])

	const value = {
		selectedTonic,
		setSelectedTonic,
		selectedMode,
		setSelectedMode,
		currentScale,
		rawTriads,
		MODES,
		NOTES: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'],
		songs,
		setSongs,
		editingSong,
		setEditingSong,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/**
 * Hook para acceder al contexto global.
 * Debe usarse dentro de un <AppProvider>.
 */
export function useApp() {
	const ctx = useContext(AppContext)
	if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider')
	return ctx
}

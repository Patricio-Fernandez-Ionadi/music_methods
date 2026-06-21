import { useState, useCallback, useMemo } from 'react'
import { CHORD_TYPES, getChordVoicings } from '../data/chord-dictionary'

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

/**
 * useChordDictionary
 *
 * Administra la selección de un acorde del diccionario.
 *
 * Estado:
 *   activeChordRoot  → nota raíz seleccionada (null si ninguna)
 *   activeChordType  → tipo de acorde seleccionado (null si ninguna)
 *   activeVoicingIdx → índice de la digitación activa dentro del tipo+raíz
 *
 * Acciones:
 *   selectChord(root, type)          → selecciona raíz + tipo, resetea digitación a 0
 *   clearChord()                     → deselecciona todo
 *   setVoicing(index)                → cambia la digitación activa
 *   nextVoicing()                    → siguiente digitación disponible
 *
 * Derivados:
 *   availableVoicings   → digitaciones disponibles para la selección actual
 *   activeVoicing       → digitación activa (o null)
 *   chordTypeKeys       → lista de claves de tipos de acorde
 *   hasSelection        → true si hay raíz + tipo seleccionados
 *   chordName           → nombre legible del acorde seleccionado (ej. "Do Mayor")
 *
 * @returns {Object}
 */
export function useChordDictionary() {
	const [activeChordRoot, setActiveChordRoot] = useState(null)
	const [activeChordType, setActiveChordType] = useState(null)
	const [activeVoicingIdx, setActiveVoicingIdx] = useState(0)

	const chordTypeKeys = useMemo(() => Object.keys(CHORD_TYPES), [])

	const availableVoicings = useMemo(() => {
		if (!activeChordRoot || !activeChordType) return []
		return getChordVoicings(activeChordRoot, activeChordType)
	}, [activeChordRoot, activeChordType])

	const activeVoicing = useMemo(() => {
		if (!availableVoicings.length) return null
		return availableVoicings[activeVoicingIdx] ?? null
	}, [availableVoicings, activeVoicingIdx])

	const hasSelection = activeChordRoot !== null && activeChordType !== null

	const chordName = useMemo(() => {
		if (!hasSelection) return ''
		const typeDef = CHORD_TYPES[activeChordType]
		return `${activeChordRoot}${typeDef?.short ?? ''}`
	}, [hasSelection, activeChordRoot, activeChordType])

	const selectChord = useCallback((root, type) => {
		setActiveChordRoot(root)
		setActiveChordType(type)
		setActiveVoicingIdx(0)
	}, [])

	const clearChord = useCallback(() => {
		setActiveChordRoot(null)
		setActiveChordType(null)
		setActiveVoicingIdx(0)
	}, [])

	const setVoicing = useCallback((idx) => {
		setActiveVoicingIdx(idx)
	}, [])

	const nextVoicing = useCallback(() => {
		setActiveVoicingIdx((prev) =>
			prev < availableVoicings.length - 1 ? prev + 1 : 0,
		)
	}, [availableVoicings.length])

	return {
		activeChordRoot,
		activeChordType,
		activeVoicingIdx,
		selectChord,
		clearChord,
		setVoicing,
		nextVoicing,
		availableVoicings,
		activeVoicing,
		chordTypeKeys,
		hasSelection,
		chordName,
		NOTES,
	}
}

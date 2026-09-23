import { useState, useCallback, useMemo, useEffect } from 'react'
import { analyzeKey } from '../utils/key-analyzer'
import { analyzeChord } from '../utils/chord-utils'
import { transposeChordObject } from '../../../shared/utils/transpose'
import { noteToPitchClass } from '../../../shared/utils/scale-utils'
import { SCALES } from '../../../data/scales'
import { PROGRESSIONS } from '../data/progressions'

const STORAGE_KEY = 'playground-progressions'

function loadSaved() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		return raw ? JSON.parse(raw) : []
	} catch {
		return []
	}
}

export function useProgression() {
	const [chords, setChords] = useState(PROGRESSIONS[0].chords.map((c) => ({ ...c })))
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [displayMode, setDisplayMode] = useState('individual')
	const [savedProgressions, setSavedProgressions] = useState(loadSaved)
	const [transposeMode, setTransposeMode] = useState('puro')
	const [selectedKey, setSelectedKey] = useState(null)

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProgressions))
	}, [savedProgressions])

	const keyAnalysis = useMemo(() => analyzeKey(chords), [chords])

	/** Actualiza los acordes y vuelve a seguir la tonalidad detectada. */
	const updateChords = useCallback((next) => {
		setChords(next)
		setSelectedKey(null)
	}, [])

	const selectChord = useCallback((index) => {
		setSelectedIndex(index)
	}, [])

	const selectKey = useCallback((tonic, modeId, modeName) => {
		setSelectedKey({ tonic, modeId, modeName })
	}, [])

	const addChord = useCallback((chord) => {
		updateChords((prev) => [...prev, { ...chord }])
	}, [updateChords])

	const removeChord = useCallback((index) => {
		updateChords((prev) => {
			const next = prev.filter((_, i) => i !== index)
			return next
		})
		setSelectedIndex((prev) => {
			if (prev >= chords.length - 1) return Math.max(0, chords.length - 2)
			if (index < prev) return prev - 1
			if (index === prev) return Math.max(0, prev - 1)
			return prev
		})
	}, [updateChords, chords.length])

	const moveChord = useCallback((from, to) => {
		updateChords((prev) => {
			const next = [...prev]
			const [item] = next.splice(from, 1)
			next.splice(to, 0, item)
			return next
		})
		setSelectedIndex(to)
	}, [updateChords])

	const setChord = useCallback((index, chord) => {
		updateChords((prev) => prev.map((c, i) => (i === index ? { ...chord } : c)))
	}, [updateChords])

	const loadPreset = useCallback((preset) => {
		updateChords(preset.chords.map((c) => ({ ...c })))
		setSelectedIndex(0)
	}, [updateChords])

	const loadProgression = useCallback((savedChords) => {
		updateChords(savedChords.map((c) => ({ ...c })))
		setSelectedIndex(0)
	}, [updateChords])

	const toggleDisplayMode = useCallback(() => {
		setDisplayMode((prev) => (prev === 'individual' ? 'all' : 'individual'))
	}, [])

	const saveProgression = useCallback((name) => {
		const newProg = {
			id: Date.now().toString(),
			name,
			chords: chords.map((c) => ({ ...c })),
		}
		setSavedProgressions((prev) => [...prev, newProg])
		return newProg
	}, [chords])

	const deleteProgression = useCallback((id) => {
		setSavedProgressions((prev) => prev.filter((p) => p.id !== id))
	}, [])

	const transposeTo = useCallback((newTonic) => {
		const fromTonic = keyAnalysis.best.tonic
		if (!fromTonic || fromTonic === newTonic) return

		const fromPc = noteToPitchClass(fromTonic)
		const toPc = noteToPitchClass(newTonic)
		if (fromPc == null || toPc == null) return
		const delta = (toPc - fromPc + 12) % 12

		const { modeId, quality, expectedChords } = keyAnalysis.best

		let newScaleNotes
		if (modeId === 'armonica') {
			const intervals = [2, 1, 2, 2, 1, 3, 3]
			const pc = noteToPitchClass(newTonic)
			newScaleNotes = []
			let pos = 0
			for (const step of intervals) {
				newScaleNotes.push((pos + pc) % 12)
				pos += step
			}
		} else {
			const scaleData = SCALES[newTonic]?.[modeId]
			newScaleNotes = scaleData ? scaleData.map(noteToPitchClass) : null
		}

		updateChords((prev) => prev.map((chord) => {
			const transposed = transposeChordObject(chord, delta)
			if (transposeMode === 'inteligente' && newScaleNotes) {
				const analysis = analyzeChord(transposed, {
					tonic: newTonic,
					quality,
					scaleNotes: newScaleNotes,
					expectedChords,
				})
				if (!analysis.inScale && analysis.suggestion) {
					return { root: analysis.suggestion.root, type: analysis.suggestion.type }
				}
			}
			return transposed
		}))
	}, [keyAnalysis, transposeMode, updateChords])

	const toggleTransposeMode = useCallback(() => {
		setTransposeMode((prev) => (prev === 'puro' ? 'inteligente' : 'puro'))
	}, [])

	return {
		chords,
		selectedIndex,
		displayMode,
		keyAnalysis,
		savedProgressions,
		transposeMode,
		selectedKey,
		selectChord,
		selectKey,
		addChord,
		removeChord,
		moveChord,
		setChord,
		loadPreset,
		loadProgression,
		toggleDisplayMode,
		saveProgression,
		deleteProgression,
		transposeTo,
		toggleTransposeMode,
	}
}

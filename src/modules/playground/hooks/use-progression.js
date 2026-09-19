import { useState, useCallback, useMemo, useEffect } from 'react'
import { analyzeKey } from '../utils/key-analyzer'
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

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProgressions))
	}, [savedProgressions])

	const keyAnalysis = useMemo(() => analyzeKey(chords), [chords])

	const selectChord = useCallback((index) => {
		setSelectedIndex(index)
	}, [])

	const addChord = useCallback((chord) => {
		setChords((prev) => [...prev, { ...chord }])
	}, [])

	const removeChord = useCallback((index) => {
		setChords((prev) => {
			const next = prev.filter((_, i) => i !== index)
			return next
		})
		setSelectedIndex((prev) => {
			if (prev >= chords.length - 1) return Math.max(0, chords.length - 2)
			if (index < prev) return prev - 1
			if (index === prev) return Math.max(0, prev - 1)
			return prev
		})
	}, [chords.length])

	const moveChord = useCallback((from, to) => {
		setChords((prev) => {
			const next = [...prev]
			const [item] = next.splice(from, 1)
			next.splice(to, 0, item)
			return next
		})
		setSelectedIndex(to)
	}, [])

	const setChord = useCallback((index, chord) => {
		setChords((prev) => prev.map((c, i) => (i === index ? { ...chord } : c)))
	}, [])

	const loadPreset = useCallback((preset) => {
		setChords(preset.chords.map((c) => ({ ...c })))
		setSelectedIndex(0)
	}, [])

	const loadProgression = useCallback((savedChords) => {
		setChords(savedChords.map((c) => ({ ...c })))
		setSelectedIndex(0)
	}, [])

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

	return {
		chords,
		selectedIndex,
		displayMode,
		keyAnalysis,
		savedProgressions,
		selectChord,
		addChord,
		removeChord,
		moveChord,
		setChord,
		loadPreset,
		loadProgression,
		toggleDisplayMode,
		saveProgression,
		deleteProgression,
	}
}

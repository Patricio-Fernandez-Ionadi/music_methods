import { useCallback, useState } from 'react'
import { POSITIONS, STRING_NOTES, STRING_INDEXES } from '../../../data'
import { CHORD_VOICINGS } from '../data/chord-voicings'

const TOTAL_FRETS = 120

function getNoteIndexes(note) {
	const indexes = []
	for (const [stringName, startIndex] of Object.entries(STRING_INDEXES)) {
		for (let fret = 0; fret < 20; fret++) {
			if (STRING_NOTES[stringName][fret] === note) {
				indexes.push(startIndex + fret)
			}
		}
	}
	return indexes
}

function positionApplies(pos, tonicIndex) {
	if (tonicIndex >= STRING_INDEXES.E) return pos === 1 || pos === 2
	if (tonicIndex >= STRING_INDEXES.A) return pos === 3 || pos === 4
	if (tonicIndex >= STRING_INDEXES.D) return pos === 5
	return false
}

function noteToGlobalIndex(stringName, rootFret, fretOffset) {
	return STRING_INDEXES[stringName] + rootFret + fretOffset
}

export function usePositionState(normalizedScale, modeId) {
	const [activePositions, setActivePositions] = useState([])

	const getPositionIndexes = useCallback(() => {
		const tonicIndexes = getNoteIndexes(normalizedScale[0])
		const modePositions = POSITIONS[modeId]
		if (!modePositions || !tonicIndexes.length) return new Set()

		const activeIndexes = new Set()
		tonicIndexes.forEach((tonicIndex) => {
			activePositions.forEach((pos) => {
				if (!positionApplies(pos, tonicIndex)) return

				modePositions[pos]?.forEach(({ offset }) => {
					const targetIndex = tonicIndex + offset
					if (targetIndex >= 0 && targetIndex < TOTAL_FRETS) {
						activeIndexes.add(targetIndex)
					}
				})
			})
		})
		return activeIndexes
	}, [normalizedScale, modeId, activePositions])

	const getChordVoicingIndexes = useCallback((activeTriadIndex) => {
		const tonicIndexes = getNoteIndexes(normalizedScale[0])
		const modeVoicings = CHORD_VOICINGS[modeId]
		if (!modeVoicings || !tonicIndexes.length) return new Set()

		const activeIndexes = new Set()
		tonicIndexes.forEach((tonicIndex) => {
			const rootStringIdx = (() => {
				if (tonicIndex >= STRING_INDEXES.E) return STRING_INDEXES.E
				if (tonicIndex >= STRING_INDEXES.A) return STRING_INDEXES.A
				return STRING_INDEXES.D
			})()

			const rootFret = tonicIndex - rootStringIdx

			activePositions.forEach((pos) => {
				if (!positionApplies(pos, tonicIndex)) return
				const posVoicing = modeVoicings[pos]
				if (!posVoicing) return

				posVoicing.notes.forEach(({ string, fretOffset }) => {
					const globalIdx = noteToGlobalIndex(string, rootFret, fretOffset)
					if (globalIdx >= 0 && globalIdx < TOTAL_FRETS) {
						activeIndexes.add(globalIdx)
					}
				})
			})
		})
		return activeIndexes
	}, [normalizedScale, modeId, activePositions])

	const togglePosition = useCallback((pos) => {
		setActivePositions((prev) =>
			prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos],
		)
	}, [])

	const toggleAllPositions = useCallback((checked) => {
		setActivePositions(checked ? [1, 2, 3, 4, 5] : [])
	}, [])

	return {
		activePositions,
		getPositionIndexes,
		getChordVoicingIndexes,
		togglePosition,
		toggleAllPositions,
	}
}

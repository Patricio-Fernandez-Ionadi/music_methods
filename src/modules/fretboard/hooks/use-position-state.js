import { useCallback, useState } from 'react'
import { POSITIONS } from '../../../data'
import { CHORD_VOICINGS } from '../data/chord-voicings'
import {
	TOTAL_FRETS,
	getNoteIndexes,
	positionApplies,
	noteToGlobalIndex,
	findLowestChordNote,
} from '../utils/position-utils'

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

	const getChordVoicingIndexes = useCallback((activeTriadIndex, activeInversion) => {
		const tonicIndexes = getNoteIndexes(normalizedScale[0])
		const modeVoicings = CHORD_VOICINGS[modeId]
		if (!modeVoicings || !tonicIndexes.length) return new Set()

		const rootDeg = activeTriadIndex + 1
		const thirdDeg = ((activeTriadIndex + 1) + 2) % 7 || 7
		const fifthDeg = ((activeTriadIndex + 1) + 4) % 7 || 7
		const seventhDeg = ((activeTriadIndex + 1) + 6) % 7 || 7
		const requiredDeg = [rootDeg, thirdDeg, fifthDeg, seventhDeg][activeInversion] ?? rootDeg

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

				if (activeInversion > 0) {
					const lowestDeg = findLowestChordNote(posVoicing.notes, rootFret)
					if (lowestDeg !== requiredDeg) return
				}

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

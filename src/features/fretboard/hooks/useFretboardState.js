import { useMemo } from 'react'
import { useApp } from '../../../context/AppContext'
import { ENHARMONICS } from '../../../data'
import { useTriadState } from './useTriadState'
import { usePositionState } from './usePositionState'
import { useExtensionState } from './useExtensionState'
import { useInversionState } from './useInversionState'

const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

function normalizeNote(note) {
	return ENHARMONICS[note] || note
}

function getExtensionNotesForDegree(scale, degreeIndex) {
	const root = scale[degreeIndex]
	const rootIdx = CHROMATIC.indexOf(root)
	return {
		7: rootIdx >= 0 ? CHROMATIC[(rootIdx + 11) % 12] : null,
		b7: rootIdx >= 0 ? CHROMATIC[(rootIdx + 10) % 12] : null,
		6: scale[(degreeIndex + 5) % 7],
		9: scale[(degreeIndex + 1) % 7],
		11: scale[(degreeIndex + 3) % 7],
		sus4: scale[(degreeIndex + 3) % 7],
		sus2: scale[(degreeIndex + 1) % 7],
	}
}

export function useFretboardState() {
	const { selectedMode, currentScale, rawTriads } = useApp()

	const normalizedScale = useMemo(
		() => currentScale.map(normalizeNote),
		[currentScale],
	)

	const normalizedTriads = useMemo(
		() => rawTriads.map((triad) => triad.map(normalizeNote)),
		[rawTriads],
	)

	const triadState = useTriadState(normalizedTriads)
	const positionState = usePositionState(normalizedScale, selectedMode.id)

	const currentDegExtensions = useMemo(() => {
		if (normalizedScale.length !== 7 || triadState.activeTriadIndex == null) return {}
		return getExtensionNotesForDegree(normalizedScale, triadState.activeTriadIndex)
	}, [normalizedScale, triadState.activeTriadIndex])

	const extensionState = useExtensionState(currentDegExtensions)
	const inversionState = useInversionState()

	return {
		rawTriads,
		normalizedScale,
		normalizedTriads,
		...triadState,
		...positionState,
		...extensionState,
		...inversionState,
	}
}

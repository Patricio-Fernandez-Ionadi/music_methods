import { useMemo } from 'react'
import { useApp } from '../../../app/context/app-context'
import { useTriadState } from './use-triad-state'
import { usePositionState } from './use-position-state'
import { useExtensionState } from './use-extension-state'
import { normalizeNote, getExtensionNotesForDegree } from '../utils/scale-utils'

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
		if (normalizedScale.length !== 7 || triadState.activeTriadIndex == null)
			return {}
		return getExtensionNotesForDegree(
			normalizedScale,
			triadState.activeTriadIndex,
		)
	}, [normalizedScale, triadState.activeTriadIndex])

	const extensionState = useExtensionState(currentDegExtensions)

	return {
		rawTriads,
		normalizedScale,
		normalizedTriads,
		...triadState,
		...positionState,
		...extensionState,
	}
}

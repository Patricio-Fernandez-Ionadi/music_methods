import { useApp } from '../../../app/context/app-context'
import { useTriadState } from './use-triad-state'
import { usePositionState } from './use-position-state'
import { normalizeNote } from '../utils/scale-utils'

export function useFretboardState() {
	const { selectedMode, currentScale, rawTriads } = useApp()

	const normalizedScale = currentScale.map(normalizeNote)
	const normalizedTriads = rawTriads.map((triad) => triad.map(normalizeNote))

	const triadState = useTriadState(normalizedTriads)
	const positionState = usePositionState(normalizedScale, selectedMode.id)

	return {
		rawTriads,
		normalizedScale,
		normalizedTriads,
		...triadState,
		...positionState,
	}
}

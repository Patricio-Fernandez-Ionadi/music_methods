import { useFretboard } from './context/fretboard-context'
import { FretboardString } from './string/fretboard-string'

const STRING_ORDER = ['e', 'b', 'g', 'D', 'A', 'E']

export function Fretboard() {
	const {
		showTriad,
		showThird,
		showFifth,
		normalizedScale,
		showScaleTonic,
		currentTriadDegrees,
		getPositionIndexes,
		getChordVoicingIndexes,
		activeTriadIndex,
		activeInversion,
		currentExtensions,
		activePositions,
		NOTE_CSS_VARS,
	} = useFretboard()

	const positionIndexes = getPositionIndexes()
	const chordVoicingIndexes =
		showTriad && activePositions.length > 0
			? getChordVoicingIndexes(activeTriadIndex, activeInversion)
			: new Set()
	const { root, third, fifth } = currentTriadDegrees
	const hasActivePositions = activePositions.length > 0
	const hasChordVoicing = chordVoicingIndexes.size > 0

	const stringProps = {
		normalizedScale,
		showScaleTonic,
		positionIndexes,
		chordVoicingIndexes,
		root,
		third,
		fifth,
		currentExtensions,
		showTriad,
		showThird,
		showFifth,
		hasActivePositions,
		hasChordVoicing,
		NOTE_CSS_VARS,
	}

	return (
		<div className='fretboard-container'>
			<div className='fretboardDinamic'>
				{STRING_ORDER.map((stringName) => (
					<FretboardString
						key={stringName}
						stringName={stringName}
						{...stringProps}
					/>
				))}
			</div>
		</div>
	)
}

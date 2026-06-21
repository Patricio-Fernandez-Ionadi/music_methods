import { useFretboard } from './context/fretboard-context'
import { FretboardString } from './string/fretboard-string'
import { STRING_INDEXES } from '../../data'
import { voicingToIndexes } from './data/chord-dictionary'

const STRING_ORDER = ['e', 'b', 'g', 'D', 'A', 'E']
const FRET_LABEL_MARKERS = [0, 3, 5, 7, 9, 12]

export function Fretboard({
	fretRange,
	showFretLabels,
	highlightedOnlyIndexes,
	containerClass = 'fretboard-container',
}) {
	const ctx = useFretboard()

	const {
		showTriad,
		showThird,
		showFifth,
		normalizedScale,
		currentScale,
		showScaleTonic,
		currentTriadDegrees,
		getPositionIndexes,
		getChordVoicingIndexes,
		activeTriadIndex,
		activePositions,
		activeTriadVoicing,
		NOTE_CSS_VARS,
	} = ctx

	const positionIndexes = getPositionIndexes()
	const chordVoicingIndexes =
		showTriad && activePositions.length > 0
			? getChordVoicingIndexes(activeTriadIndex)
			: new Set()
	const triadVoicingIndexes = activeTriadVoicing
		? voicingToIndexes(activeTriadVoicing, STRING_INDEXES)
		: new Set()
	const { root, third, fifth } = currentTriadDegrees
	const hasActivePositions = activePositions.length > 0
	const hasChordVoicing = chordVoicingIndexes.size > 0

	const isExplicit = highlightedOnlyIndexes !== undefined
	const hasTriadVoicing = triadVoicingIndexes.size > 0

	const highlightMode = isExplicit
		? (highlightedOnlyIndexes ? 'chord-dict' : null)
		: (hasTriadVoicing ? 'triad-voicing' : null)

	const effectiveHighlighted = isExplicit
		? (highlightedOnlyIndexes || null)
		: (hasTriadVoicing ? triadVoicingIndexes : null)

	const range = fretRange ?? { start: 0, end: 19 }

	const stringProps = {
		normalizedScale,
		currentScale,
		showScaleTonic,
		positionIndexes,
		chordVoicingIndexes,
		triadVoicingIndexes,
		highlightedOnlyIndexes: effectiveHighlighted,
		highlightMode,
		root,
		third,
		fifth,
		showTriad,
		showThird,
		showFifth,
		hasActivePositions,
		hasChordVoicing,
		NOTE_CSS_VARS,
		fretRange: range,
	}

	return (
		<div className={containerClass}>
			<div className='fretboardDinamic'>
				{STRING_ORDER.map((stringName) => (
					<FretboardString
						key={stringName}
						stringName={stringName}
						{...stringProps}
					/>
				))}
				{showFretLabels && (
					<FretLabelsRow range={range} />
				)}
			</div>
		</div>
	)
}

function FretLabelsRow({ range }) {
	const { start, end } = range
	const labels = Array.from({ length: end - start + 1 }, (_, i) => start + i)
	return (
		<div className='fret-labels-row'>
			{labels.map((fret) => (
				<span key={fret} className='fret-label'>
					{FRET_LABEL_MARKERS.includes(fret) ? fret : ''}
				</span>
			))}
		</div>
	)
}

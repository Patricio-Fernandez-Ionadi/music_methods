import { FretboardString } from './fretboard-string'
import { STRING_INDEXES } from '../../../data'
import { voicingToIndexes } from '../../data/chord-dictionary'
import { FRETBOARD_VARIANTS } from './fretboard-config'

const STRING_ORDER = ['e', 'b', 'g', 'D', 'A', 'E']
const FRET_LABEL_MARKERS = [0, 3, 5, 7, 9, 12]

export function Fretboard({
	fretRange,
	showFretLabels,
	highlightedOnlyIndexes,
	containerClass = 'fretboard-container',
	variant = 'full',
	normalizedScale = [],
	currentScale = [],
	showScaleTonic = true,
	positionIndexes = new Set(),
	chordVoicingIndexes = new Set(),
	activeTriadVoicing = null,
	root = null,
	third = null,
	fifth = null,
	showTriad = false,
	showThird = false,
	showFifth = false,
	hasActivePositions = false,
	hasChordVoicing = false,
	NOTE_CSS_VARS = {},
}) {
	const triadVoicingIndexes = activeTriadVoicing
		? voicingToIndexes(activeTriadVoicing, STRING_INDEXES)
		: new Set()

	const isExplicit = highlightedOnlyIndexes !== undefined
	const hasTriadVoicing = triadVoicingIndexes.size > 0

	const highlightMode = isExplicit
		? (highlightedOnlyIndexes ? 'chord-dict' : null)
		: (hasTriadVoicing ? 'triad-voicing' : null)

	const effectiveHighlighted = isExplicit
		? (highlightedOnlyIndexes || null)
		: (hasTriadVoicing ? triadVoicingIndexes : null)

	const range = fretRange ?? FRETBOARD_VARIANTS[variant]?.fretRange ?? { start: 0, end: 19 }

	const variantConfig = FRETBOARD_VARIANTS[variant]
	const boardStyle = variantConfig?.width
		? { width: `${variantConfig.width}px`, margin: '0 auto' }
		: undefined

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
		<div className={containerClass} style={boardStyle}>
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

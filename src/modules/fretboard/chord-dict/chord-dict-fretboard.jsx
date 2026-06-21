import { STRING_INDEXES } from '../../../data'
import { voicingToIndexes } from '../data/chord-dictionary'
import { Fretboard } from '../fretboard'

const DEFAULT_RANGE = { start: 0, end: 4 }

function computeFretRange(frets) {
	const played = frets.filter((f) => f >= 0)
	if (played.length === 0) return DEFAULT_RANGE
	const min = Math.min(...played)
	const max = Math.max(...played)
	const center = Math.floor((min + max) / 2)
	let start = center - 2
	if (start < 0) start = 0
	return { start, end: start + 4 }
}

export function ChordDictFretboard({ activeVoicing }) {
	const fretRange = activeVoicing
		? computeFretRange(activeVoicing.frets)
		: DEFAULT_RANGE
	const indexes = activeVoicing
		? voicingToIndexes(activeVoicing, STRING_INDEXES)
		: null

	return (
		<div className='chord-dict-fretboard'>
			<Fretboard
				fretRange={fretRange}
				showFretLabels
				highlightedOnlyIndexes={indexes}
			/>
		</div>
	)
}

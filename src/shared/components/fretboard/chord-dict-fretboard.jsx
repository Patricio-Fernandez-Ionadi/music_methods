import { STRING_INDEXES } from '../../../data'
import { voicingToIndexes } from '../../data/chord-dictionary'
import { CHORD_INTERVALS, NOTE_IDX } from '../../utils/voicing-generators'
import { CHROMATIC, SHARP_TO_FLAT } from '../../utils/scale-utils'
import { NOTE_CSS_VARS } from '../../utils/note-css-vars'
import { Fretboard } from './fretboard'

const DEFAULT_RANGE = { start: 0, end: 4 }

const FLAT_INTERVALS = new Set([3, 10])

function computeCurrentScale(root, type) {
	const intervals = CHORD_INTERVALS[type]
	if (!intervals || !root) return []
	const rootIdx = NOTE_IDX[root]
	if (rootIdx == null) return []
	return intervals.map((i) => {
		const note = CHROMATIC[(rootIdx + i + 12) % 12]
		if (FLAT_INTERVALS.has(i) && note.includes('#') && SHARP_TO_FLAT[note]) return SHARP_TO_FLAT[note]
		return note
	})
}

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

export function ChordDictFretboard({ activeVoicing, root, type }) {
	const currentScale = computeCurrentScale(root, type)
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
				currentScale={currentScale}
				normalizedScale={currentScale}
				NOTE_CSS_VARS={NOTE_CSS_VARS}
			/>
		</div>
	)
}

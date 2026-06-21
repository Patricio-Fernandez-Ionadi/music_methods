import { STRING_INDEXES } from '../../../data'
import { voicingToIndexes } from '../data/chord-dictionary'
import { FretboardContext, NOTE_CSS_VARS } from '../context/fretboard-context'
import { Fretboard } from '../fretboard'

const DEFAULT_RANGE = { start: 0, end: 4 }

const QUIET_CONTEXT = {
	showTriad: false,
	showThird: false,
	showFifth: false,
	normalizedScale: [],
	currentScale: [],
	showScaleTonic: false,
	currentTriadDegrees: { root: null, third: null, fifth: null },
	getPositionIndexes: () => new Set(),
	getChordVoicingIndexes: () => new Set(),
	activeTriadIndex: 0,
	activePositions: [],
	activeTriadVoicing: null,
	NOTE_CSS_VARS,
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

export function ChordDictFretboard({ activeVoicing }) {
	const fretRange = activeVoicing
		? computeFretRange(activeVoicing.frets)
		: DEFAULT_RANGE
	const indexes = activeVoicing
		? voicingToIndexes(activeVoicing, STRING_INDEXES)
		: null

	return (
		<div className='chord-dict-fretboard'>
			<FretboardContext.Provider value={QUIET_CONTEXT}>
				<Fretboard
					fretRange={fretRange}
					showFretLabels
					highlightedOnlyIndexes={indexes}
				/>
			</FretboardContext.Provider>
		</div>
	)
}

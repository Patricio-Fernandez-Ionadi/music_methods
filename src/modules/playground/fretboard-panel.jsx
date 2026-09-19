import { useMemo } from 'react'
import { Fretboard } from '../../shared/components/fretboard/fretboard'
import { getChordVoicings, voicingToIndexes } from '../../shared/data/chord-dictionary'
import { NOTE_CSS_VARS } from '../../shared/utils/note-css-vars'
import { CHORD_INTERVALS, NOTE_IDX } from '../../shared/utils/voicing-generators'
import { CHROMATIC, SHARP_TO_FLAT } from '../../shared/utils/scale-utils'
import { STRING_INDEXES } from '../../data'

const FLAT_INTERVALS = new Set([3, 10])
const WINDOW_SIZE = 6

const CHORD_COLORS = [
	'--note-C', '--note-F', '--note-G', '--note-D',
	'--note-A', '--note-E', '--note-B', '--note-Bb',
	'--note-Cs', '--note-Fs', '--note-Gs', '--note-Ds',
]

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
	if (played.length === 0) return { start: 0, end: WINDOW_SIZE - 1 }
	const min = Math.min(...played)
	const max = Math.max(...played)
	const span = max - min
	if (span >= WINDOW_SIZE) return { start: min, end: min + WINDOW_SIZE - 1 }
	const padding = Math.floor((WINDOW_SIZE - span) / 2)
	let start = min - padding
	if (start < 0) start = 0
	return { start, end: start + WINDOW_SIZE - 1 }
}

function getVoicingFrets(chord) {
	const voicings = getChordVoicings(chord.root, chord.type)
	if (voicings.length === 0) return [0, 1, 2, 3, 4, 5]
	return voicings[0].frets
}

export function FretboardPanel({ chords, selectedIndex, displayMode, onSelect }) {
	const selectedChord = chords[selectedIndex]

	const selectedFretRange = useMemo(() => {
		if (!selectedChord) return { start: 0, end: WINDOW_SIZE - 1 }
		return computeFretRange(getVoicingFrets(selectedChord))
	}, [selectedChord])

	const allVoicingData = useMemo(() => {
		if (displayMode === 'all') {
			return chords.map((chord) => {
				const voicings = getChordVoicings(chord.root, chord.type)
				const indexes = voicings.length > 0
					? voicingToIndexes(voicings[0], STRING_INDEXES)
					: new Set()
				const fretRange = voicings.length > 0
					? computeFretRange(voicings[0].frets)
					: { start: 0, end: WINDOW_SIZE - 1 }
				return { indexes, fretRange }
			})
		}
		return null
	}, [chords, displayMode])

	const selectedVoicingIndexes = useMemo(() => {
		if (!selectedChord) return null
		const voicings = getChordVoicings(selectedChord.root, selectedChord.type)
		return voicings.length > 0
			? voicingToIndexes(voicings[0], STRING_INDEXES)
			: null
	}, [selectedChord])

	const selectedScale = useMemo(() => {
		if (!selectedChord) return []
		return computeCurrentScale(selectedChord.root, selectedChord.type)
	}, [selectedChord])

	if (displayMode === 'all') {
		return (
			<div className='fretboard-panel'>
				<div className='fretboard-panel-legend'>
					{chords.map((chord, i) => {
						const label = `${chord.root}${chord.type === 'M' ? '' : chord.type}`
						const colorVar = CHORD_COLORS[i % CHORD_COLORS.length]
						return (
							<span key={i} className='fretboard-panel-legend-item'>
								<span
									className='fretboard-panel-legend-dot'
									style={{ background: `var(${colorVar})` }}
								/>
								{label}
							</span>
						)
					})}
				</div>
				<div className='fretboard-panel-all'>
					{allVoicingData?.map((data, i) => (
						<Fretboard
							key={i}
							containerClass='fretboard-container'
							fretRange={data.fretRange}
							highlightedOnlyIndexes={data.indexes.size > 0 ? data.indexes : null}
							currentScale={computeCurrentScale(chords[i].root, chords[i].type)}
							normalizedScale={computeCurrentScale(chords[i].root, chords[i].type)}
							NOTE_CSS_VARS={NOTE_CSS_VARS}
							showFretLabels
						/>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className='fretboard-panel'>
			{selectedChord && (
				<div className='fretboard-panel-label'>
					{selectedChord.root}{selectedChord.type === 'M' ? '' : selectedChord.type}
				</div>
			)}
			<Fretboard
				containerClass='fretboard-container'
				fretRange={selectedFretRange}
				highlightedOnlyIndexes={selectedVoicingIndexes}
				currentScale={selectedScale}
				normalizedScale={selectedScale}
				NOTE_CSS_VARS={NOTE_CSS_VARS}
				showFretLabels
			/>
			<div className='fretboard-panel-nav'>
				<button
					className='fretboard-panel-nav-btn'
					onClick={() => onSelect(selectedIndex > 0 ? selectedIndex - 1 : chords.length - 1)}
					disabled={chords.length <= 1}
				>
					Anterior
				</button>
				<span className='fretboard-panel-nav-info'>
					{selectedIndex + 1} / {chords.length}
				</span>
				<button
					className='fretboard-panel-nav-btn'
					onClick={() => onSelect(selectedIndex < chords.length - 1 ? selectedIndex + 1 : 0)}
					disabled={chords.length <= 1}
				>
					Siguiente
				</button>
			</div>
		</div>
	)
}

import { STRING_NOTES } from '../../../data'
import { FretNote } from '../note/fret-note'

export function FretboardString({
	stringName,
	normalizedScale,
	currentScale,
	showScaleTonic,
	positionIndexes,
	chordVoicingIndexes,
	triadVoicingIndexes,
	highlightedOnlyIndexes,
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
	fretRange,
}) {
	const notes = STRING_NOTES[stringName]
	const start = fretRange?.start ?? 0
	const end = fretRange?.end ?? 19

	return (
		<div className='string-container'>
			{Array.from({ length: end - start + 1 }, (_, i) => {
				const fret = start + i
				return (
					<FretNote
						key={fret}
						note={notes[fret]}
						fret={fret}
						stringName={stringName}
						normalizedScale={normalizedScale}
						currentScale={currentScale}
						showScaleTonic={showScaleTonic}
						positionIndexes={positionIndexes}
						chordVoicingIndexes={chordVoicingIndexes}
						triadVoicingIndexes={triadVoicingIndexes}
						highlightedOnlyIndexes={highlightedOnlyIndexes}
						highlightMode={highlightMode}
						root={root}
						third={third}
						fifth={fifth}
						showTriad={showTriad}
						showThird={showThird}
						showFifth={showFifth}
						hasActivePositions={hasActivePositions}
						hasChordVoicing={hasChordVoicing}
						NOTE_CSS_VARS={NOTE_CSS_VARS}
					/>
				)
			})}
		</div>
	)
}

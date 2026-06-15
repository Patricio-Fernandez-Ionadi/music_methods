import { STRING_NOTES } from '../../../data'
import { FretNote } from '../note/fret-note'

export function FretboardString({
	stringName,
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
}) {
	return (
		<div key={stringName} id={stringName} className='string-container'>
			<div className='visual-string'></div>
			{STRING_NOTES[stringName].map((note, fret) => (
				<FretNote
					key={fret}
					note={note}
					fret={fret}
					stringName={stringName}
					normalizedScale={normalizedScale}
					showScaleTonic={showScaleTonic}
					positionIndexes={positionIndexes}
					chordVoicingIndexes={chordVoicingIndexes}
					root={root}
					third={third}
					fifth={fifth}
					currentExtensions={currentExtensions}
					showTriad={showTriad}
					showThird={showThird}
					showFifth={showFifth}
					hasActivePositions={hasActivePositions}
					hasChordVoicing={hasChordVoicing}
					NOTE_CSS_VARS={NOTE_CSS_VARS}
				/>
			))}
		</div>
	)
}

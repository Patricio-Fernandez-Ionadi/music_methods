import { Selectors } from './selectors'
import { ScaleInfo } from './scale-info'
import { Triads } from './triads'
import { Fretboard } from './fretboard'
import { Positions } from './position-controls'
import { ChordDict } from './chord-dict'
import { useFretboard } from './context/fretboard-context'

export function FretboardView() {
	const chordDict = useFretboard()

	return (
		<section id='fretboard'>
			<div className='scale-header'>
				<Selectors />
				<ScaleInfo />
				<Triads />
			</div>

			<Fretboard />
			<Positions />
			<ChordDict
				activeChordRoot={chordDict.activeChordRoot}
				activeChordType={chordDict.activeChordType}
				selectChord={chordDict.selectChord}
				setVoicing={chordDict.setVoicing}
				availableVoicings={chordDict.availableVoicings}
				activeVoicing={chordDict.activeVoicing}
				NOTES={chordDict.NOTES}
				chordTypeKeys={chordDict.chordTypeKeys}
			/>
		</section>
	)
}

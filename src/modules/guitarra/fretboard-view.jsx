import { Selectors } from './selectors'
import { ScaleInfo } from './scale-info'
import { Triads } from './triads'
import { Fretboard } from '../../shared/components/fretboard/fretboard'
import { Positions } from './position-controls'
import { ChordDict } from './chord-dict'
import { useFretboard } from './context/fretboard-context'

export function FretboardView() {
	const ctx = useFretboard()

	const positionIndexes = ctx.getPositionIndexes()
	const chordVoicingIndexes =
		ctx.showTriad && ctx.activePositions.length > 0
			? ctx.getChordVoicingIndexes(ctx.activeTriadIndex)
			: new Set()
	const hasActivePositions = ctx.activePositions.length > 0
	const hasChordVoicing = chordVoicingIndexes.size > 0

	return (
		<section id='fretboard'>
			<div className='scale-header'>
				<Selectors />
				<ScaleInfo />
				<Triads />
			</div>

			<Fretboard
				normalizedScale={ctx.normalizedScale}
				currentScale={ctx.currentScale}
				showScaleTonic={ctx.showScaleTonic}
				positionIndexes={positionIndexes}
				chordVoicingIndexes={chordVoicingIndexes}
				activeTriadVoicing={ctx.activeTriadVoicing}
				root={ctx.currentTriadDegrees.root}
				third={ctx.currentTriadDegrees.third}
				fifth={ctx.currentTriadDegrees.fifth}
				showTriad={ctx.showTriad}
				showThird={ctx.showThird}
				showFifth={ctx.showFifth}
				hasActivePositions={hasActivePositions}
				hasChordVoicing={hasChordVoicing}
				NOTE_CSS_VARS={ctx.NOTE_CSS_VARS}
			/>
			<Positions />
			<ChordDict
				activeChordRoot={ctx.activeChordRoot}
				activeChordType={ctx.activeChordType}
				selectChord={ctx.selectChord}
				setVoicing={ctx.setVoicing}
				availableVoicings={ctx.availableVoicings}
				activeVoicing={ctx.activeVoicing}
				NOTES={ctx.NOTES}
				chordTypeKeys={ctx.chordTypeKeys}
			/>
		</section>
	)
}

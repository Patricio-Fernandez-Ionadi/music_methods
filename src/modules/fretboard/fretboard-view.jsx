import { Selectors } from './selectors'
import { ScaleInfo } from './scale-info'
import { Triads } from './triads'
import { Fretboard } from './fretboard'
import { Positions } from './position-controls'
import { ExtensionControls } from './extension-controls'
import { InversionControls } from './inversion-controls'

export function FretboardView() {
	return (
		<section id='fretboard'>
			<div className='scale-header'>
				<Selectors />
				<ScaleInfo />
				<Triads />
				<ExtensionControls />
				<InversionControls />
			</div>

			<Fretboard />
			<Positions />
		</section>
	)
}

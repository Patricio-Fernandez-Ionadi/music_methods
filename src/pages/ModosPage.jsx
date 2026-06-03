import { MODES } from '../data/modes'
import { ModeComponent } from '../features/modes/mode-component'

const MODAL_MODES = ['dorico', 'frigio', 'lidio', 'mixolidio', 'locrio']

export const ModosPage = () => {
	return (
		<section className='section modes'>
			{MODAL_MODES.map((key) => (
				<ModeComponent key={key} mode={MODES[key]} />
			))}
		</section>
	)
}

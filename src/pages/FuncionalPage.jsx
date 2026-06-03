import { MODES } from '../data/modes'
import { ModeComponent } from '../features/modes/mode-component'

const TONAL_MODES = ['jonico', 'eolico']

export const FuncionalPage = () => {
	return (
		<section className='section modes'>
			{TONAL_MODES.map((key) => (
				<ModeComponent key={key} mode={MODES[key]} />
			))}
		</section>
	)
}

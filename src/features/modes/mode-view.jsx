import { MODES } from '../../data/modes'
import { ModeComponent } from './mode-component'

export const ModesView = () => {
	return (
		<>
			<section className='section modes'>
				{Object.keys(MODES).map((mode) => {
					return <ModeComponent key={mode} mode={MODES[mode]} />
				})}
			</section>
		</>
	)
}

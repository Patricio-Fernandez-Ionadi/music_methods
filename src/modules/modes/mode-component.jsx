import { ArmonicTable } from '../../app/components/armonicTable/armonic-table'
import { ModeHeader } from './mode-header'
import { ModeTable } from './mode-table'
import { Pentagram } from './pentagram'

export function ModeComponent({ mode }) {
	return (
		<>
			<div className='mode-card' id={mode.id}>
				<ModeHeader mode={mode} />

				<p className='relative-reference relative-maj'>
					&#9650; Relativo mayor: {mode.relative['jonico']}
				</p>
				<p className='relative-reference relative-min'>
					&#9660; Relativo menor: {mode.relative['eolico']}
				</p>
				<Pentagram
					notes={['G1', 'A1', 'B', 'C', 'D', 'E', 'F']}
					relative={{ maj: 7, min: 5 }}
					alt={{ name: 'b', degrees: [3, 7] }}
				/>

				<ArmonicTable mode={mode} />
				<ModeTable mode={mode} />
			</div>
		</>
	)
}

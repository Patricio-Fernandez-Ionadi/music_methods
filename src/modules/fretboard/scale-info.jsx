import { Field } from '../../app/components/field/field'
import { useFretboard } from './context/fretboard-context'

export const ScaleInfo = () => {
	const { selectedTonic, selectedMode, currentScale, NOTE_CSS_VARS } =
		useFretboard()
	return (
		<Field label={`${selectedMode.name} - ${selectedTonic}`}>
			<div className='scale-notes'>
				{currentScale.map((note) => (
					<span key={note} style={{ color: `var(${NOTE_CSS_VARS[note]})` }}>
						{note}
					</span>
				))}
			</div>
		</Field>
	)
}

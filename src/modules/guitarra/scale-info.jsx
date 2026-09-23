import { Field } from '../../app/components/field/field'
import { useFretboard } from './context/fretboard-context'
import { ScaleNotes } from '../../shared/components/scale-notes/scale-notes'

export const ScaleInfo = () => {
	const { selectedTonic, selectedMode, currentScale, NOTE_CSS_VARS } =
		useFretboard()
	return (
		<Field label={`${selectedMode.name} - ${selectedTonic}`}>
			<ScaleNotes scale={currentScale} NOTE_CSS_VARS={NOTE_CSS_VARS} />
		</Field>
	)
}
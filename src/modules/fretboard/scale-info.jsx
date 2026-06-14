import { useFretboard } from './context/FretboardContext'

export const ScaleInfo = () => {
	const { selectedTonic, selectedMode, currentScale, NOTE_CSS_VARS } = useFretboard()
	return (
		<div className='field scale-info'>
			<h4>
				{selectedMode.name} - {selectedTonic}
			</h4>
			<div className='scale-notes'>
				{currentScale.map((note) => (
					<span key={note} style={{ color: `var(${NOTE_CSS_VARS[note]})` }}>
						{note}
					</span>
				))}
			</div>
		</div>
	)
}

import { normalizeNote } from '../../utils/scale-utils'

export function ScaleNotes({ scale = [], NOTE_CSS_VARS = {} }) {
	return (
		<div className='scale-notes'>
			{scale.map((note) => (
				<span
					key={note}
					style={{ color: `var(${NOTE_CSS_VARS[normalizeNote(note)]})` }}
				>
					{note}
				</span>
			))}
		</div>
	)
}
import { pentagramNoteHeight } from './utils/pentagram-notes'

export function PentagramNote({ note, index, minMargin, relativeMaj, relativeMin, alt }) {
	const hasAlt = alt?.degrees?.includes(index + 1)

	return (
		<span
			style={{
				left: `${minMargin + index * 10}%`,
				top: `${pentagramNoteHeight[note]}%`,
			}}
			className={`${relativeMaj === index ? 'relative-maj' : ''} ${relativeMin === index ? 'relative-min' : ''}`}
		>
			●{hasAlt ? alt.name : ''}
		</span>
	)
}

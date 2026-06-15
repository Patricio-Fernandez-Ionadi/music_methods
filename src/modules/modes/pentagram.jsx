const pentagramNoteHeight = {
	C1: 89,
	D1: 80,
	E1: 72,
	F1: 64,
	G1: 56,
	A1: 49,
	B: 41,
	C: 34,
	D: 26,
	E: 19,
	F: 11,
	G: 5,
	A: -5,
}

export function Pentagram({ notes, relative, alt }) {
	const minMargin = 10

	let relativeMaj = relative?.maj - 1
	let relativeMin = relative?.min - 1

	return (
		<>
			<div className='staff'>
				<div className='clave'>𝄞</div>
				<div className='staff-lines'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<div className='notes'>
					{notes.map((note, index) => {
						const hasAlt = alt?.degrees?.includes(index + 1)
						return (
							<span
								key={note}
								style={{
									left: `${minMargin + index * 10}%`,
									top: `${pentagramNoteHeight[note]}%`,
								}}
								className={`${relativeMaj === index ? 'relative-maj' : ''} ${relativeMin === index ? 'relative-min' : ''}`}
							>
								●{hasAlt ? alt.name : ''}
							</span>
						)
					})}
				</div>
			</div>
		</>
	)
}

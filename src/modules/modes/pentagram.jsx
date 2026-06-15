import { PentagramNote } from './pentagram-note'

export function Pentagram({ notes, relative, alt }) {
	const minMargin = 10

	const relativeMaj = relative?.maj - 1
	const relativeMin = relative?.min - 1

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
					{notes.map((note, index) => (
						<PentagramNote
							key={note}
							note={note}
							index={index}
							minMargin={minMargin}
							relativeMaj={relativeMaj}
							relativeMin={relativeMin}
							alt={alt}
						/>
					))}
				</div>
			</div>
		</>
	)
}

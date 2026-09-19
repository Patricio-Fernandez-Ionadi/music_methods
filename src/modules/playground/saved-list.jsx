import { buildChordLabel } from './utils/chord-utils'

export function SavedList({ savedProgressions, onLoad, onDelete }) {
	if (savedProgressions.length === 0) return null

	return (
		<div className='saved-list'>
			<h3>Progresiones guardadas</h3>
			<div className='saved-list-items'>
				{savedProgressions.map((prog) => (
					<div key={prog.id} className='saved-list-item'>
						<button
							className='saved-list-item-load'
							onClick={() => onLoad(prog)}
						>
							<strong>{prog.name}</strong>
							<span>
								{prog.chords.map((c) => buildChordLabel(c.root, c.type)).join(' - ')}
							</span>
						</button>
						<button
							className='saved-list-item-delete'
							onClick={() => onDelete(prog.id)}
						>
							x
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

import { ChordPicker } from './chord-picker'

export function ProgressionBuilder({
	chords,
	onAdd,
	onRemove,
	onSet,
	onMove,
}) {
	return (
		<div className='progression-builder'>
			<h3>Constructor de progresion</h3>
			<div className='progression-chords'>
				{chords.map((chord, i) => (
					<div key={i} className='progression-chord-slot'>
						<span className='progression-chord-index'>{i + 1}</span>
						<ChordPicker
							chord={chord}
							onChange={(c) => onSet(i, c)}
							onRemove={chords.length > 1 ? () => onRemove(i) : null}
						/>
						<div className='progression-chord-move'>
							{i > 0 && (
								<button
									className='move-btn'
									onClick={() => onMove(i, i - 1)}
								>
									+
								</button>
							)}
							{i < chords.length - 1 && (
								<button
									className='move-btn'
									onClick={() => onMove(i, i + 1)}
								>
									-
								</button>
							)}
						</div>
					</div>
				))}
			</div>
			<button
				className='progression-add-btn'
				onClick={() => onAdd({ root: 'C', type: 'M' })}
			>
				+ Agregar acorde
			</button>
		</div>
	)
}

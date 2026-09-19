import { PROGRESSIONS } from './data/progressions'

export function ProgressionSelector({ onLoad }) {
	return (
		<div className='progression-selector'>
			<h3>Progresiones populares</h3>
			<div className='progression-presets'>
				{PROGRESSIONS.map((prog) => (
					<button
						key={prog.id}
						className='progression-preset-btn'
						onClick={() => onLoad(prog)}
					>
						<strong>{prog.name}</strong>
						<span>{prog.description}</span>
					</button>
				))}
			</div>
		</div>
	)
}

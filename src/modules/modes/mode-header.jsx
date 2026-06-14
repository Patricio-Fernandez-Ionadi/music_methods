import './style/_mode-header.scss'

export const ModeHeader = ({ mode }) => {
	return (
		<div className='mode-header'>
			<h2>Modo {mode.name}</h2>
			<p>
				<strong>Secuencia:</strong> {mode.intervalNotation.join(' ')}
			</p>

			{/* Pentagrama alteraciones */}
			<h3>Alteraciones</h3>
			<p>
				Respecto a la escala mayor tiene{' '}
				{mode.id != 'jonico'
					? mode.alterations.maj
							.filter((alt) => typeof alt != 'number')
							.join(' ')
					: '0 Alteraciones'}
				.
			</p>
			<p>
				Respecto a la escala menor tiene{' '}
				{mode.alterations.min.filter((alt) => typeof alt != 'number').join(' ')}
				.
			</p>
		</div>
	)
}

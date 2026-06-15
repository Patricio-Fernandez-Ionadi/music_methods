import { SCALES } from '../../data/scales'

export const ModeTable = ({ mode }) => {
	return (
		<>
			<div className='mode-table-wrapper'>
				<table className='mode-table'>
					<thead>
						<tr>
							<th>Tonalidad</th>
							<th>Notas</th>
							<th>Tríada</th>
							<th>Acorde</th>
							<th>Relativos</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(SCALES).map((note) => {
							const currentMode = mode.id
							const isMinor = mode.quality === 'menor'
							const scales = SCALES[note]
							const currentScale = scales[currentMode]
							const m = 'm'

							return (
								<tr key={note}>
									<td>{note}</td>
									<td>{currentScale.join(' ')}</td>
									<td>
										{currentScale[0]} {currentScale[2]} {currentScale[4]}
									</td>

									<td>
										{note}
										{isMinor && m}
									</td>
									<td>
										{currentScale[mode.relative['jonico'] - 1]} |{' '}
										{currentScale[mode.relative['eolico'] - 1]}m
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}

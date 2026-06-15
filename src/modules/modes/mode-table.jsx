import { SCALES } from '../../data/scales'
import { ModeTableRow } from './mode-table-row'

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
						{Object.keys(SCALES).map((note) => (
							<ModeTableRow key={note} note={note} mode={mode} />
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

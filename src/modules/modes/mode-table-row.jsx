import { SCALES } from '../../data/scales'

export function ModeTableRow({ note, mode }) {
	const currentMode = mode.id
	const isMinor = mode.quality === 'menor'
	const scales = SCALES[note]
	const currentScale = scales[currentMode]
	const m = 'm'

	return (
		<tr>
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
}

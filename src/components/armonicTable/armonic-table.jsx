import './style.scss'
const DEGREE_NAMES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

function getDegreeClass(index, mode) {
	if (index === 0) return 'grado-tonica'
	if (mode.importantDegrees.includes(index + 1)) return 'grado-importante'
	if (mode.avoidDegrees.includes(index + 1)) return 'grado-evitar'
	return ''
}

export function ArmonicTable({ mode }) {
	if (!mode) return null
	// const triada = getTriads().map((t, index) => {
	// 	if (index === 0) {
	// 		return `
	// 		<td class='grado-tonica'>
	// 			<p>${t[0]}${mode.chords[index] === 'm' ? 'm' : mode.chords[index] === 'dim' ? 'dim' : ''}</p>
	// 			<p>${t[1]}</p>
	// 			<p>${t[2]}</p>
	// 		</td>
	// 		`
	// 	}

	// 	if (mode.importantDegrees.includes(index + 1)) {
	// 		return `
	// 		<td class='grado-importante'>
	// 			<p>${t[0]}${mode.chords[index] === 'm' ? 'm' : mode.chords[index] === 'dim' ? 'dim' : ''}</p>
	// 			<p>${t[1]}</p>
	// 			<p>${t[2]}</p>
	// 		</td>
	// 		`
	// 	}

	// 	if (mode.avoidDegrees.includes(index + 1)) {
	// 		return `
	// 		<td class='grado-evitar'>
	// 			<p>${t[0]}${mode.chords[index] === 'm' ? 'm' : mode.chords[index] === 'dim' ? 'dim' : ''}</p>
	// 			<p>${t[1]}</p>
	// 			<p>${t[2]}</p>
	// 		</td>
	// 		`
	// 	}
	// 	return `
	// 		<td>
	// 			<p>${t[0]}${mode.chords[index] === 'm' ? 'm' : mode.chords[index] === 'dim' ? 'dim' : ''}</p>
	// 			<p>${t[1]}</p>
	// 			<p>${t[2]}</p>
	// 		</td>
	// 		`
	// })

	return (
		<>
			<table className='degree-table'>
				<thead>
					<tr>
						{mode.chords.map((_, index) => (
							<th key={index} className={getDegreeClass(index, mode)}>
								{DEGREE_NAMES[index]}
								{mode.avoidDegrees.includes(index + 1) && ' X'}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					<tr>
						{mode.chords.map((chord, index) => (
							<td key={index} className={getDegreeClass(index, mode)}>
								{chord}
							</td>
						))}
					</tr>

					<tr>
						{mode.emotionalFunction.map((emotion, index) => (
							<td key={index} className={getDegreeClass(index, mode)}>
								{emotion}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</>
	)
}

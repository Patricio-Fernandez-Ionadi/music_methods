const ROMAN_MAJOR = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const ROMAN_MINOR = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii']

const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

const NOTE_IDX = Object.fromEntries(CHROMATIC.map((n, i) => [n, i]))
NOTE_IDX['Db'] = 1
NOTE_IDX['Eb'] = 3
NOTE_IDX['Gb'] = 6
NOTE_IDX['Ab'] = 8

const TYPE_LABELS = {
	M: '', m: 'm', dim: 'dim', 7: '7', m7: 'm7', maj7: 'maj7', sus4: 'sus4', sus2: 'sus2',
}

/**
 * Construye el nombre legible de un acorde.
 * @param {string} root
 * @param {string} type
 * @returns {string} e.g. 'Cm', 'G7', 'F#dim'
 */
export function buildChordLabel(root, type) {
	return `${root}${TYPE_LABELS[type] ?? type}`
}

/**
 * Convierte un acorde a su numeral romano relativo a una tonalidad.
 *
 * @param {{ root: string, type: string }} chord
 * @param {string} keyTonic  - Tónica de la tonalidad (e.g. 'C')
 * @param {boolean} isMinorKey
 * @returns {string} e.g. 'I', 'ii', 'V7'
 */
export function chordToRoman(chord, keyTonic, isMinorKey) {
	const tonicIdx = NOTE_IDX[keyTonic]
	const chordIdx = NOTE_IDX[chord.root]
	if (tonicIdx == null || chordIdx == null) return '?'

	let degree = (chordIdx - tonicIdx + 12) % 12
	const scale = isMinorKey
		? [0, 2, 3, 5, 7, 8, 10]
		: [0, 2, 4, 5, 7, 9, 11]

	const degreeIndex = scale.indexOf(degree)
	if (degreeIndex === -1) return '?'

	const romans = isMinorKey ? ROMAN_MINOR : ROMAN_MAJOR
	let result = romans[degreeIndex]

	if (chord.type === '7' || chord.type === 'm7' || chord.type === 'maj7') {
		result += '7'
	}

	return result
}

export { CHROMATIC, NOTE_IDX }

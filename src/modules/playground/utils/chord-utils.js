import { CHROMATIC, noteToPitchClass } from '../../../shared/utils/scale-utils'

const ROMAN_MAJOR = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const ROMAN_MINOR = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii']

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

function findDiatonicIndex(pc, scalePCs) {
	for (let i = 0; i < scalePCs.length; i++) {
		if (scalePCs[i] === pc) return i
	}
	return -1
}

function findNearestDiatonic(chordPc, scalePCs) {
	const n = scalePCs.length
	let bestDist = 999
	let bestIdx = -1

	for (let i = 0; i < n; i++) {
		const dist = Math.min(
			Math.abs(chordPc - scalePCs[i]),
			12 - Math.abs(chordPc - scalePCs[i])
		)
		if (dist < bestDist) {
			bestDist = dist
			bestIdx = i
		}
	}

	return bestDist > 0 ? bestIdx : -1
}

function romanForDegree(degreeIndex, expectedQuality, isMinor) {
	const romans = isMinor ? ROMAN_MINOR : ROMAN_MAJOR
	let result = romans[degreeIndex]
	if (expectedQuality === 'dim') result += '°'
	return result
}

/**
 * Analiza un acorde relativo a una tonalidad y devuelve información completa
 * sobre su grado romano, si es diatónico, y sugerencias de acorde cercano.
 *
 * @param {{ root: string, type: string }} chord
 * @param {{ tonic, quality, scaleNotes, expectedChords? }} keyInfo
 * @returns {{ inScale, roman, expectedQuality, matchesQuality, suggestion, qualitySuggestion, isAccidental }}
 */
export function analyzeChord(chord, keyInfo) {
	const { quality, scaleNotes, expectedChords } = keyInfo
	const isMinor = quality === 'menor'
	const tonicPc = noteToPitchClass(keyInfo.tonic)
	const chordPc = noteToPitchClass(chord.root)

	if (tonicPc == null || chordPc == null) {
		return { inScale: false, roman: '?', expectedQuality: null, matchesQuality: false, suggestion: null, qualitySuggestion: null, isAccidental: false }
	}

	const degreeIndex = findDiatonicIndex(chordPc, scaleNotes)
	const expectedQuality = degreeIndex !== -1 ? expectedChords?.[degreeIndex] ?? null : null

	if (degreeIndex !== -1) {
		const matchesQuality = expectedQuality != null && chord.type === expectedQuality
		const roman = romanForDegree(degreeIndex, expectedQuality, isMinor)

		let qualitySuggestion = null
		if (!matchesQuality && expectedQuality != null) {
			const sugRoot = CHROMATIC[scaleNotes[degreeIndex]] ?? keyInfo.tonic
			qualitySuggestion = {
				root: sugRoot,
				type: expectedQuality,
				label: `${sugRoot}${TYPE_LABELS[expectedQuality] ?? expectedQuality}`,
			}
		}

		return {
			inScale: true,
			roman,
			expectedQuality,
			matchesQuality,
			suggestion: null,
			qualitySuggestion,
			isAccidental: false,
		}
	}

	// Out of scale: find nearest diatonic and build accidental roman
	const nearestIdx = findNearestDiatonic(chordPc, scaleNotes)
	const nearestPc = nearestIdx !== -1 ? scaleNotes[nearestIdx] : null

	let accidentalRoman = '?'
	if (nearestPc != null) {
		const lowerPc = scaleNotes[(nearestIdx - 1 + 7) % 7]
		const upperPc = scaleNotes[(nearestIdx + 1) % 7]

		const distToLower = Math.min(
			Math.abs(chordPc - lowerPc),
			12 - Math.abs(chordPc - lowerPc)
		)
		const distToUpper = Math.min(
			Math.abs(chordPc - upperPc),
			12 - Math.abs(chordPc - upperPc)
		)

		let useFlat
		if (distToLower < distToUpper) {
			useFlat = false
		} else if (distToUpper < distToLower) {
			useFlat = true
		} else {
			useFlat = chord.root.includes('b')
		}

		const degreeLetter = ROMAN_MINOR[nearestIdx]
		accidentalRoman = `${useFlat ? '♭' : '♯'}${degreeLetter.toUpperCase()}`
	}

	// Build suggestion: nearest diatonic chord with expected quality
	let suggestion = null
	if (nearestIdx !== -1) {
		const sugPc = scaleNotes[nearestIdx]
		const sugRoot = CHROMATIC[sugPc]
		const sugQuality = expectedChords?.[nearestIdx] ?? 'M'
		suggestion = {
			root: sugRoot,
			type: sugQuality,
			label: `${sugRoot}${TYPE_LABELS[sugQuality] ?? sugQuality}`,
		}
	}

	return {
		inScale: false,
		roman: accidentalRoman,
		expectedQuality: null,
		matchesQuality: false,
		suggestion,
		qualitySuggestion: null,
		isAccidental: true,
	}
}

/**
 * Convierte un acorde a su numeral romano relativo a una tonalidad (compatibilidad).
 * Para uso completo usar analyzeChord.
 */
export function chordToRoman(chord, keyArg, isMinorKey) {
	let keyInfo

	if (typeof keyArg === 'string') {
		const tonicPc = noteToPitchClass(keyArg)
		const scalePCs = (isMinorKey
			? [0, 2, 3, 5, 7, 8, 10]
			: [0, 2, 4, 5, 7, 9, 11]
		).map((s) => (tonicPc + s) % 12)
		keyInfo = {
			tonic: keyArg,
			quality: isMinorKey ? 'menor' : 'mayor',
			scaleNotes: scalePCs,
			expectedChords: isMinorKey
				? ['m', 'dim', 'M', 'm', 'm', 'M', 'M']
				: ['M', 'm', 'm', 'M', 'M', 'm', 'dim'],
		}
	} else {
		keyInfo = keyArg
	}

	const result = analyzeChord(chord, keyInfo)
	return result.roman
}

export { CHROMATIC, TYPE_LABELS }

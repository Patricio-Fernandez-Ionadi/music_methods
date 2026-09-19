const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

const NOTE_IDX = Object.fromEntries(NOTES.map((n, i) => [n, i]))
NOTE_IDX['Db'] = 1
NOTE_IDX['Eb'] = 3
NOTE_IDX['Gb'] = 6
NOTE_IDX['Ab'] = 8

const MAJOR_DIATONIC = [
	[0, 'M'], [2, 'm'], [4, 'm'], [5, 'M'],
	[7, 'M'], [9, 'm'], [11, 'dim'],
]

const MINOR_HARMONIC = [
	[0, 'm'], [2, 'dim'], [3, 'aug'], [5, 'm'],
	[7, 'M'], [8, 'M'], [11, 'dim'],
]

function scoreKey(rootIdx, isMinor, chords) {
	const scale = isMinor ? MINOR_HARMONIC : MAJOR_DIATONIC
	let score = 0
	for (const chord of chords) {
		const cRoot = NOTE_IDX[chord.root]
		if (cRoot == null) continue
		for (const [interval, expectedQuality] of scale) {
			const scaleNote = (rootIdx + interval) % 12
			if (scaleNote === cRoot) {
				if (chord.type === expectedQuality) {
					score += 3
				} else if (chord.type === '7' && expectedQuality === 'M') {
					score += 2
				}
			}
		}
	}
	return score
}

/**
 * Analiza una progresión de acordes y devuelve la tonalidad detectada.
 *
 * @param {{ root: string, type: string }[]} chords
 * @returns {{ tonic: string, mode: string, score: number }}
 */
export function analyzeKey(chords) {
	if (!chords || chords.length === 0) {
		return { tonic: 'C', mode: 'Mayor', score: 0 }
	}

	let bestTonic = 'C'
	let bestMode = 'Mayor'
	let bestScore = -1

	for (const root of NOTES) {
		const rootIdx = NOTE_IDX[root]
		if (rootIdx == null) continue

		const majorScore = scoreKey(rootIdx, false, chords)
		if (majorScore > bestScore) {
			bestScore = majorScore
			bestTonic = root
			bestMode = 'Mayor'
		}

		const minorScore = scoreKey(rootIdx, true, chords)
		if (minorScore > bestScore) {
			bestScore = minorScore
			bestTonic = root
			bestMode = 'Menor'
		}
	}

	return { tonic: bestTonic, mode: bestMode, score: bestScore }
}

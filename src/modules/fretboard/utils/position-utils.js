import { STRING_NOTES, STRING_INDEXES } from '../../../data'

export const TOTAL_FRETS = 120

export function getNoteIndexes(note) {
	const indexes = []
	for (const [stringName, startIndex] of Object.entries(STRING_INDEXES)) {
		for (let fret = 0; fret < 20; fret++) {
			if (STRING_NOTES[stringName][fret] === note) {
				indexes.push(startIndex + fret)
			}
		}
	}
	return indexes
}

export function positionApplies(pos, tonicIndex) {
	if (tonicIndex >= STRING_INDEXES.E) return pos === 1 || pos === 2
	if (tonicIndex >= STRING_INDEXES.A) return pos === 3 || pos === 4
	if (tonicIndex >= STRING_INDEXES.D) return pos === 5
	return false
}

export function noteToGlobalIndex(stringName, rootFret, fretOffset) {
	return STRING_INDEXES[stringName] + rootFret + fretOffset
}

export function normalizeDegree(deg) {
	if (deg === 'b3') return 3
	if (deg === 'b5') return 5
	if (deg === 'b7') return 7
	return deg
}

export function findLowestChordNote(voicingNotes, rootFret) {
	let bestStringIdx = -1
	let bestFret = 999
	let bestDegree = null

	for (const { string, fretOffset, degree } of voicingNotes) {
		const stringIdx = STRING_INDEXES[string]
		const noteFret = rootFret + fretOffset
		if (noteFret < 0 || noteFret >= 20) continue

		const globalIdx = stringIdx + noteFret
		if (globalIdx < 0 || globalIdx >= TOTAL_FRETS) continue

		if (stringIdx > bestStringIdx || (stringIdx === bestStringIdx && noteFret < bestFret)) {
			bestStringIdx = stringIdx
			bestFret = noteFret
			bestDegree = degree
		}
	}

	return normalizeDegree(bestDegree)
}

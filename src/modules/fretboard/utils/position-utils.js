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



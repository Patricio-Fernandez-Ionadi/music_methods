import { ENHARMONICS } from '../../../data'

export const CHROMATIC = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'Bb',
	'B',
]

export function normalizeNote(note) {
	return ENHARMONICS[note] || note
}

export function getExtensionNotesForDegree(scale, degreeIndex) {
	const root = scale[degreeIndex]
	const rootIdx = CHROMATIC.indexOf(root)
	return {
		7: rootIdx >= 0 ? CHROMATIC[(rootIdx + 11) % 12] : null,
		b7: rootIdx >= 0 ? CHROMATIC[(rootIdx + 10) % 12] : null,
		6: scale[(degreeIndex + 5) % 7],
		9: scale[(degreeIndex + 1) % 7],
		11: scale[(degreeIndex + 3) % 7],
		sus4: scale[(degreeIndex + 3) % 7],
		sus2: scale[(degreeIndex + 1) % 7],
	}
}

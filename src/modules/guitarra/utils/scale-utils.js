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

export const SHARP_TO_FLAT = {}
for (const [flat, sharp] of Object.entries(ENHARMONICS)) {
	SHARP_TO_FLAT[sharp] = flat
}

export function scaleNoteName(note, currentScale) {
	if (currentScale.includes(note)) return note
	const flat = SHARP_TO_FLAT[note]
	if (flat && currentScale.includes(flat)) return flat
	return note
}

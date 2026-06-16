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



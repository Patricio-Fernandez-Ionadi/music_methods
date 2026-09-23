const FULL_FRET_WIDTH = 50
const REDUCED_FRET_WIDTH = 70

export const FRETBOARD_VARIANTS = {
	full: { fretRange: { start: 0, end: 12 }, width: 13 * FULL_FRET_WIDTH },
	voicing: { window: 6, width: 6 * REDUCED_FRET_WIDTH },
	chordDict: { window: 5, width: 5 * REDUCED_FRET_WIDTH },
}
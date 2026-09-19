import { CHROMATIC } from './scale-utils'

/* ── Note → chromatic index ─────────────────────────────── */

export const NOTE_IDX = {}
CHROMATIC.forEach((n, i) => { NOTE_IDX[n] = i })
NOTE_IDX['Db'] = 1;  NOTE_IDX['Eb'] = 3
NOTE_IDX['Gb'] = 6;  NOTE_IDX['Ab'] = 8
NOTE_IDX['A#'] = 10; NOTE_IDX['Bb'] = 10

export function getNoteChromaticIndex(note) {
	return NOTE_IDX[note] ?? -1
}

/* ── Open string chromatic indices ──────────────────────── */

const OPEN_STRING = { e: 4, b: 11, g: 7, D: 2, A: 9, E: 4 }

export function getFretOnString(note, stringName) {
	const noteIdx = NOTE_IDX[note]
	const openIdx = OPEN_STRING[stringName]
	if (noteIdx == null || openIdx == null) return -1
	return (noteIdx - openIdx + 12) % 12
}

/* ── Interval patterns per quality ──────────────────────── */

export const CHORD_INTERVALS = {
	M:    [0, 4, 7],
	m:    [0, 3, 7],
	dim:  [0, 3, 6],
	'7':  [0, 4, 7, 10],
	m7:   [0, 3, 7, 10],
	maj7: [0, 4, 7, 11],
	sus4: [0, 5, 7],
	sus2: [0, 2, 7],
}

/* ── String sets ───────────────────────────────────────────
 *  3-string set for close triads (top strings)
 *  4-string sets for drop-2 voicings (7th chords)
 */

const STRING_SETS = {
	GBE:  { strings: ['g', 'b', 'e'],           label: 'Agudas' },
	DGBE: { strings: ['D', 'g', 'b', 'e'],      label: 'DGBE' },
	ADGB: { strings: ['A', 'D', 'g', 'b'],      label: 'ADGB' },
}

const STRING_ORDER = ['E', 'A', 'D', 'g', 'b', 'e']

/* ── Generate frets on any string set ──────────────────────
 *  Returns [lowE, A, D, G, B, highE] with -1 for strings
 *  not in the set.
 */

function generateFrets(rootIdx, intervals, stringNames) {
	const frets = [-1, -1, -1, -1, -1, -1]
	stringNames.forEach((name) => {
		const i = stringNames.indexOf(name)
		const noteIdx = (rootIdx + intervals[i] + 12) % 12
		const noteName = CHROMATIC[noteIdx]
		const fret = getFretOnString(noteName, name)
		frets[STRING_ORDER.indexOf(name)] = fret
	})
	return frets
}

/* ── Close voicings (3 or 4 strings) ───────────────────────
 *  For triads: 3 inversions, root doubled on 4-string sets
 *  For 7ths:   4 inversions, as-is
 */

function buildCloseVoicings(root, quality, setKey) {
	const intervals = CHORD_INTERVALS[quality]
	if (!intervals) return []
	const rootIdx = NOTE_IDX[root]
	if (rootIdx == null) return []

	const set = STRING_SETS[setKey]
	if (!set) return []

	const numStrings = set.strings.length
	const numNotes = intervals.length
	const numInversions = numNotes === 3 ? 3 : 4
	const voicings = []

	for (let inv = 0; inv < numInversions; inv++) {
		let voice = [
			...intervals.slice(inv),
			...intervals.slice(0, inv),
		]
		// Pad to fill string count (double root for triads on 4 strings)
		while (voice.length < numStrings) {
			voice.push(voice[0])
		}

		const frets = generateFrets(rootIdx, voice, set.strings)

		const played = frets.filter(f => f >= 0)
		const span = Math.max(...played) - Math.min(...played)
		if (span > 5) continue

		const name = set.label + (inv > 0 ? ` ${inv}ª inv.` : '')
		voicings.push({ name, frets })
	}

	return voicings
}

/* ── Drop-2 voicings (4-string sets, 7th chords) ───────────
 *  Take 2nd from top, drop it an octave (place at bottom)
 */

function buildDrop2Voicings(root, quality, setKey) {
	const intervals = CHORD_INTERVALS[quality]
	if (!intervals || intervals.length !== 4) return []
	const rootIdx = NOTE_IDX[root]
	if (rootIdx == null) return []

	const set = STRING_SETS[setKey]
	if (!set || set.strings.length !== 4) return []

	const voicings = []
	for (let inv = 0; inv < 4; inv++) {
		const close = [
			...intervals.slice(inv),
			...intervals.slice(0, inv),
		]
		// drop-2: [a, b, c, d] → [c, a, b, d]
		const dropped = [close[2], close[0], close[1], close[3]]

		const frets = generateFrets(rootIdx, dropped, set.strings)

		const played = frets.filter(f => f >= 0)
		const span = Math.max(...played) - Math.min(...played)
		if (span > 5) continue

		const name = set.label + (inv > 0 ? ` ${inv}ª inv.` : '')
		voicings.push({ name, frets })
	}

	return voicings
}

/* ── CAGED barre form offset patterns ─────────────────────
 *  Each array: [lowE, A, D, G, B, highE]
 *  -1 = muted, 0+ = semitones above the root fret
 */

const BARRE = {
	E: {
		M:    [0, 2, 2, 1, 0, 0],
		m:    [0, 2, 2, 0, 0, 0],
		'7':  [0, 2, 0, 1, 0, 0],
		m7:   [0, 2, 0, 0, 0, 0],
		maj7: [0, 2, 1, 1, 0, 0],
		dim:  [0, 1, 2, 0, -1, 0],
		aug:  [0, 3, 2, 1, 1, 0],
		sus4: [0, 2, 2, 2, 0, 0],
		sus2: [0, 2, 4, 4, 0, 0],
	},
	A: {
		M:    [-1, 0, 2, 2, 2, 0],
		m:    [-1, 0, 2, 2, 1, 0],
		'7':  [-1, 0, 2, 0, 2, 0],
		m7:   [-1, 0, 2, 0, 1, 0],
		maj7: [-1, 0, 2, 1, 2, 0],
		dim:  [-1, 0, 1, 2, 1, -1],
		aug:  [-1, 0, 3, 2, 2, 1],
		sus4: [-1, 0, 2, 2, 3, 0],
		sus2: [-1, 0, 2, 2, 0, 0],
	},
	D: {
		M:    [-1, -1, 0, 2, 3, 2],
		m:    [-1, -1, 0, 2, 3, 1],
		'7':  [-1, -1, 0, 2, 1, 2],
		m7:   [-1, -1, 0, 2, 1, 1],
		maj7: [-1, -1, 0, 2, 2, 2],
		dim:  [-1, -1, 0, 1, 3, 1],
		aug:  [-1, -1, 0, 3, 3, 2],
		sus4: [-1, -1, 0, 2, 3, 3],
		sus2: [-1, -1, 0, 2, 3, 0],
	},
}

function applyBarre(rootFret, offsets) {
	return offsets.map(o => o < 0 ? -1 : o + rootFret)
}

export function eFormBarre(rootFret, quality = 'M') {
	return applyBarre(rootFret, BARRE.E[quality] || BARRE.E.M)
}

export function aFormBarre(rootFret, quality = 'M') {
	return applyBarre(rootFret, BARRE.A[quality] || BARRE.A.M)
}

export function dFormBarre(rootFret, quality = 'M') {
	return applyBarre(rootFret, BARRE.D[quality] || BARRE.D.M)
}

/* ── Build all barre voicings for a root + quality ──────── */

export function buildBarreVoicings(root, quality) {
	const rootIdx = NOTE_IDX[root]
	if (rootIdx == null) return []

	const voicings = []

	const eFret = getFretOnString(root, 'E')
	const aFret = getFretOnString(root, 'A')
	const dFret = getFretOnString(root, 'D')

	if (eFret >= 0 && eFret <= 12) {
		voicings.push({ name: 'Cejilla E', frets: eFormBarre(eFret, quality) })
	}
	if (aFret >= 0 && aFret <= 12) {
		voicings.push({ name: 'Cejilla A', frets: aFormBarre(aFret, quality) })
	}
	if (dFret >= 0 && dFret <= 12) {
		voicings.push({ name: 'Cejilla D', frets: dFormBarre(dFret, quality) })
	}

	return voicings
}

/* ── Build all non-barre voicings for a root + quality ──── */

export function buildAllVoicings(root, quality) {
	const intervals = CHORD_INTERVALS[quality]
	if (!intervals) return []

	const isSeventh = intervals.length === 4
	const voicings = []

	// Close triads on top 3 strings (triad types only)
	if (!isSeventh) {
		voicings.push(...buildCloseVoicings(root, quality, 'GBE'))
	}

	// Drop-2 on 4-string sets (only 7th chords: 7, m7, maj7)
	if (isSeventh) {
		voicings.push(...buildDrop2Voicings(root, quality, 'DGBE'))
		voicings.push(...buildDrop2Voicings(root, quality, 'ADGB'))
	}

	return voicings
}

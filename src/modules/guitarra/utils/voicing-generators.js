import { CHROMATIC } from './scale-utils'

/* ── Note → chromatic index ─────────────────────────────── */

const NOTE_IDX = {}
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

const TRIAD_INTERVALS = {
	M:   [0, 4, 7],
	m:   [0, 3, 7],
	dim: [0, 3, 6],
	aug: [0, 4, 8],
}

/* ── String sets for close triads ───────────────────────── */

const STRING_SETS = {
	GBE: { strings: ['g', 'b', 'e'] },
	DGB: { strings: ['D', 'g', 'b'] },
	ADG: { strings: ['A', 'D', 'g'] },
	EAD: { strings: ['E', 'A', 'D'] },
}

/* ── Generate a close-voiced triad on 3 adjacent strings ─── */

export function generateTriadVoicing(root, quality, inversion = 0, stringSetKey = 'GBE') {
	const rootIdx = typeof root === 'number' ? root : NOTE_IDX[root]
	if (rootIdx == null) return null

	const intervals = TRIAD_INTERVALS[quality]
	if (!intervals) return null

	const set = STRING_SETS[stringSetKey]
	if (!set) return null

	const rotated = [...intervals.slice(inversion), ...intervals.slice(0, inversion)]

	const frets = [-1, -1, -1, -1, -1, -1]
	const order = ['E', 'A', 'D', 'g', 'b', 'e']

	set.strings.forEach((stringName, i) => {
		const noteIdx = (rootIdx + rotated[i]) % 12
		const noteName = CHROMATIC[noteIdx]
		const fret = getFretOnString(noteName, stringName)
		const strIdx = order.indexOf(stringName)
		frets[strIdx] = fret
	})

	return frets
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

/* ── Build all triad inversions for a root + quality ────── */

export function buildTriadSetVoicings(root, quality) {
	const rootIdx = NOTE_IDX[root]
	if (rootIdx == null) return []

	const invNames = ['', ' (1ª inv.)', ' (2ª inv.)']
	const setKeys = ['GBE', 'DGB', 'ADG', 'EAD']
	const setLabels = { GBE: 'Triada aguda', DGB: 'Triada media', ADG: 'Triada grave', EAD: 'Triada baja' }
	const voicings = []

	for (const key of setKeys) {
		for (let inv = 0; inv < 3; inv++) {
			const frets = generateTriadVoicing(rootIdx, quality, inv, key)
			if (frets) {
				let name = setLabels[key]
				if (inv > 0) name += invNames[inv]
				voicings.push({ name, frets })
			}
		}
	}

	return voicings
}

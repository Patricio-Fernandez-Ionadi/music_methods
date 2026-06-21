/**
 * Chord Dictionary — music_methods
 *
 * ============================================================
 *  FORMATO
 * ============================================================
 *
 * CHORD_TYPES agrupa digitaciones por tipo de acorde.
 * Cada tipo tiene:
 *   label    → nombre en español para la UI
 *   short    → abreviatura musical ('', 'm', 'dim', '7', etc.)
 *   roots    → objeto indexado por nota raíz (C, C#, D, …, B)
 *
 * Cada entrada en roots es un array de digitaciones (voicings).
 *
 * Digitación (Voicing):
 *   name     → nombre descriptivo (ej. 'Abierta', 'Cejilla E')
 *   frets    → [lowE, A, D, G, B, highE]
 *              -1 = cuerda no se toca (muda)
 *               0 = cuerda al aire
 *              >0 = traste que se pisa
 *
 * ============================================================
 *  CÓMO USAR
 * ============================================================
 *
 *   import { CHORD_TYPES, getChordVoicings, voicingToIndexes } from './data/chord-dictionary'
 *
 *   // Obtener digitaciones para Do mayor
 *   const voicings = getChordVoicings('C', 'M')
 *   // → [{ name: 'Abierta', frets: [-1, 3, 2, 0, 1, 0] }, …]
 *
 *   // Convertir a Set de índices globales para el diapasón
 *   const indexes = voicingToIndexes(voicings[0])
 *   // → Set { 61, 42, 20, 82, 103, 83, … }
 *
 * ============================================================
 *  GENERACIÓN AUTOMÁTICA
 * ============================================================
 *
 * Los voicings de barre (Cejilla E, A, D) y las triadas en
 * sets de cuerdas se generan mediante los helpers en
 * src/modules/guitarra/utils/voicing-generators.js
 *
 * Los open chords (Abierta) se mantienen como datos manuales
 * porque son únicos en cada raíz.
 */

import {
	buildBarreVoicings,
	buildTriadSetVoicings,
} from '../utils/voicing-generators'
import { normalizeNote, SHARP_TO_FLAT } from '../utils/scale-utils'

/* ------------------------------------------------------------------ */
/*  STRING_ORDER de referencia (high‑e → low‑E)                       */
/*  STRING_ORDER = ['e', 'b', 'g', 'D', 'A', 'E']                    */
/*  Índice en array frets: 0=lowE, 1=A, 2=D, 3=G, 4=B, 5=highE     */
/* ------------------------------------------------------------------ */

const STRING_NAMES = ['E', 'A', 'D', 'g', 'b', 'e']

/**
 * Convierte una digitación a Set de índices globales del diapasón.
 * Los índices se usan en FretNote para resaltar las notas del acorde.
 *
 * @param {Voicing} voicing  - { name, frets }
 * @param {Object}  STRING_INDEXES  - { e:0, b:20, g:40, D:60, A:80, E:100 }
 * @returns {Set<number>}
 */
export function voicingToIndexes(voicing, STRING_INDEXES) {
	const indexes = new Set()
	for (let i = 0; i < 6; i++) {
		const fret = voicing.frets[i]
		if (fret < 0) continue
		const stringName = STRING_NAMES[i]
		const globalIdx = STRING_INDEXES[stringName] + fret
		indexes.add(globalIdx)
	}
	return indexes
}

/**
 * Retorna las digitaciones disponibles para una raíz + tipo de acorde.
 *
 * @param {string} root  - Nota raíz ('C', 'C#', 'D', …, 'B')
 * @param {string} type  - Clave en CHORD_TYPES ('M', 'm', '7', etc.)
 * @returns {Voicing[]}   Array de digitaciones (vacío si no hay)
 */
export function getChordVoicings(root, type) {
	const typeRoots = CHORD_TYPES[type]?.roots
	if (!typeRoots) return []
	return typeRoots[root]
		?? typeRoots[normalizeNote(root)]
		?? typeRoots[SHARP_TO_FLAT[root]]
		?? []
}

/* ── Helper: combinar voicings manuales + generados ────────── */

function withBarreAndTriads(root, quality, manual = []) {
	const barre = buildBarreVoicings(root, quality)
	const triads = buildTriadSetVoicings(root, quality)
	return [...manual, ...barre, ...triads]
}

function allRoots(fn) {
	return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'].reduce(
		(acc, root) => { acc[root] = fn(root); return acc }, {},
	)
}

/* ================================================================== */
/*  CHORD TYPES — catálogo de acordes                                 */
/* ================================================================== */

export const CHORD_TYPES = {

	/* ─── ACORDE MAYOR ─── */
	M: {
		label: 'Mayor',
		short: '',
		roots: {
			C: withBarreAndTriads('C', 'M', [
				{ name: 'Abierta', frets: [-1, 3, 2, 0, 1, 0] },
			]),
			D: withBarreAndTriads('D', 'M', [
				{ name: 'Abierta', frets: [-1, -1, 0, 2, 3, 2] },
			]),
			E: withBarreAndTriads('E', 'M', [
				{ name: 'Abierta', frets: [0, 2, 2, 1, 0, 0] },
			]),
			F: withBarreAndTriads('F', 'M'),
			G: withBarreAndTriads('G', 'M', [
				{ name: 'Abierta', frets: [3, 2, 0, 0, 0, 3] },
			]),
			A: withBarreAndTriads('A', 'M', [
				{ name: 'Abierta', frets: [-1, 0, 2, 2, 2, 0] },
			]),
			B: withBarreAndTriads('B', 'M'),
			Bb: withBarreAndTriads('Bb', 'M'),
			Db: withBarreAndTriads('Db', 'M'),
			Eb: withBarreAndTriads('Eb', 'M'),
			'F#': withBarreAndTriads('F#', 'M'),
			'G#': withBarreAndTriads('G#', 'M'),
		},
	},

	/* ─── ACORDE MENOR ─── */
	m: {
		label: 'Menor',
		short: 'm',
		roots: {
			C: withBarreAndTriads('C', 'm'),
			D: withBarreAndTriads('D', 'm', [
				{ name: 'Abierta', frets: [-1, -1, 0, 2, 3, 1] },
			]),
			E: withBarreAndTriads('E', 'm', [
				{ name: 'Abierta', frets: [0, 2, 2, 0, 0, 0] },
			]),
			F: withBarreAndTriads('F', 'm'),
			G: withBarreAndTriads('G', 'm'),
			A: withBarreAndTriads('A', 'm', [
				{ name: 'Abierta', frets: [-1, 0, 2, 2, 1, 0] },
			]),
			B: withBarreAndTriads('B', 'm'),
			Bb: withBarreAndTriads('Bb', 'm'),
			Db: withBarreAndTriads('Db', 'm'),
			Eb: withBarreAndTriads('Eb', 'm'),
			'F#': withBarreAndTriads('F#', 'm'),
			'G#': withBarreAndTriads('G#', 'm'),
		},
	},

	/* ─── SÉPTIMA DOMINANTE ─── */
	7: {
		label: 'Dominante 7ª',
		short: '7',
		roots: allRoots((root) => {
			const manual = []
			if (root === 'A') manual.push({ name: 'Abierta', frets: [-1, 0, 2, 0, 2, 0] })
			if (root === 'E') manual.push({ name: 'Abierta', frets: [0, 2, 0, 1, 0, 0] })
			if (root === 'D') manual.push({ name: 'Abierta', frets: [-1, -1, 0, 2, 1, 2] })
			if (root === 'G') manual.push({ name: 'Abierta', frets: [3, 2, 0, 0, 0, 1] })
			return withBarreAndTriads(root, '7', manual)
		}),
	},

	/* ─── MENOR SÉPTIMA ─── */
	m7: {
		label: 'Menor 7ª',
		short: 'm7',
		roots: allRoots((root) => {
			const manual = []
			if (root === 'E') manual.push({ name: 'Abierta', frets: [0, 2, 0, 0, 0, 0] })
			if (root === 'A') manual.push({ name: 'Abierta', frets: [-1, 0, 2, 0, 1, 0] })
			if (root === 'D') manual.push({ name: 'Abierta', frets: [-1, -1, 0, 2, 1, 1] })
			return withBarreAndTriads(root, 'm7', manual)
		}),
	},

	/* ─── MAYOR SÉPTIMA ─── */
	maj7: {
		label: 'Mayor 7ª',
		short: 'maj7',
		roots: allRoots((root) => {
			const manual = []
			if (root === 'C') manual.push({ name: 'Abierta', frets: [-1, 3, 2, 0, 0, 0] })
			if (root === 'G') manual.push({ name: 'Abierta', frets: [3, 2, 0, 0, 0, 2] })
			return withBarreAndTriads(root, 'maj7', manual)
		}),
	},

	/* ─── DISMINUIDO ─── */
	dim: {
		label: 'Disminuido',
		short: 'dim',
		roots: allRoots((root) => {
			const manual = []
			if (root === 'B') manual.push({ name: 'Abierta', frets: [-1, 1, 2, 0, 1, 0] })
			return withBarreAndTriads(root, 'dim', manual)
		}),
	},

	/* ─── SUSPENDIDO CUARTA ─── */
	sus4: {
		label: 'Suspendida 4ª',
		short: 'sus4',
		roots: allRoots((root) => {
			const manual = []
			if (root === 'A') manual.push({ name: 'Abierta', frets: [-1, 0, 2, 2, 3, 0] })
			if (root === 'D') manual.push({ name: 'Abierta', frets: [-1, -1, 0, 2, 3, 3] })
			if (root === 'E') manual.push({ name: 'Abierta', frets: [0, 2, 2, 2, 0, 0] })
			if (root === 'G') manual.push({ name: 'Abierta', frets: [3, 2, 0, 0, 0, 3] })
			return withBarreAndTriads(root, 'sus4', manual)
		}),
	},

	/* ─── SUSPENDIDO SEGUNDA ─── */
	sus2: {
		label: 'Suspendida 2ª',
		short: 'sus2',
		roots: allRoots((root) => {
			const manual = []
			if (root === 'D') manual.push({ name: 'Abierta', frets: [-1, -1, 0, 2, 3, 0] })
			if (root === 'A') manual.push({ name: 'Abierta', frets: [-1, 0, 2, 2, 0, 0] })
			if (root === 'E') manual.push({ name: 'Abierta', frets: [0, 2, 4, 4, 0, 0] })
			return withBarreAndTriads(root, 'sus2', manual)
		}),
	},
}

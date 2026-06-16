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
 *  CÓMO AGREGAR NUEVOS ACORDES
 * ============================================================
 *
 *   1. Agregar el tipo en CHORD_TYPES si no existe.
 *   2. Agregar la raíz y sus digitaciones en roots.
 *   3. Las digitaciones pueden ser fijas (como open chords)
 *      o calculadas (ej. cejilla = forma E desplazada).
 *
 *   helpers para generar digitaciones por fórmula:
 *     generateEForm(rootFret)  → cejilla con forma de Mi
 *     generateAForm(rootFret)  → cejilla con forma de La
 */

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
	return CHORD_TYPES[type]?.roots[root] ?? []
}


/* ================================================================== */
/*  CHORD TYPES — catálogo de acordes                                 */
/* ================================================================== */

export const CHORD_TYPES = {
	/**
	 * ACORDE MAYOR (triada: 1, 3, 5)
	 *
	 * Ejemplos:
	 *   getChordVoicings('C', 'M')  → digitaciones de Do mayor
	 *   getChordVoicings('G', 'M')  → digitaciones de Sol mayor
	 */
	M: {
		label: 'Mayor',
		short: '',
		roots: {
			C: [
				{ name: 'Abierta', frets: [-1, 3, 2, 0, 1, 0] },
				{ name: 'Cejilla E', frets: [8, 10, 10, 9, 8, 8] },
				{ name: 'Cejilla A', frets: [-1, 3, 5, 5, 5, 3] },
			],
			D: [
				{ name: 'Abierta', frets: [-1, -1, 0, 2, 3, 2] },
				{ name: 'Cejilla E', frets: [10, 12, 12, 11, 10, 10] },
				{ name: 'Cejilla A', frets: [-1, 5, 7, 7, 7, 5] },
			],
			E: [
				{ name: 'Abierta', frets: [0, 2, 2, 1, 0, 0] },
				{ name: 'Cejilla A', frets: [-1, 7, 9, 9, 9, 7] },
				{ name: 'Cejilla D', frets: [-1, -1, 7, 9, 10, 9] },
			],
			F: [
				{ name: 'Cejilla E', frets: [1, 3, 3, 2, 1, 1] },
				{ name: 'Cejilla A', frets: [-1, 8, 10, 10, 10, 8] },
			],
			G: [
				{ name: 'Abierta', frets: [3, 2, 0, 0, 0, 3] },
				{ name: 'Cejilla E', frets: [3, 5, 5, 4, 3, 3] },
				{ name: 'Cejilla A', frets: [-1, 10, 12, 12, 12, 10] },
			],
			A: [
				{ name: 'Abierta', frets: [-1, 0, 2, 2, 2, 0] },
				{ name: 'Cejilla E', frets: [5, 7, 7, 6, 5, 5] },
				{ name: 'Cejilla A', frets: [-1, 0, 2, 2, 2, 0] },
			],
			B: [
				{ name: 'Cejilla A', frets: [-1, 2, 4, 4, 4, 2] },
				{ name: 'Cejilla E', frets: [7, 9, 9, 8, 7, 7] },
			],
			Bb: [
				{ name: 'Cejilla A', frets: [-1, 1, 3, 3, 3, 1] },
				{ name: 'Cejilla E', frets: [6, 8, 8, 7, 6, 6] },
			],
			Db: [
				{ name: 'Cejilla A', frets: [-1, 4, 6, 6, 6, 4] },
				{ name: 'Cejilla E', frets: [9, 11, 11, 10, 9, 9] },
			],
			Eb: [
				{ name: 'Cejilla A', frets: [-1, 6, 8, 8, 8, 6] },
				{ name: 'Cejilla E', frets: [11, 13, 13, 12, 11, 11] },
			],
			Fsharp: [
				{ name: 'Cejilla E', frets: [2, 4, 4, 3, 2, 2] },
				{ name: 'Cejilla A', frets: [-1, 9, 11, 11, 11, 9] },
			],
			Gsharp: [
				{ name: 'Cejilla E', frets: [4, 6, 6, 5, 4, 4] },
				{ name: 'Cejilla A', frets: [-1, 11, 13, 13, 13, 11] },
			],
		},
	},

	/**
	 * ACORDE MENOR (triada: 1, b3, 5)
	 */
	m: {
		label: 'Menor',
		short: 'm',
		roots: {
			C: [
				{ name: 'Cejilla E', frets: [8, 10, 10, 8, 8, 8] },
				{ name: 'Cejilla A', frets: [-1, 3, 5, 5, 4, 3] },
			],
			D: [
				{ name: 'Abierta', frets: [-1, -1, 0, 2, 3, 1] },
				{ name: 'Cejilla E', frets: [10, 12, 12, 10, 10, 10] },
				{ name: 'Cejilla A', frets: [-1, 5, 7, 7, 6, 5] },
			],
			E: [
				{ name: 'Abierta', frets: [0, 2, 2, 0, 0, 0] },
				{ name: 'Cejilla A', frets: [-1, 7, 9, 9, 8, 7] },
			],
			F: [
				{ name: 'Cejilla E (barre)', frets: [1, 3, 3, 1, 1, 1] },
				{ name: 'Cejilla A', frets: [-1, 8, 10, 10, 9, 8] },
			],
			G: [
				{ name: 'Cejilla E', frets: [3, 5, 5, 3, 3, 3] },
				{ name: 'Cejilla A', frets: [-1, 10, 12, 12, 11, 10] },
			],
			A: [
				{ name: 'Abierta', frets: [-1, 0, 2, 2, 1, 0] },
				{ name: 'Cejilla E', frets: [5, 7, 7, 5, 5, 5] },
			],
			B: [
				{ name: 'Cejilla A', frets: [-1, 2, 4, 4, 3, 2] },
				{ name: 'Cejilla E', frets: [7, 9, 9, 7, 7, 7] },
			],
			Bb: [
				{ name: 'Cejilla A', frets: [-1, 1, 3, 3, 2, 1] },
				{ name: 'Cejilla E', frets: [6, 8, 8, 6, 6, 6] },
			],
			Db: [
				{ name: 'Cejilla A', frets: [-1, 4, 6, 6, 5, 4] },
				{ name: 'Cejilla E', frets: [9, 11, 11, 9, 9, 9] },
			],
			Eb: [
				{ name: 'Cejilla A', frets: [-1, 6, 8, 8, 7, 6] },
				{ name: 'Cejilla E', frets: [11, 13, 13, 11, 11, 11] },
			],
			Fsharp: [
				{ name: 'Cejilla E', frets: [2, 4, 4, 2, 2, 2] },
				{ name: 'Cejilla A', frets: [-1, 9, 11, 11, 10, 9] },
			],
			Gsharp: [
				{ name: 'Cejilla E', frets: [4, 6, 6, 4, 4, 4] },
				{ name: 'Cejilla A', frets: [-1, 11, 13, 13, 12, 11] },
			],
		},
	},

	/**
	 * ACORDE DE SÉPTIMA DOMINANTE (1, 3, 5, b7)
	 */
	7: {
		label: 'Dominante 7ª',
		short: '7',
		roots: {
			A: [{ name: 'Abierta', frets: [-1, 0, 2, 0, 2, 0] }],
			E: [{ name: 'Abierta', frets: [0, 2, 0, 1, 0, 0] }],
			D: [{ name: 'Abierta', frets: [-1, -1, 0, 2, 1, 2] }],
			G: [{ name: 'Abierta', frets: [3, 2, 0, 0, 0, 1] }],
			C: [
				{ name: 'Cejilla E', frets: [8, 10, 8, 9, 8, 8] },
				{ name: 'Cejilla A', frets: [-1, 3, 5, 3, 5, 3] },
			],
		},
	},

	/**
	 * ACORDE MENOR SÉPTIMA (1, b3, 5, b7)
	 */
	m7: {
		label: 'Menor 7ª',
		short: 'm7',
		roots: {
			E: [{ name: 'Abierta', frets: [0, 2, 0, 0, 0, 0] }],
			A: [{ name: 'Abierta', frets: [-1, 0, 2, 0, 1, 0] }],
			D: [{ name: 'Abierta', frets: [-1, -1, 0, 2, 1, 1] }],
			B: [{ name: 'Cejilla A', frets: [-1, 2, 4, 2, 3, 2] }],
		},
	},

	/**
	 * ACORDE MAYOR SÉPTIMA (1, 3, 5, 7)
	 */
	maj7: {
		label: 'Mayor 7ª',
		short: 'maj7',
		roots: {
			C: [
				{ name: 'Abierta', frets: [-1, 3, 2, 0, 0, 0] },
				{ name: 'Cejilla E', frets: [8, 12, 10, 9, 8, 8] },
			],
			F: [{ name: 'Cejilla E', frets: [1, 3, 1, 2, 1, 1] }],
			G: [{ name: 'Abierta', frets: [3, 2, 0, 0, 0, 2] }],
			A: [{ name: 'Cejilla E', frets: [5, 7, 5, 6, 5, 5] }],
		},
	},

	/**
	 * ACORDE DISMINUIDO (1, b3, b5)
	 */
	dim: {
		label: 'Disminuido',
		short: 'dim',
		roots: {
			B: [{ name: 'Abierta', frets: [-1, 1, 2, 0, 1, 0] }],
			C: [{ name: 'Cejilla A', frets: [-1, 3, 4, 5, 4, -1] }],
			D: [{ name: 'Cejilla A', frets: [-1, 5, 6, 7, 6, -1] }],
		},
	},

	/**
	 * ACORDE SUSPENDIDO CUARTA (1, 4, 5)
	 */
	sus4: {
		label: 'Suspendida 4ª',
		short: 'sus4',
		roots: {
			A: [{ name: 'Abierta', frets: [-1, 0, 2, 2, 3, 0] }],
			D: [{ name: 'Abierta', frets: [-1, -1, 0, 2, 3, 3] }],
			E: [{ name: 'Abierta', frets: [0, 2, 2, 2, 0, 0] }],
			G: [{ name: 'Abierta', frets: [3, 2, 0, 0, 0, 3] }],
		},
	},

	/**
	 * ACORDE SUSPENDIDO SEGUNDA (1, 2, 5)
	 */
	sus2: {
		label: 'Suspendida 2ª',
		short: 'sus2',
		roots: {
			D: [{ name: 'Abierta', frets: [-1, -1, 0, 2, 3, 0] }],
			A: [{ name: 'Abierta', frets: [-1, 0, 2, 2, 0, 0] }],
			E: [{ name: 'Abierta', frets: [0, 2, 4, 4, 0, 0] }],
		},
	},
}

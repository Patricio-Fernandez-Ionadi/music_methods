import { CHROMATIC as NOTES, noteToPitchClass } from '../../../shared/utils/scale-utils'
import { MODES } from '../../../data/modes'
import { SCALES } from '../../../data/scales'

const MODE_ORDER = ['jonico', 'dorico', 'frigio', 'lidio', 'mixolidio', 'eolico', 'locrio']

const MODE_LABELS = {
	jonico: 'Jónico', dorico: 'Dórico', frigio: 'Frigio', lidio: 'Lidio',
	mixolidio: 'Mixolidio', eolico: 'Eólico', locrio: 'Locrio',
}

function pitchClasses(notes) {
	return notes.map(noteToPitchClass)
}

function buildKeyCandidates() {
	const candidates = []

	for (const tonic of NOTES) {
		const pc = noteToPitchClass(tonic)
		if (pc === -1) continue

		const ionianScale = SCALES[tonic]?.jonico
		if (!ionianScale) continue
		const scalePCs = pitchClasses(ionianScale)

		for (const modeId of MODE_ORDER) {
			const mode = MODES[modeId]
			if (!mode) continue

			candidates.push({
				tonicPc: pc,
				tonic,
				modeId,
				modeName: MODE_LABELS[modeId],
				quality: mode.quality,
				degree: mode.degree,
				scaleNotes: scalePCs,
				expectedChords: mode.chords,
			})
		}
	}

	// Harmonic minor: minor scale with raised 7th
	const HARMONIC_MINOR_INTERVALS = [2, 1, 2, 2, 1, 3, 3]
	const HARMONIC_MINOR_QUALITIES = ['m', 'dim', 'aug', 'm', 'M', 'M', 'dim']
	const HARMONIC_MINOR_LABEL = 'Menor armónica'

	for (const tonic of NOTES) {
		const pc = noteToPitchClass(tonic)
		if (pc === -1) continue

		const scalePCs = []
		let pos = 0
		for (const step of HARMONIC_MINOR_INTERVALS) {
			scalePCs.push((pos + pc) % 12)
			pos += step
		}

		candidates.push({
			tonicPc: pc,
			tonic,
			modeId: 'armonica',
			modeName: HARMONIC_MINOR_LABEL,
			quality: 'menor',
			degree: null,
			scaleNotes: scalePCs,
			expectedChords: HARMONIC_MINOR_QUALITIES,
		})
	}

	return candidates
}

const ALL_CANDIDATES = buildKeyCandidates()

function scoreCandidate(candidate, chordPcs) {
	let score = 0
	for (const { pc, type } of chordPcs) {
		const degreeIdx = candidate.scaleNotes.indexOf(pc)
		if (degreeIdx === -1) continue

		const expected = candidate.expectedChords[degreeIdx]
		if (type === expected) {
			score += 3
		} else if (type === '7' && expected === 'M') {
			score += 2
		} else if (type === 'maj7' && expected === 'M') {
			score += 2
		}
	}
	return score
}

function getVariants(best) {
	const ionianScale = SCALES[best.tonic]?.jonico
	if (!ionianScale) return []

	const variants = []
	for (const modeId of MODE_ORDER) {
		const mode = MODES[modeId]
		if (!mode) continue

		const relativeTonic = ionianScale[mode.degree - 1]
		const relPc = noteToPitchClass(relativeTonic)
		if (relPc === -1) continue

		variants.push({
			tonic: relativeTonic,
			modeId,
			modeName: MODE_LABELS[modeId],
			degree: mode.degree,
		})
	}

	return variants
}

/**
 * Analiza una progresión de acordes y devuelve la tonalidad detectada.
 *
 * @param {{ root: string, type: string }[]} chords
 * @returns {{ best, variants }}
 */
export function analyzeKey(chords) {
	if (!chords || chords.length === 0) {
		return {
			best: {
				tonic: 'C', modeId: 'jonico', modeName: 'Jónico',
				quality: 'mayor', degree: 1, score: 0, fitPercent: 0,
				scaleNotes: pitchClasses(SCALES['C']?.jonico || NOTES),
			},
			variants: [],
		}
	}

	const chordPcs = chords.map((chord) => ({
		pc: noteToPitchClass(chord.root),
		type: chord.type,
	}))

	const totalPossible = chords.length * 3

	let bestCandidate = null
	let bestScore = -1

	const firstRootPc = chordPcs[0]?.pc
	const lastRootPc = chordPcs[chordPcs.length - 1]?.pc

	for (const candidate of ALL_CANDIDATES) {
		const score = scoreCandidate(candidate, chordPcs)
		if (score > bestScore) {
			bestScore = score
			bestCandidate = candidate
		} else if (score === bestScore && score > 0) {
			const candidateMatchesFirst = candidate.tonicPc === firstRootPc
			const candidateMatchesLast = candidate.tonicPc === lastRootPc
			const bestMatchesFirst = bestCandidate.tonicPc === firstRootPc
			const bestMatchesLast = bestCandidate.tonicPc === lastRootPc
			const candPref = (candidateMatchesFirst ? 2 : 0) + (candidateMatchesLast ? 1 : 0)
			const bestPref = (bestMatchesFirst ? 2 : 0) + (bestMatchesLast ? 1 : 0)
			if (candPref > bestPref) {
				bestCandidate = candidate
			}
		}
	}

	const fitPercent = totalPossible > 0
		? Math.round((bestScore / totalPossible) * 100)
		: 0

	const variants = getVariants(bestCandidate).map((v) => {
		const variantCandidate = ALL_CANDIDATES.find(
			(c) => c.tonic === v.tonic && c.modeId === v.modeId
		)
		const variantScore = variantCandidate
			? scoreCandidate(variantCandidate, chordPcs)
			: 0
		const variantFit = totalPossible > 0
			? Math.round((variantScore / totalPossible) * 100)
			: 0
		return {
			...v,
			score: variantScore,
			fitPercent: variantFit,
			isBest: v.tonic === bestCandidate.tonic && v.modeId === bestCandidate.modeId,
		}
	})

	return {
		best: {
			tonic: bestCandidate.tonic,
			modeId: bestCandidate.modeId,
			modeName: bestCandidate.modeName,
			quality: bestCandidate.quality,
			degree: bestCandidate.degree,
			score: bestScore,
			fitPercent,
			scaleNotes: bestCandidate.scaleNotes,
		},
		variants,
	}
}

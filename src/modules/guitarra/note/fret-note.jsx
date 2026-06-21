import { STRING_INDEXES } from '../../../data'
import { getChordNoteLabel } from '../utils/chord-labels'
import { scaleNoteName } from '../utils/scale-utils'

const SINGLE_MARKERS = [3, 5, 7, 9, 15, 17, 19]
const DOUBLE_MARKERS = [12]

export function FretNote({
	note,
	fret,
	stringName,
	normalizedScale = [],
	currentScale = [],
	showScaleTonic,
	positionIndexes,
	chordVoicingIndexes,
	triadVoicingIndexes,
	highlightedOnlyIndexes,
	root,
	third,
	fifth,
	showTriad,
	showThird,
	showFifth,
	hasActivePositions,
	hasChordVoicing,
	NOTE_CSS_VARS,
}) {
	const globalIndex = STRING_INDEXES[stringName] + fret
	const inScale = normalizedScale.includes(note)
	const isTonic = showScaleTonic && note === normalizedScale[0]
	const inPosition = positionIndexes.has(globalIndex)
	const inChordVoicing = chordVoicingIndexes.has(globalIndex)
	const inTriadVoicing = triadVoicingIndexes.has(globalIndex)
	const inVoicingHighlight = highlightedOnlyIndexes?.has(globalIndex) ?? false

	const isRoot = showTriad && note === root
	const isThird = showThird && note === third
	const isFifth = showFifth && note === fifth

	const chordLabel = showTriad
		? getChordNoteLabel(note, root, third, fifth)
		: null
	const inTriad = isRoot || isThird || isFifth || chordLabel !== null

	const usingChordVoicing = hasChordVoicing && showTriad
	const isVoicingNote = usingChordVoicing && inChordVoicing
	const showInThisPosition =
		!hasActivePositions || (hasActivePositions && inPosition)
	const showChordNote =
		(showTriad && (chordLabel !== null) && showInThisPosition) ||
		isVoicingNote

	const markerClass = SINGLE_MARKERS.includes(fret)
		? 'fret-marker'
		: DOUBLE_MARKERS.includes(fret)
			? 'fret-marker-double'
			: null

	const classes = ['fret']
	if (markerClass) classes.push(markerClass)

	/* ---------- highlightedOnlyIndexes active ---------- */
	if (highlightedOnlyIndexes) {
		if (inVoicingHighlight) {
			if (inTriad) {
				if (isRoot) classes.push('triadRoot')
				if (isThird) classes.push('triadThird')
				if (isFifth) classes.push('triadFifth')
			} else {
				classes.push(showTriad ? 'triadVoicingNote' : 'chordDictNote')
			}
		}

		if (showTriad && inScale && !inVoicingHighlight) {
			classes.push('fretActive')
		}

		const isAnyHighlighted = inVoicingHighlight || (showTriad && inScale)
		if (isAnyHighlighted) classes.push('highlighted')

		const noteVar = inVoicingHighlight ? NOTE_CSS_VARS[note] || null : null
		const noteColorVar = noteVar ? `var(${noteVar})` : null
		const displayNote = inVoicingHighlight
			? scaleNoteName(note, currentScale)
			: ''

		return (
			<div
				data-note={note}
				className={classes.join(' ')}
				style={noteColorVar ? { '--note-color': noteColorVar } : {}}
			>
				<span>{displayNote}</span>
			</div>
		)
	}

	/* ---------- normal mode ---------- */
	const isHighlighted =
		(isTonic && !inTriad && !isVoicingNote) ||
		(inScale && !showChordNote && !isVoicingNote && !inTriadVoicing) ||
		(inPosition && inScale && !showChordNote && !isVoicingNote) ||
		showChordNote ||
		isVoicingNote ||
		inTriadVoicing

	if (inScale && !showChordNote && !isVoicingNote)
		classes.push('fretActive')
	if (isTonic && !inTriad && !isVoicingNote)
		classes.push('fretTonic')
	if (inPosition && inScale && !showChordNote && !isVoicingNote)
		classes.push('positionNote')

	if (isVoicingNote) {
		const vLabel = getChordNoteLabel(note, root, third, fifth)
		if (vLabel === 'root') classes.push('triadRoot')
		else if (vLabel === 'third') classes.push('triadThird')
		else if (vLabel === 'fifth') classes.push('triadFifth')
	} else if (showChordNote) {
		if (isRoot) classes.push('triadRoot')
		if (isThird) classes.push('triadThird')
		if (isFifth) classes.push('triadFifth')
	}

	if (inTriadVoicing && !inTriad && !isVoicingNote)
		classes.push('triadVoicingNote')
	if (isHighlighted) classes.push('highlighted')

	const noteVar =
		showChordNote || isVoicingNote || inTriadVoicing
			? NOTE_CSS_VARS[note] || null
			: null
	const noteColorVar = noteVar ? `var(${noteVar})` : null

	const displayNote = isHighlighted
		? scaleNoteName(note, currentScale)
		: ''

	return (
		<div
			data-note={note}
			className={classes.join(' ')}
			style={noteColorVar ? { '--note-color': noteColorVar } : {}}
		>
			<span>{displayNote}</span>
		</div>
	)
}

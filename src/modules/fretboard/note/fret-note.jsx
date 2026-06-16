import { STRING_INDEXES } from '../../../data'
import { getChordNoteLabel } from '../utils/chord-labels'

export function FretNote({
	note,
	fret,
	stringName,
	normalizedScale,
	showScaleTonic,
	positionIndexes,
	chordVoicingIndexes,
	chordDictIndexes,
	hasChordDict,
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
	const inChordDict = hasChordDict && chordDictIndexes.has(globalIndex)

	const isRoot = showTriad && note === root
	const isThird = showThird && note === third
	const isFifth = showFifth && note === fifth

	const chordLabel = showTriad
		? getChordNoteLabel(note, root, third, fifth)
		: null
	const inTriad = isRoot || isThird || isFifth || chordLabel !== null

	const usingChordVoicing = hasChordVoicing && showTriad
	const isVoicingNote = (usingChordVoicing && inChordVoicing) && !hasChordDict
	const showInThisPosition =
		!hasActivePositions || (hasActivePositions && inPosition)
	const showChordNote =
		!hasChordDict &&
		((showTriad &&
			(chordLabel !== null) &&
			showInThisPosition) ||
		isVoicingNote)

	const isHighlighted =
		(isTonic && !inTriad && !isVoicingNote) ||
		(inScale && !showChordNote && !isVoicingNote) ||
		(inPosition && inScale && !showChordNote && !isVoicingNote) ||
		showChordNote ||
		isVoicingNote ||
		inChordDict

	const SINGLE_MARKERS = [3, 5, 7, 9, 15, 17, 19]
	const DOUBLE_MARKERS = [12]
	const markerClass = SINGLE_MARKERS.includes(fret)
		? 'fret-marker'
		: DOUBLE_MARKERS.includes(fret)
			? 'fret-marker-double'
			: null

	const classes = ['fret']
	if (markerClass) classes.push(markerClass)
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

	if (inChordDict) classes.push('chordDictNote')
	if (isHighlighted) classes.push('highlighted')

	const noteVar =
		showChordNote || isVoicingNote || (hasChordDict && inChordDict)
			? NOTE_CSS_VARS[note] || null
			: null
	const noteColorVar = noteVar ? `var(${noteVar})` : null

	return (
		<div
			key={fret}
			data-note={note}
			className={classes.join(' ')}
			style={noteColorVar ? { '--note-color': noteColorVar } : {}}
		>
			<span>{isHighlighted ? note : ''}</span>
		</div>
	)
}

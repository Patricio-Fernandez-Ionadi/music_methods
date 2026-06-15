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
	root,
	third,
	fifth,
	currentExtensions,
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

	const isRoot = showTriad && note === root
	const isThird = showThird && note === third
	const isFifth = showFifth && note === fifth

	const chordLabel = showTriad
		? getChordNoteLabel(note, root, third, fifth, currentExtensions)
		: null
	const isExtension =
		chordLabel !== null &&
		!['root', 'third', 'fifth'].includes(chordLabel)
	const inTriad = isRoot || isThird || isFifth || chordLabel !== null

	const usingChordVoicing = hasChordVoicing && showTriad
	const isVoicingNote = usingChordVoicing && inChordVoicing
	const showInThisPosition =
		!hasActivePositions || (hasActivePositions && inPosition)
	const showChordNote =
		(showTriad &&
			(isRoot || isThird || isFifth || isExtension) &&
			showInThisPosition) ||
		isVoicingNote

	const isHighlighted =
		(isTonic && !inTriad && !isVoicingNote) ||
		(inScale && !showChordNote && !isVoicingNote) ||
		(inPosition && inScale && !showChordNote && !isVoicingNote) ||
		showChordNote ||
		isVoicingNote

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
		const vLabel = getChordNoteLabel(
			note,
			root,
			third,
			fifth,
			currentExtensions,
		)
		if (vLabel === 'root') classes.push('triadRoot')
		else if (vLabel === 'third') classes.push('triadThird')
		else if (vLabel === 'fifth') classes.push('triadFifth')
		else classes.push('triadExtension')
	} else if (showChordNote) {
		if (isRoot) classes.push('triadRoot')
		if (isThird) classes.push('triadThird')
		if (isFifth) classes.push('triadFifth')
		if (isExtension) classes.push('triadExtension')
	}

	if (isHighlighted) classes.push('highlighted')

	const noteVar =
		showChordNote || isVoicingNote
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

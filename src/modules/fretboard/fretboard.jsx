import { STRING_INDEXES, STRING_NOTES } from '../../data'
import { useFretboard } from './context/FretboardContext'

const STRING_ORDER = ['e', 'b', 'g', 'D', 'A', 'E']

function getChordNoteLabel(note, root, third, fifth, extensions) {
	if (note === root) return 'root'
	if (note === third) return 'third'
	if (note === fifth) return 'fifth'
	for (const [extKey, extNote] of Object.entries(extensions)) {
		if (note === extNote) return extKey
	}
	return null
}

export function Fretboard() {
	const {
		showTriad,
		showThird,
		showFifth,
		normalizedScale,
		showScaleTonic,
		currentTriadDegrees,
		getPositionIndexes,
		getChordVoicingIndexes,
		activeTriadIndex,
		activeInversion,
		currentExtensions,
		activePositions,
		NOTE_CSS_VARS,
	} = useFretboard()

	const positionIndexes = getPositionIndexes()
	const chordVoicingIndexes =
		showTriad && activePositions.length > 0
			? getChordVoicingIndexes(activeTriadIndex, activeInversion)
			: new Set()
	const { root, third, fifth } = currentTriadDegrees
	const hasActivePositions = activePositions.length > 0
	const hasChordVoicing = chordVoicingIndexes.size > 0

	return (
		<div className='fretboard-container'>
			<div className='fretboardDinamic'>
				{STRING_ORDER.map((stringName) => (
					<div key={stringName} id={stringName} className='string-container'>
						<div className='visual-string'></div>
						{STRING_NOTES[stringName].map((note, fret) => {
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
							const inTriad =
								isRoot || isThird || isFifth || chordLabel !== null

							const usingChordVoicing = hasChordVoicing && showTriad
							const isVoicingNote = usingChordVoicing && inChordVoicing
							const showInThisPosition =
								!hasActivePositions || (hasActivePositions && inPosition)
							const showChordNote =
								(showTriad &&
									(isRoot || isThird || isFifth || isExtension) &&
									showInThisPosition) ||
								isVoicingNote

							const classes = ['fret']
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
									<span></span>
								</div>
							)
						})}
					</div>
				))}
			</div>
		</div>
	)
}

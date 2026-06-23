const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

const NOTE_IDX = Object.fromEntries(NOTES.map((n, i) => [n, i]))
NOTE_IDX['Db'] = 1
NOTE_IDX['Eb'] = 3
NOTE_IDX['Gb'] = 6
NOTE_IDX['Ab'] = 8

const ENHARMONIC_FLAT = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab' }

function parseRoot(chord) {
	const m = chord.match(/^[A-G][#b]?/)
	return m ? m[0] : null
}

function parseSuffix(chord) {
	return chord.replace(/^[A-G][#b]?/, '')
}

export function transposeChord(chord, semitones) {
	if (semitones === 0) return chord
	const root = parseRoot(chord)
	if (!root) return chord
	const suffix = parseSuffix(chord)
	const idx = NOTE_IDX[root]
	if (idx == null) return chord
	const newIdx = (idx + semitones + 12) % 12
	const newRoot = NOTES[newIdx]
	return newRoot + suffix
}

export function transposeKey(key, semitones) {
	if (semitones === 0) return key
	const isMinor = key.endsWith('m')
	const root = isMinor ? key.slice(0, -1) : key
	const idx = NOTE_IDX[root]
	if (idx == null) return key
	const newIdx = (idx + semitones + 12) % 12
	const newRoot = NOTES[newIdx]
	return newRoot + (isMinor ? 'm' : '')
}

export function semitonesBetween(fromKey, toKey) {
	const fromMinor = fromKey.endsWith('m')
	const toMinor = toKey.endsWith('m')
	const fromRoot = fromMinor ? fromKey.slice(0, -1) : fromKey
	const toRoot = toMinor ? toKey.slice(0, -1) : toKey
	const fromIdx = NOTE_IDX[fromRoot]
	const toIdx = NOTE_IDX[toRoot]
	if (fromIdx == null || toIdx == null) return 0
	return (toIdx - fromIdx + 12) % 12
}

export { NOTES, ENHARMONIC_FLAT }

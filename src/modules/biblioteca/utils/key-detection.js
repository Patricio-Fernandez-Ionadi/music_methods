const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

const NOTE_IDX = Object.fromEntries(NOTES.map((n, i) => [n, i]))
NOTE_IDX['Db'] = 1
NOTE_IDX['Eb'] = 3
NOTE_IDX['Gb'] = 6
NOTE_IDX['Ab'] = 8

function parseRoot(chord) {
	const m = chord.match(/^[A-G][#b]?/)
	return m ? m[0] : null
}

function chordRootIndex(chord) {
	const root = parseRoot(chord)
	return root ? NOTE_IDX[root] : null
}

const MAJOR_DIATONIC = [
	[0, 'M'], [2, 'm'], [4, 'm'], [5, 'M'],
	[7, 'M'], [9, 'm'], [11, 'dim'],
]

const MINOR_HARMONIC = [
	[0, 'm'], [2, 'dim'], [3, 'aug'], [5, 'm'],
	[7, 'M'], [8, 'M'], [11, 'dim'],
]

function chordQuality(chord) {
	if (chord.includes('dim')) return 'dim'
	if (chord.includes('aug')) return 'aug'
	if (chord.includes('m')) return 'm'
	if (chord.includes('7')) return 'M'
	return 'M'
}

function scoreKey(rootIdx, isMinor, chords) {
	const scale = isMinor ? MINOR_HARMONIC : MAJOR_DIATONIC
	let score = 0
	for (const chord of chords) {
		const cRoot = chordRootIndex(chord)
		if (cRoot == null) continue
		const cQuality = chordQuality(chord)
		for (const [interval, expectedQuality] of scale) {
			const scaleNote = (rootIdx + interval) % 12
			if (scaleNote === cRoot) {
				if (cQuality === expectedQuality) {
					score += 3
				} else if (cQuality === '7' && expectedQuality === 'M') {
					score += 2
				}
			}
		}
	}
	return score
}

function extractChordsFromLyrics(lyrics) {
	const chords = []
	if (!lyrics) return chords
	const joined = typeof lyrics === 'string' ? lyrics : JSON.stringify(lyrics)
	const matches = joined.matchAll(/\[([^\]]+)\]/g)
	for (const m of matches) {
		const name = m[1].trim()
		if (parseRoot(name)) chords.push(name)
	}
	return chords
}

export function detectKey(song) {
	const chords = extractChordsFromLyrics(song.lyrics || song.lyricText || '')
	if (chords.length === 0) return 'C'

	let bestKey = 'C'
	let bestScore = -1

	for (const root of NOTES) {
		const rootIdx = NOTE_IDX[root]
		const majorScore = scoreKey(rootIdx, false, chords)
		if (majorScore > bestScore) {
			bestScore = majorScore
			bestKey = root
		}
		const minorKey = root + 'm'
		const minorScore = scoreKey(rootIdx, true, chords)
		if (minorScore > bestScore) {
			bestScore = minorScore
			bestKey = minorKey
		}
	}

	return bestKey
}

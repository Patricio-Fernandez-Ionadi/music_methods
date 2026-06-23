/**
 * @typedef {Object} Segment
 * @property {string} chord  - Acorde que va sobre este fragmento (vacío si no tiene)
 * @property {string} text   - Texto de la letra para este fragmento
 *
 * @typedef {Object} LyricLine
 * @property {Segment[]} segments - Fragmentos que componen un verso
 *
 * @typedef {Object} SongLyrics
 * @property {LyricLine[]} lyrics - Versos de la canción
 */

export function lyricsToString(lyrics) {
	if (!lyrics || lyrics.length === 0) return ''
	return lyrics
		.map(line =>
			line.segments
				.map(seg => (seg.chord ? `[${seg.chord}]${seg.text}` : seg.text))
				.join(''),
		)
		.join('\n')
}

export function stringToLyrics(str) {
	if (!str.trim()) return []
	return str.split('\n').map(line => {
		if (!line.trim()) return { segments: [{ chord: '', text: '' }] }
		const segments = []
		const parts = line.split(/(\[[^\]]+\])/)
		let i = 0

		while (i < parts.length) {
			const part = parts[i]
			if (part === '') { i++; continue }

			if (/^\[[^\]]+\]$/.test(part)) {
				const chord = part.slice(1, -1)
				i++
				const next = i < parts.length ? parts[i] : ''

				const prevSeg = segments.length > 0 ? segments[segments.length - 1] : null
				const noSpaceBefore = prevSeg && prevSeg.text.length > 0
					&& !prevSeg.text.endsWith(' ') && !prevSeg.chord

				if (noSpaceBefore) {
					const text = prevSeg.text
					const lastSpace = text.lastIndexOf(' ')
					if (lastSpace > -1) {
						const before = text.slice(0, lastSpace + 1)
						const word = text.slice(lastSpace + 1)
						prevSeg.text = before
						segments.push({ chord, text: word })
					} else {
						prevSeg.chord = chord
					}
					if (next) {
						segments.push({ chord: '', text: next })
						i++
					}
				} else {
					const text = next || ''
					segments.push({ chord, text })
					if (next) i++
				}
			} else {
				segments.push({ chord: '', text: part })
				i++
			}
		}

		if (segments.length === 0) {
			segments.push({ chord: '', text: line })
		}

		return { segments }
	})
}

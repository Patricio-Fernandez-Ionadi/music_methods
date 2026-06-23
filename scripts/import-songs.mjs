import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs'
import { join, resolve } from 'path'
import { stringToLyrics } from '../src/modules/biblioteca/utils/lyrics.js'
import { detectKey } from '../src/modules/biblioteca/utils/key-detection.js'

const SONGS_DIR = resolve('src/data/songs')
const OUT_FILE = resolve('src/data/songs-generated.js')

const TAB_STRINGS = new Set(['e', 'B', 'G', 'D', 'A', 'E'])

/* ── File name parsing ───────────────────────────────────── */

function parseFilename(name) {
	const base = name.replace(/\.txt$/i, '')
	const idx = base.indexOf('-')
	if (idx === -1) {
		return { artist: '', title: base.replace(/_/g, ' ') }
	}
	const artist = base.slice(0, idx).replace(/_/g, ' ')
	const title = base.slice(idx + 1).replace(/_/g, ' ')
	return { artist, title }
}

/* ── Line classification ─────────────────────────────────── */

function isChordLine(line) {
	if (!line.trim() || /^[eBGD AE]\|/.test(line.trim())) return false
	const words = line.trim().split(/\s+/)
	return words.length >= 1 && words.every(w => /^[A-G][#b]?(?:m|dim|maj7|m7|maj|aug|sus[24]|7|add\d)?$/.test(w))
}

function isTabLine(line) {
	return /^[eBGD AE]\|/.test(line.trim())
}

function isTabHeader(line) {
	return /^==\s+\*+/.test(line.trim())
}

function getTabRef(line) {
	const m = line.trim().match(/^==\s+(\*{1,2}\d+)/)
	return m ? m[1] : null
}

function isLabelLine(line) {
	return /^label:/i.test(line.trim())
}

function isSection(line) {
	return /^(VERSO|ESTRIBILLO|PUENTE|INTRO|SOLO|OUTRO|CODA|PRÉ-ESTRIBILLO|PRE-ESTRIBILLO|PUENTE_VOCAL|FINAL)/i.test(line.trim())
}

/* ── Chord-above-text merger ─────────────────────────────── */

function mergeChordsIntoLyric(chordLine, lyricLine) {
	const chords = chordLine.trim().split(/\s+/)
	const words = lyricLine.split(/(\s+)/)
	let chordIdx = 0
	let result = ''
	for (const word of words) {
		if (word.trim() === '' || chordIdx >= chords.length) {
			result += word
			continue
		}
		result += `[${chords[chordIdx]}]${word}`
		chordIdx++
	}
	return result
}

/* ── Tab block grouping ──────────────────────────────────── */

function groupTabs(lines) {
	const tabs = []
	let current = null
	let currentRef = null
	let tabLines = []
	let pendingLabel = false

	function flush() {
		if (tabLines.length === 0) return
		const minLen = Math.min(...tabLines.map(l => l.length))
		const trimmed = tabLines.map(l => l.slice(0, minLen).replace(/\s+$/, '')).join('\n')
		tabs.push({
			label: current || `Tab ${tabs.length + 1}`,
			content: trimmed,
			ref: currentRef,
		})
		tabLines = []
		current = null
		currentRef = null
	}

	for (const line of lines) {
		if (isTabHeader(line)) {
			flush()
			currentRef = getTabRef(line)
			pendingLabel = true
			continue
		}
		if (pendingLabel && /^label:/i.test(line.trim())) {
			current = line.trim().replace(/^label:\s*/i, '')
			pendingLabel = false
			continue
		}
		if (pendingLabel && !/^\s*$/.test(line)) {
			current = line.trim()
			pendingLabel = false
		}
		if (isTabLine(line)) {
			tabLines.push(line)
		} else {
			flush()
		}
	}
	flush()
	return tabs
}

/* ── Main parser ─────────────────────────────────────────── */

function parseSongFile(filePath) {
	const raw = readFileSync(filePath, 'utf-8')
	const lines = raw.split(/\r?\n/)
	const fileName = filePath.split(/[/\\]/).pop()

	let headerKey = null
	let bodyLines = []
	let parsingHeader = true

	const headerOverrides = {}

	for (const line of lines) {
		if (parsingHeader && /^[A-Z]+:/.test(line.trim())) {
			const m = line.trim().match(/^(\w+):\s*(.*)/)
			if (m) {
				const key = m[1].toUpperCase()
				const val = m[2].trim()
				if (key === 'KEY') { headerKey = val; continue }
				if (key === 'TITLE') { headerOverrides.title = val; continue }
				if (key === 'ARTIST') { headerOverrides.artist = val; continue }
				if (key === 'CAPO') { headerOverrides.capo = parseInt(val, 10); continue }
				/* unknown header — don't consume, fall through to bodyLines */
			}
		}
		if (line.trim().startsWith('==') || isTabLine(line) || isSection(line) || line.trim()) {
			parsingHeader = false
		}
		bodyLines.push(line)
	}

	const { artist, title } = { ...parseFilename(fileName), ...headerOverrides }
	if (!artist && !title) return null

	/* Phase 1: process lines — detect format, convert, merge */
	let processedLines = []
	let pendingChordLine = null

	for (const line of bodyLines) {
		const trimmed = line.trim()

		if (isTabHeader(trimmed) || isTabLine(line)) {
			processedLines.push(line)
			continue
		}

		if (/^label:/i.test(trimmed)) {
			processedLines.push(line)
			continue
		}

		if (isSection(trimmed)) {
			processedLines.push(line)
			continue
		}

		if (trimmed === '' || trimmed === '-' || trimmed === '...') {
			processedLines.push('')
			continue
		}

		/* Chord-above-text detection */
		if (isChordLine(trimmed)) {
			pendingChordLine = trimmed
			continue
		}
		if (pendingChordLine) {
			processedLines.push(mergeChordsIntoLyric(pendingChordLine, line))
			pendingChordLine = null
			continue
		}

		/* Lines with chords — push as-is (stringToLyrics handles both [Chord]text and text[Chord]) */
		if (/\[[^\]]+\]/.test(line)) {
			processedLines.push(line)
			continue
		}

		processedLines.push(line)
	}

	/* Phase 2: extract tabs from body (preserve blank lines as delimiters) */
	const tabs = groupTabs(processedLines)

	/* Phase 3: extract lyric text (everything except tab lines/headers/labels) */
	const lyricText = processedLines
		.filter(l => !isTabLine(l) && !isTabHeader(l) && !isLabelLine(l))
		.join('\n')

	/* Phase 4: detect key */
	const key = headerKey || detectKey({ lyricText }) || 'C'

	/* Phase 5: parse into segments */
	const lyrics = stringToLyrics(lyricText)

	/* Phase 6: detect *1, **1 references in text and build tab refs */
	const withRefs = attachTabRefs(lyricText, tabs)

	return {
		name: title,
		artist,
		key,
		lyrics: withRefs.lyrics,
		tabs: withRefs.tabs,
		lyricText,
	}
}

/* ── Tab reference attachment ────────────────────────────── */

function attachTabRefs(lyricText, tabs) {
	if (tabs.length === 0) return { lyrics: stringToLyrics(lyricText), tabs }

	// Check if tabs have labels — if not, check for *1, **1 in text
	const refs = [...lyricText.matchAll(/(\*{1,2}\d+)/g)]
	const usedRefs = new Set()

	for (const ref of refs) {
		const refName = ref[1]
		if (usedRefs.has(refName)) continue
		usedRefs.add(refName)
	}

	// If no refs found in text but we have tabs, create anonymous refs
	if (usedRefs.size === 0) {
		return { lyrics: stringToLyrics(lyricText), tabs }
	}

	// If tabs already have labels from == headers, keep them
	return { lyrics: stringToLyrics(lyricText), tabs }
}

/* ── File generation ─────────────────────────────────────── */

function generate() {
	if (!existsSync(SONGS_DIR)) {
		console.log(`→ No existe ${SONGS_DIR}, creando...`)
		return
	}

	const files = readdirSync(SONGS_DIR)
		.filter(f => f.endsWith('.txt'))
		.sort()

	if (files.length === 0) {
		console.log('→ No hay archivos .txt en src/data/songs/')
		return
	}

	const songs = []

	for (const file of files) {
		const filePath = join(SONGS_DIR, file)
		try {
			const song = parseSongFile(filePath)
			if (song) {
				songs.push(song)
				console.log(`  ✓ ${file} → ${song.key} (${song.lyrics.length} líneas, ${song.tabs.length} tabs)`)
			} else {
				console.log(`  ✗ ${file} → no se pudo parsear`)
			}
		} catch (err) {
			console.log(`  ✗ ${file} → error: ${err.message}`)
		}
	}

	if (songs.length === 0) {
		console.log('→ No se generaron canciones.')
		return
	}

	// Assign IDs
	let nextId = 1
	for (const song of songs) {
		song.id = nextId++
	}

	const code = `// Archivo generado por scripts/import-songs.mjs — NO EDITAR MANUALMENTE
export const IMPORTED_SONGS = ${JSON.stringify(songs, null, 2)}
`

	writeFileSync(OUT_FILE, code, 'utf-8')
	console.log(`\n→ Generado ${OUT_FILE} (${songs.length} canciones)`)
}

generate()

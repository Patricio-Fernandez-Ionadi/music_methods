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

/**
 * Convierte el array de versos con acordes a string plano.
 * Formato de salida: `[Acorde]texto [Otro]más texto` (una línea por verso).
 *
 * @param {LyricLine[]} lyrics - Letra formateada como objetos con segmentos
 * @returns {string} Texto plano listo para editar en un textarea
 *
 * @example
 * lyricsToString([
 *   { segments: [{ chord: 'Am', text: 'Hello ' }, { chord: 'C', text: 'world' }] }
 * ])
 * // => "[Am]Hello [C]world"
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

/**
 * Parsea un string con formato `[Acorde]texto [Otro]más texto`
 * al array de objetos que usa internamente la app.
 *
 * @param {string} str - Texto ingresado por el usuario
 * @returns {LyricLine[]} Letra formateada como segmentos
 *
 * @example
 * stringToLyrics("[Am]Hello [C]world")
 * // => [{ segments: [{ chord: 'Am', text: 'Hello ' }, { chord: 'C', text: 'world' }] }]
 */
export function stringToLyrics(str) {
  if (!str.trim()) return []
  return str.split('\n').filter(Boolean).map(line => {
    const segments = []
    const regex = /\[([^\]]+)\]([^[]*)/g
    let lastIndex = 0
    let match

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ chord: '', text: line.slice(lastIndex, match.index) })
      }
      segments.push({ chord: match[1], text: match[2] || '' })
      lastIndex = regex.lastIndex
    }

    if (lastIndex < line.length) {
      segments.push({ chord: '', text: line.slice(lastIndex) })
    }

    if (segments.length === 0) {
      segments.push({ chord: '', text: line })
    }

    return { segments }
  })
}

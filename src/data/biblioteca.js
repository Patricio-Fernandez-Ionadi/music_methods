import { IMPORTED_SONGS } from './songs-generated.js'

const BUILTIN_SONGS = []

// Assign unique IDs after the builtin songs
let songId = BUILTIN_SONGS.length
for (const song of IMPORTED_SONGS) {
	song.id = ++songId
}

export const INITIAL_SONGS = [...BUILTIN_SONGS, ...IMPORTED_SONGS]

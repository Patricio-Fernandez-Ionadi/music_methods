import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../../app/context/app-context'

import { BackButton } from '../../app/components/button/back-button'
import { SongHeader } from '../../modules/biblioteca/song/details/song-header'
import { SongTablatures } from '../../modules/biblioteca/song/details/song-tablatures'
import { SongLyrics } from '../../modules/biblioteca/song/details/song-lyrics'
import { ChordDiagramPanel } from '../../modules/biblioteca/song/details/chord-diagram-panel'
import { semitonesBetween } from '../../modules/biblioteca/utils/transpose'

export const SongDetail = () => {
	const { songId } = useParams()
	const { songs } = useApp()
	const song = songs.find((s) => s.id === Number(songId))
	const [displayKey, setDisplayKey] = useState(song?.key || '')
	const [selectedChord, setSelectedChord] = useState(null)

	if (!song) {
		return (
			<div className='song-detail'>
				<h2>Canción no encontrada</h2>
				<BackButton route={'biblioteca'} />
			</div>
		)
	}

	const transposeOffset = semitonesBetween(song.key, displayKey)

	return (
		<>
			<BackButton route={'biblioteca'} />
			<SongHeader
				song={song}
				displayKey={displayKey}
				onKeyChange={setDisplayKey}
			/>
			<SongLyrics song={song} transposeOffset={transposeOffset} onChordClick={setSelectedChord} />
			<SongTablatures song={song} />
			<ChordDiagramPanel chord={selectedChord} onClose={() => setSelectedChord(null)} />
		</>
	)
}

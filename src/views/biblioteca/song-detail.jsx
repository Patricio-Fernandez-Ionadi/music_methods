import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../app/context/app-context'

import { BackButton } from '../../app/components/button/back-button'
import { SongHeader } from '../../modules/biblioteca/song/details/song-header'
import { SongTablatures } from '../../modules/biblioteca/song/details/song-tablatures'
import { SongLyrics } from '../../modules/biblioteca/song/details/song-lyrics'

export const SongDetail = () => {
	const { songId } = useParams()
	const { songs } = useApp()
	const song = songs.find((s) => s.id === Number(songId))

	if (!song) {
		return (
			<div className='song-detail'>
				<h2>Canción no encontrada</h2>
				<BackButton route={'biblioteca'} />
			</div>
		)
	}

	return (
		<>
			<BackButton route={'biblioteca'} />
			<SongHeader song={song} />
			<SongTablatures song={song} />
			<SongLyrics song={song} />
		</>
	)
}

import { SongListItem } from './song-list-item'

export const SongList = ({ songs, onSongClick }) => (
	<ul className='song-list'>
		{songs.map((song) => (
			<SongListItem
				key={song.id}
				song={song}
				onClick={() => onSongClick(song.id)}
			/>
		))}
		{songs.length === 0 && <li className='empty'>Sin resultados</li>}
	</ul>
)

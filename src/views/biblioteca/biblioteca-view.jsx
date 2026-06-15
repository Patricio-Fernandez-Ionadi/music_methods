import { useNavigate } from 'react-router-dom'
import { useSongFilters } from '../../modules/biblioteca/hooks/use-song-filters'
import { useApp } from '../../app/context/app-context'
import { SongListHeader } from '../../modules/biblioteca/library/song-list-header'
import { SongFilters } from '../../modules/biblioteca/library/song-filters'
import { SongList } from '../../modules/biblioteca/library/song-list'

export const BibliotecaView = () => {
	const navigate = useNavigate()
	const { songs } = useApp()
	const { filters, setFilter, filtered } = useSongFilters(songs)

	return (
		<>
			<SongListHeader onNewSong={() => navigate('/biblioteca/nueva')} />
			<SongFilters filters={filters} setFilter={setFilter} />
			<SongList
				songs={filtered}
				onSongClick={(id) => navigate(`/biblioteca/${id}`)}
			/>
		</>
	)
}

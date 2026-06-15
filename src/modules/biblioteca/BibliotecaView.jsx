import { useNavigate } from 'react-router-dom'
import { useSongFilters } from './hooks/useSongFilters'
import { useApp } from '../../app/context/app-context'
import './style/_biblioteca.scss'

/** Vista principal de la biblioteca: filtros + listado de canciones. */
export const BibliotecaView = () => {
	const navigate = useNavigate()
	const { songs } = useApp()
	const { filters, setFilter, filtered } = useSongFilters(songs)

	return (
		<div className='biblioteca-view'>
			<div className='biblioteca-header'>
				<h2>Biblioteca de Canciones</h2>
				<button
					className='btn-add'
					onClick={() => navigate('/biblioteca/nueva')}
				>
					+ Nueva canción
				</button>
			</div>

			<div className='filters'>
				<input
					name='name'
					placeholder='Filtrar por nombre...'
					value={filters.name}
					onChange={(e) => setFilter(e.target.name, e.target.value)}
					className='filter-input'
				/>
				<input
					name='artist'
					placeholder='Filtrar por artista...'
					value={filters.artist}
					onChange={(e) => setFilter(e.target.name, e.target.value)}
					className='filter-input'
				/>
				<input
					name='key'
					placeholder='Filtrar por tonalidad...'
					value={filters.key}
					onChange={(e) => setFilter(e.target.name, e.target.value)}
					className='filter-input'
				/>
			</div>

			<ul className='song-list'>
				{filtered.map((song) => (
					<li key={song.id} className='song-item'>
						<div
							className='song-info'
							role='button'
							tabIndex={0}
							onClick={() => navigate(`/biblioteca/${song.id}`)}
							onKeyDown={(e) =>
								e.key === 'Enter' && navigate(`/biblioteca/${song.id}`)
							}
						>
							<strong>{song.name}</strong>
							{song.artist && <span> — {song.artist}</span>}
							<span className='song-key'>{song.key}</span>
						</div>
					</li>
				))}
				{filtered.length === 0 && <li className='empty'>Sin resultados</li>}
			</ul>
		</div>
	)
}

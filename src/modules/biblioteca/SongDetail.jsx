import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../app/context/app-context'
import './style/_song-detail.scss'

/**
 * Vista detalle de una canción.
 * Muestra nombre, artista, tonalidad, letra con acordes y tablaturas.
 * Las acciones editar/eliminar están en un menú ⋮ colapsable.
 */
export const SongDetail = () => {
	const { songId } = useParams()
	const navigate = useNavigate()
	const { songs, setSongs, setEditingSong } = useApp()
	const song = songs.find((s) => s.id === Number(songId))
	const [menuOpen, setMenuOpen] = useState(false)
	const menuRef = useRef(null)

	/** Cierra el menú al hacer click fuera. */
	useEffect(() => {
		const handleClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMenuOpen(false)
			}
		}
		if (menuOpen) {
			document.addEventListener('mousedown', handleClick)
		}
		return () => document.removeEventListener('mousedown', handleClick)
	}, [menuOpen])

	if (!song) {
		return (
			<div className='song-detail'>
				<h2>Canción no encontrada</h2>
				<button onClick={() => navigate('/biblioteca')}>Volver</button>
			</div>
		)
	}

	const handleDelete = () => {
		setSongs((prev) => prev.filter((s) => s.id !== song.id))
		navigate('/biblioteca')
	}

	const handleEdit = () => {
		setEditingSong(song)
		navigate('/biblioteca/nueva')
	}

	return (
		<div className='song-detail'>
			<button className='back-btn' onClick={() => navigate('/biblioteca')}>
				← Volver
			</button>

			<div className='song-detail-header'>
				<h2>{song.name}</h2>
				{song.artist && <p className='song-detail-artist'>{song.artist}</p>}
				<span className='song-key'>{song.key}</span>

				<div className='menu-wrapper' ref={menuRef}>
					<button
						className='menu-trigger'
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label='Opciones'
					>
						⋮
					</button>
					{menuOpen && (
						<div className='menu-dropdown'>
							<button onClick={handleEdit}>Editar</button>
							<button onClick={handleDelete} className='menu-delete'>
								Eliminar
							</button>
						</div>
					)}
				</div>
			</div>

			{song.lyrics && song.lyrics.length > 0 && (
				<section className='lyrics-section'>
					<h3>Letra</h3>
					<div className='lyrics'>
						{song.lyrics.map((line, i) => (
							<div key={i} className='lyric-line'>
								{line.segments.map((seg, j) => (
									<span key={j} className='seg'>
										{seg.chord && (
											<span className='seg-chord'>{seg.chord}</span>
										)}
										<span className='seg-text'>{seg.text}</span>
									</span>
								))}
							</div>
						))}
					</div>
				</section>
			)}

			{song.tabs && song.tabs.length > 0 && (
				<section className='tabs-section'>
					<h3>Tablaturas</h3>
					{song.tabs.map((tab, i) => (
						<div key={i} className='tab-block'>
							<h4>{tab.label}</h4>
							<pre className='tab-content'>{tab.content}</pre>
						</div>
					))}
				</section>
			)}
		</div>
	)
}

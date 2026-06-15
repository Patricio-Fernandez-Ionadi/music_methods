import React from 'react'
import { useApp } from '../../../../app/context/app-context'
import { useNavigate } from 'react-router-dom'

export const SongHeader = ({ song }) => {
	const navigate = useNavigate()
	const { setSongs, setEditingSong } = useApp()
	const [menuOpen, setMenuOpen] = React.useState(false)
	const menuRef = React.useRef(null)

	React.useEffect(() => {
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

	const handleDelete = () => {
		setSongs((prev) => prev.filter((s) => s.id !== song.id))
		navigate('/biblioteca')
	}

	const handleEdit = () => {
		setEditingSong(song)
		navigate('/biblioteca/nueva')
	}

	return (
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
	)
}

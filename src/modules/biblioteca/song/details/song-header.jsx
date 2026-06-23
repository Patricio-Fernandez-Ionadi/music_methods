import React from 'react'
import { useApp } from '../../../../app/context/app-context'
import { useNavigate } from 'react-router-dom'
const KEY_OPTIONS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

export const SongHeader = ({ song, displayKey, onKeyChange }) => {
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

	const isMinor = song.key.endsWith('m')
	const options = isMinor
		? KEY_OPTIONS.map(k => k + 'm')
		: KEY_OPTIONS

	const displayIsMinor = displayKey.endsWith('m')
	const isTransposed = displayKey !== song.key

	return (
		<div className='song-detail-header'>
			<h2>{song.name}</h2>
			{song.artist && <p className='song-detail-artist'>{song.artist}</p>}
			<div className='song-key-row'>
				<span className={`song-key${isTransposed ? ' transposed' : ''}`}>
					{song.key}
				</span>
				{isTransposed && <span className='song-key-arrow'>→</span>}
				<select
					className='song-key-select'
					value={displayKey}
					onChange={(e) => onKeyChange(e.target.value)}
				>
					{displayIsMinor
						? options.map(k => <option key={k} value={k}>{k}</option>)
						: options.map(k => <option key={k} value={k}>{k}</option>)
					}
				</select>
			</div>

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

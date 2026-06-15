export const SongListItem = ({ song, onClick }) => (
	<li className='song-item'>
		<div
			className='song-info'
			role='button'
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(e) => e.key === 'Enter' && onClick()}
		>
			<strong>{song.name}</strong>
			{song.artist && <span> — {song.artist}</span>}
			<span className='song-key'>{song.key}</span>
		</div>
	</li>
)

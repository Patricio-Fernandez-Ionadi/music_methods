export const SongListHeader = ({ onNewSong }) => (
	<div className='biblioteca-header'>
		<h2>Biblioteca de Canciones</h2>
		<button className='btn-add' onClick={onNewSong}>
			+ Nueva canción
		</button>
	</div>
)

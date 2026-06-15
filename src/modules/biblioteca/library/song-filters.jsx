export const SongFilters = ({ filters, setFilter }) => (
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
)

export const SongTablatures = ({ song }) => {
	if (!song) return

	return (
		<>
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
		</>
	)
}

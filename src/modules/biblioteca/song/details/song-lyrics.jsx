export const SongLyrics = ({ song }) => {
	if (!song) return
	return (
		<>
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
		</>
	)
}

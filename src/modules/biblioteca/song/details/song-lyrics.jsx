import { transposeChord } from '../../utils/transpose'

export const SongLyrics = ({ song, transposeOffset = 0, onChordClick }) => {
	if (!song) return
	return (
		<>
			{song.lyrics && song.lyrics.length > 0 && (
				<section className='lyrics-section'>
					<h3>Letra</h3>
					<div className='lyrics'>
						{song.lyrics.map((line, i) => (
							<div key={i} className='lyric-line'>
							{line.segments.length === 1 && !line.segments[0].chord && !line.segments[0].text ? (
								''
							) : (
								line.segments.map((seg, j) =>
									seg.chord ? (
										<span key={j} className='seg has-chord'>
											<span
												className='seg-chord'
												onClick={() => onChordClick?.(transposeChord(seg.chord, transposeOffset))}
											>
												{transposeChord(seg.chord, transposeOffset)}
											</span>
											<span className='seg-text'>{seg.text}</span>
										</span>
									) : (
										<span key={j} className='seg'>{seg.text}</span>
									),
								)
							)}
							</div>
						))}
					</div>
				</section>
			)}
		</>
	)
}

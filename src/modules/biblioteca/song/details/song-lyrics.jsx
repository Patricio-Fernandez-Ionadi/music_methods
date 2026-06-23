import { transposeChord } from '../../utils/transpose'

function renderTextWithRefs(text, tabs) {
	const parts = text.split(/(\*{1,2}\d+)/)
	return parts.map((part, i) => {
		const refMatch = part.match(/^(\*{1,2}\d+)$/)
		if (!refMatch) return part
		const tab = tabs?.find(t => t.ref === refMatch[1])
		if (!tab) return part
		return (
			<div key={i} className='tab-block-inline'>
				<h4 className='tab-inline-label'>{tab.label}</h4>
				<pre className='tab-content-inline'>{tab.content}</pre>
			</div>
		)
	})
}

export const SongLyrics = ({ song, transposeOffset = 0, onChordClick }) => {
	if (!song) return
	const tabs = song.tabs
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
										<span key={j} className='seg'>{renderTextWithRefs(seg.text, tabs)}</span>
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
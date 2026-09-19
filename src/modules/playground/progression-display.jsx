import { buildChordLabel, chordToRoman } from './utils/chord-utils'

export function ProgressionDisplay({
	chords,
	selectedIndex,
	keyAnalysis,
	onSelect,
}) {
	const { tonic, mode } = keyAnalysis
	const isMinorKey = mode === 'Menor'

	return (
		<div className='progression-display'>
			{chords.map((chord, i) => {
				const label = buildChordLabel(chord.root, chord.type)
				const roman = chordToRoman(chord, tonic, isMinorKey)
				const isActive = selectedIndex === i
				return (
					<button
						key={i}
						className={`progression-chord${isActive ? ' active' : ''}`}
						onClick={() => onSelect(i)}
					>
						<span className='progression-chord-roman'>{roman}</span>
						<span className='progression-chord-name'>{label}</span>
					</button>
				)
			})}
		</div>
	)
}

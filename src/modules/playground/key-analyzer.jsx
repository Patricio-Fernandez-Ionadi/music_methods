import { buildChordLabel } from './utils/chord-utils'

export function KeyAnalyzer({ keyAnalysis, chords }) {
	const { tonic, mode, score } = keyAnalysis
	const totalPossible = chords.length * 3
	const fitPercent = totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0

	return (
		<div className='key-analyzer'>
			<h3>Tonalidad detectada</h3>
			<div className='key-analyzer-result'>
				<span className='key-analyzer-key'>{tonic}</span>
				<span className='key-analyzer-mode'>{mode}</span>
			</div>
			<div className='key-analyzer-fit'>
				<span>Ajuste: {fitPercent}%</span>
				<div className='key-analyzer-bar'>
					<div
						className='key-analyzer-bar-fill'
						style={{ width: `${Math.min(fitPercent, 100)}%` }}
					/>
				</div>
			</div>
			{chords.length > 0 && (
				<div className='key-analyzer-chords'>
					{chords.map((chord, i) => (
						<span key={i} className='key-analyzer-chord-item'>
							{buildChordLabel(chord.root, chord.type)}
						</span>
					))}
				</div>
			)}
		</div>
	)
}

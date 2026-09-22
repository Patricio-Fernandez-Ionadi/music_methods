import { CHROMATIC as NOTES } from '../../shared/utils/scale-utils'
import { buildChordLabel } from './utils/chord-utils'

export function KeyAnalyzer({ keyAnalysis, chords, transposeMode, transposeTo, toggleTransposeMode }) {
	const { best, variants } = keyAnalysis
	const { tonic, modeName, fitPercent } = best

	return (
		<div className='key-analyzer'>
			<h3>Tonalidad detectada</h3>
			<div className='key-analyzer-result'>
				<span className='key-analyzer-key'>{tonic}</span>
				<span className='key-analyzer-mode'>{modeName}</span>
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
			{variants.length > 1 && (
				<div className='key-analyzer-variants'>
					<h4>También encaja en</h4>
					<div className='key-analyzer-variant-list'>
						{variants.map((v, i) => (
							<span
								key={i}
								className={`key-analyzer-variant-chip${v.isBest ? ' best' : ''}`}
								title={`${v.fitPercent}% de ajuste`}
							>
								{v.tonic} {v.modeName}
								{v.fitPercent > 0 && (
									<span className='key-analyzer-variant-pct'>{v.fitPercent}%</span>
								)}
							</span>
						))}
					</div>
				</div>
			)}

			<div className='key-analyzer-transpose'>
				<h4>Cambiar tonalidad</h4>
				<div className='key-analyzer-transpose-controls'>
					<div className='key-analyzer-note-grid'>
						{NOTES.map((n) => (
							<button
								key={n}
								className={`key-analyzer-note-btn${n === tonic ? ' active' : ''}`}
								onClick={() => transposeTo(n)}
							>
								{n}
							</button>
						))}
					</div>
					<div className='key-analyzer-mode-toggle'>
						<button
							className={`key-analyzer-mode-btn${transposeMode === 'puro' ? ' active' : ''}`}
							onClick={() => transposeMode !== 'puro' && toggleTransposeMode()}
						>
							Puro
						</button>
						<button
							className={`key-analyzer-mode-btn${transposeMode === 'inteligente' ? ' active' : ''}`}
							onClick={() => transposeMode !== 'inteligente' && toggleTransposeMode()}
						>
							Inteligente
						</button>
					</div>
					<p className='key-analyzer-transpose-hint'>
						{transposeMode === 'puro'
							? 'Desplaza todos los acordes por el mismo intervalo. Preserva el patrón exacto, solo trasladado de tonalidad.'
							: 'Además de trasladar, ajusta los acordes fuera de escala al diatónico más cercano de la tonalidad destino.'}
					</p>
				</div>
			</div>
		</div>
	)
}

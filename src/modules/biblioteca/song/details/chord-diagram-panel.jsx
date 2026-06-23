const CHORD_TYPES = {
	M: 'Mayor (3ra mayor, 5ta justa)',
	m: 'Menor (3ra menor, 5ta justa)',
	7: 'Dominante 7ª (3ra mayor, 5ta justa, 7ma menor)',
	m7: 'Menor 7ª (3ra menor, 5ta justa, 7ma menor)',
	maj7: 'Mayor 7ª (3ra mayor, 5ta justa, 7ma mayor)',
	dim: 'Disminuido (3ra menor, 5ta bemol)',
	sus4: 'Suspendida 4ª (3ra aumentada, I IV V)',
	sus2: 'Suspendida 2ª (3ra menor bemol, I II V)',
}

function parseChord(name) {
	const match = name.match(/^([A-G][#b]?)(.*)$/)
	if (!match) return { root: name, type: '', label: name }
	const root = match[1]
	const suffix = match[2]
	const typeMap = {
		'm': 'm',
		'm7': 'm7',
		'7': '7',
		'maj7': 'maj7',
		'dim': 'dim',
		'sus4': 'sus4',
		'sus2': 'sus2',
		'': 'M',
	}
	const type = typeMap[suffix] || ''
	return { root, type, label: name }
}

export const ChordDiagramPanel = ({ chord, onClose }) => {
	if (!chord) return null

	const { root, type, label } = parseChord(chord)
	const description = CHORD_TYPES[type] || ''

	return (
		<aside className='chord-panel'>
			<div className='chord-panel-header'>
				<span className='chord-panel-title'>Acorde</span>
				<button className='chord-panel-close' onClick={onClose}>×</button>
			</div>
			<div className='chord-panel-body'>
				<div className='chord-panel-name'>{label}</div>
				{description && (
					<p className='chord-panel-desc'>{description}</p>
				)}
				<div className='chord-panel-info'>
					<span className='chord-panel-label'>Tónica:</span> {root}
					{type && <><br /><span className='chord-panel-label'>Tipo:</span> {type}</>}
				</div>
			</div>
		</aside>
	)
}

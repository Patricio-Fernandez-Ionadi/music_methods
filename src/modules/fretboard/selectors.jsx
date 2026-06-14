import { useFretboard } from './context/FretboardContext'

export const Selectors = () => {
	const {
		selectedTonic,
		setSelectedTonic,
		selectedMode,
		setSelectedMode,
		MODES,
		NOTES,
	} = useFretboard()
	return (
		<div className='selector-group'>
			<div className='selector-input'>
				<label htmlFor='modeSelector'>Modo:</label>
				<select
					id='modeSelector'
					value={selectedMode.id}
					onChange={(e) => setSelectedMode(MODES[e.target.value])}
				>
					{Object.values(MODES).map((m) => (
						<option key={m.id} value={m.id}>
							{m.name}
						</option>
					))}
				</select>
			</div>
			<div className='selector-input'>
				<label htmlFor='keySelector'>Tonalidad:</label>
				<select
					id='keySelector'
					value={selectedTonic}
					onChange={(e) => setSelectedTonic(e.target.value)}
				>
					{NOTES.map((n) => (
						<option key={n} value={n}>
							{n}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

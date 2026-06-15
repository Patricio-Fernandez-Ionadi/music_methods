import { useFretboard } from './context/fretboard-context'

export const Positions = () => {
	const { activePositions, togglePosition, toggleAllPositions } = useFretboard()
	const allActive = activePositions.length === 5
	return (
		<div className='controls field'>
			<h4>Mostrar posición</h4>
			<div className='position-toggle-group'>
				<button
					className={`position-btn all-btn${allActive ? ' active' : ''}`}
					onClick={() => toggleAllPositions(!allActive)}
				>
					Todas
				</button>
				{[1, 2, 3, 4, 5].map((pos) => (
					<button
						key={pos}
						className={`position-btn${activePositions.includes(pos) ? ' active' : ''}`}
						onClick={() => togglePosition(pos)}
					>
						Pos. {pos}
					</button>
				))}
			</div>
		</div>
	)
}

import { ENHARMONICS } from '../../data'

export function TriadButton({
	triad,
	name,
	isActive,
	activeChordName,
	NOTE_CSS_VARS,
	onClick,
}) {
	return (
		<button
			className={`triad-btn${isActive ? ' active' : ''}`}
			onClick={onClick}
		>
			<strong>{isActive ? activeChordName : name}</strong>
			<span>
				{triad.map((note, j) => (
					<span
						key={j}
						style={
							isActive
								? {
										color: `var(${NOTE_CSS_VARS[ENHARMONICS[note] || note]})`,
									}
								: {}
						}
					>
						{note}
						{j < triad.length - 1 ? ' - ' : ''}
					</span>
				))}
			</span>
		</button>
	)
}

import { useState, useEffect, useRef } from 'react'
import { CHROMATIC as NOTES } from '../../shared/utils/scale-utils'
import { CHORD_TYPES } from '../../shared/data/chord-dictionary'
import { chordToRoman } from './utils/chord-utils'

const TYPE_KEYS = Object.keys(CHORD_TYPES)
const TYPE_LABELS = {
	M: 'M', m: 'm', dim: '°', 7: '7', m7: 'm7', maj7: 'maj7', sus4: 'sus4', sus2: 'sus2',
}

export function ProgressionDisplay({
	chords,
	selectedIndex,
	keyAnalysis,
	onSelect,
	onSet,
	onRemove,
	onAdd,
}) {
	const { tonic, mode } = keyAnalysis
	const isMinorKey = mode === 'Menor'

	const [dropdown, setDropdown] = useState(null)
	const containerRef = useRef(null)

	useEffect(() => {
		if (!dropdown) return
		const handleClickOutside = (e) => {
			if (containerRef.current && !containerRef.current.contains(e.target)) {
				setDropdown(null)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [dropdown])

	const toggleRoot = (i) => {
		setDropdown((prev) =>
			prev?.chordIndex === i && prev.type === 'root' ? null : { chordIndex: i, type: 'root' }
		)
	}

	const toggleType = (i) => {
		setDropdown((prev) =>
			prev?.chordIndex === i && prev.type === 'chordType' ? null : { chordIndex: i, type: 'chordType' }
		)
	}

	const selectRoot = (i, root) => {
		onSet(i, { ...chords[i], root })
		setDropdown(null)
	}

	const selectType = (i, type) => {
		onSet(i, { ...chords[i], type })
		setDropdown(null)
	}

	const removeAndClose = (i) => {
		onRemove(i)
		setDropdown(null)
	}

	return (
		<div className='progression-display' ref={containerRef}>
			{chords.map((chord, i) => {
				const roman = chordToRoman(chord, tonic, isMinorKey)
				const isActive = selectedIndex === i
				const isDropdownOpen = dropdown?.chordIndex === i

				return (
					<div key={i} className='progression-chord-slot'>
						<div className={`progression-chord-remove-slot${isDropdownOpen ? ' visible' : ''}`}>
							<button
								className='progression-chord-remove'
								onClick={() => removeAndClose(i)}
							>
								x
							</button>
						</div>

						<div className='progression-chord-buttons'>
							<button
								className={`progression-chord-note${isActive ? ' active' : ''}`}
								onClick={() => toggleRoot(i)}
							>
								<span className='progression-chord-roman'>{roman}</span>
								{chord.root}
							</button>

							{isDropdownOpen && dropdown.type === 'root' && (
								<div className='progression-dropdown'>
									{NOTES.map((n) => (
										<button
											key={n}
											className={`progression-dropdown-item${chord.root === n ? ' selected' : ''}`}
											onClick={() => selectRoot(i, n)}
										>
											{n}
										</button>
									))}
								</div>
							)}

							<button
								className='progression-chord-type'
								onClick={() => toggleType(i)}
							>
								{TYPE_LABELS[chord.type] || chord.type}
							</button>

							{isDropdownOpen && dropdown.type === 'chordType' && (
								<div className='progression-dropdown'>
									{TYPE_KEYS.map((key) => (
										<button
											key={key}
											className={`progression-dropdown-item${chord.type === key ? ' selected' : ''}`}
											onClick={() => selectType(i, key)}
										>
											{TYPE_LABELS[key]}
										</button>
									))}
								</div>
							)}
						</div>
					</div>
				)
			})}

			<div className='progression-chord-slot'>
				<div className='progression-chord-remove-slot' />
				<div className='progression-chord-buttons'>
					<button
						className='progression-chord-add'
						onClick={() => onAdd({ root: 'C', type: 'M' })}
					>
						+
					</button>
				</div>
			</div>
		</div>
	)
}

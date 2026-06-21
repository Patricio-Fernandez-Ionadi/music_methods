import { useFretboard } from './context/fretboard-context'
import { useMemo } from 'react'
import { Field } from '../../app/components/field/field'
import { buildChordName } from './utils/chord-names'
import { TriadButton } from './triad-button'
import { getChordVoicings } from './data/chord-dictionary'

export const Triads = () => {
	const {
		rawTriads,
		showTriad,
		activeTriadIndex,
		selectTriad,
		deselectTriad,
		selectedMode,
		activeTriadVoicing,
		selectTriadVoicing,
		NOTE_CSS_VARS,
	} = useFretboard()

	const chordNames = useMemo(() => {
		if (!rawTriads?.length) return []
		return rawTriads.map((triad, i) =>
			buildChordName(triad[0], selectedMode.chords[i]),
		)
	}, [rawTriads, selectedMode])

	const activeChordName = useMemo(() => {
		if (activeTriadIndex == null || !rawTriads?.length) return ''
		const triad = rawTriads[activeTriadIndex]
		return buildChordName(triad[0], selectedMode.chords[activeTriadIndex])
	}, [rawTriads, activeTriadIndex, selectedMode])

	const triadVoicings = useMemo(() => {
		if (activeTriadIndex == null || !rawTriads?.length) return []
		const root = rawTriads[activeTriadIndex][0]
		const type = selectedMode.chords[activeTriadIndex]
		const chordTypeMap = { M: 'M', m: 'm', dim: 'dim' }
		return getChordVoicings(root, chordTypeMap[type] || 'M')
	}, [rawTriads, activeTriadIndex, selectedMode])

	return (
		<>
			<Field id='triad-viewer' label={'Tríadas'}>
				{rawTriads?.length > 0 && (
					<div className='triad-selector'>
						{(rawTriads ?? []).map((triad, i) => {
							const name = chordNames[i]
							const isActive = showTriad && activeTriadIndex === i
							return (
								<TriadButton
									key={i}
									triad={triad}
									name={name}
									isActive={isActive}
									activeChordName={activeChordName}
									NOTE_CSS_VARS={NOTE_CSS_VARS}
									onClick={() => {
										isActive ? deselectTriad() : selectTriad(i)
									}}
								/>
							)
						})}

						<div className='triad-voicings'>
							{showTriad && triadVoicings.map((voicing, vi) => (
								<button
									key={vi}
									className={`triad-voicing-btn${activeTriadVoicing === voicing ? ' active' : ''}`}
									onClick={() =>
										selectTriadVoicing(
											activeTriadVoicing === voicing ? null : voicing,
										)
									}
								>
									{voicing.name}
								</button>
							))}
						</div>
					</div>
				)}
			</Field>
		</>
	)
}

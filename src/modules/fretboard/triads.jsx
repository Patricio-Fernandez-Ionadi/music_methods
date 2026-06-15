import { useFretboard } from './context/fretboard-context'
import { useMemo } from 'react'
import { Field } from '../../app/components/field/field'
import { buildChordName } from './utils/chord-names'
import { TriadButton } from './triad-button'

export const Triads = () => {
	const {
		rawTriads,
		showTriad,
		activeTriadIndex,
		selectTriad,
		deselectTriad,
		selectedMode,
		activeExtensions,
		activeInversion,
		NOTE_CSS_VARS,
	} = useFretboard()

	const chordNames = useMemo(() => {
		if (!rawTriads?.length) return []
		return rawTriads.map((triad, i) =>
			buildChordName(triad[0], selectedMode.chords[i], [], 0),
		)
	}, [rawTriads, selectedMode])

	const activeChordName = useMemo(() => {
		if (activeTriadIndex == null || !rawTriads?.length) return ''
		const triad = rawTriads[activeTriadIndex]
		return buildChordName(
			triad[0],
			selectedMode.chords[activeTriadIndex],
			activeExtensions,
			activeInversion,
		)
	}, [
		rawTriads,
		activeTriadIndex,
		selectedMode,
		activeExtensions,
		activeInversion,
	])

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
					</div>
				)}
			</Field>
		</>
	)
}

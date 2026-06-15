import { Field } from '../../app/components/field/field'
import { useFretboard } from './context/FretboardContext'

export const InversionControls = () => {
	const { activeInversion, selectInversion, INVERSION_OPTIONS, showTriad } =
		useFretboard()

	return (
		<Field label={'Inversiones'}>
			<div className='inversion-toggle-group'>
				{INVERSION_OPTIONS.map(({ value, label }) => (
					<button
						key={value}
						className={`inversion-btn${activeInversion === value ? ' active' : ''}${!showTriad ? ' disabled' : ''}`}
						onClick={() => showTriad && selectInversion(value)}
						disabled={!showTriad}
					>
						{label}
					</button>
				))}
			</div>
		</Field>
	)
}

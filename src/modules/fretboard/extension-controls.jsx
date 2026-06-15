import { Field } from '../../app/components/field/field'
import { useFretboard } from './context/fretboard-context'

export const ExtensionControls = () => {
	const { activeExtensions, toggleExtension, EXTENSION_OPTIONS, showTriad } =
		useFretboard()

	return (
		<Field label={'Extensiones'}>
			<div className='extension-toggle-group'>
				{EXTENSION_OPTIONS.map(({ key, label }) => (
					<button
						key={key}
						className={`extension-btn${activeExtensions.includes(key) ? ' active' : ''}${!showTriad ? ' disabled' : ''}`}
						onClick={() => showTriad && toggleExtension(key)}
						disabled={!showTriad}
					>
						{label}
					</button>
				))}
			</div>
		</Field>
	)
}

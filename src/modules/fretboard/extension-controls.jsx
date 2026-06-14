import { useFretboard } from './context/FretboardContext'

export const ExtensionControls = () => {
	const { activeExtensions, toggleExtension, EXTENSION_OPTIONS, showTriad } = useFretboard()

	return (
		<div className='field extension-controls'>
			<h4>Extensiones</h4>
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
		</div>
	)
}

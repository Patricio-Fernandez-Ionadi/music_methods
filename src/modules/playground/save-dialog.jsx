import { useState } from 'react'

export function SaveDialog({ onSave, onClose }) {
	const [name, setName] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		if (name.trim()) {
			onSave(name.trim())
			onClose()
		}
	}

	return (
		<div className='save-dialog-overlay' onClick={onClose}>
			<div className='save-dialog' onClick={(e) => e.stopPropagation()}>
				<h3>Guardar progresion</h3>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						className='save-dialog-input'
						placeholder='Nombre de la progresion'
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoFocus
					/>
					<div className='save-dialog-actions'>
						<button type='button' className='save-dialog-cancel' onClick={onClose}>
							Cancelar
						</button>
						<button type='submit' className='save-dialog-save' disabled={!name.trim()}>
							Guardar
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

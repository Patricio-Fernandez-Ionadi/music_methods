export const SongFormActions = ({ isEditing, onCancel, onSaveToFile }) => (
	<div className='form-actions'>
		<button type='submit' className='btn-submit'>
			{isEditing ? 'Guardar cambios' : 'Agregar canción'}
		</button>
		<button type='button' className='btn-cancel' onClick={onCancel}>
			Cancelar
		</button>
		<button type='button' className='btn-save-file' onClick={onSaveToFile}>
			Guardar en .txt
		</button>
	</div>
)

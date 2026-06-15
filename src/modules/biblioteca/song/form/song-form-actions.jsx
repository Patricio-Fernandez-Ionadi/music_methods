export const SongFormActions = ({ isEditing, onCancel }) => (
	<div className='form-actions'>
		<button type='submit' className='btn-submit'>
			{isEditing ? 'Guardar cambios' : 'Agregar canción'}
		</button>
		<button type='button' className='btn-cancel' onClick={onCancel}>
			Cancelar
		</button>
	</div>
)

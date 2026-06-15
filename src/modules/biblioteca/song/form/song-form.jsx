import { useApp } from '../../../../app/context/app-context'
import { useSongForm } from '../../hooks/use-song-form'
import { SongFormBasicInfo } from './song-form-basic-info'
import { SongFormLyrics } from './song-form-lyrics'
import { SongFormTablature } from './song-form-tablature'
import { SongFormActions } from './song-form-actions'

export const SongForm = ({ onSuccess, onCancel }) => {
	const { songs, setSongs, editingSong, setEditingSong } = useApp()
	const {
		form,
		handleChange,
		handleSubmit,
		handleCancel,
		insertTabTemplate,
		isEditing,
	} = useSongForm({
		songs,
		setSongs,
		editingSong,
		setEditingSong,
		onSuccess,
	})

	return (
		<div className='song-form-view'>
			<h2>{isEditing ? 'Editar canción' : 'Nueva canción'}</h2>

			<form onSubmit={handleSubmit} className='song-form'>
				<SongFormBasicInfo form={form} handleChange={handleChange} />
				<SongFormLyrics form={form} handleChange={handleChange} />
				<SongFormTablature
					form={form}
					handleChange={handleChange}
					insertTabTemplate={insertTabTemplate}
				/>
				<SongFormActions
					isEditing={isEditing}
					onCancel={() => {
						handleCancel()
						onCancel?.()
					}}
				/>
			</form>
		</div>
	)
}

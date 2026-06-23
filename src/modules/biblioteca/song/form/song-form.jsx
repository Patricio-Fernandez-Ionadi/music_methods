import { useApp } from '../../../../app/context/app-context'
import { useSongForm } from '../../hooks/use-song-form'
import { SongFormBasicInfo } from './song-form-basic-info'
import { SongFormLyrics } from './song-form-lyrics'
import { SongFormTablature } from './song-form-tablature'
import { SongFormActions } from './song-form-actions'
import { stringToLyrics } from '../../utils/lyrics'
import { saveSongToFile } from '../../utils/save-song'

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

	const handleSaveToFile = async () => {
		const song = {
			name: form.name.trim(),
			artist: form.artist.trim(),
			key: form.key.trim(),
			lyrics: stringToLyrics(form.lyrics),
			tabs: form.tabsContent.trim()
				? form.tabsContent.split(/\n\n---\n\n/).filter(Boolean).map((block, i) => {
						const lines = block.split('\n')
						const match = lines[0]?.match(/^==\s*(.*)/)
						return {
							label: match ? match[1].trim() || `Tab ${i + 1}` : `Tab ${i + 1}`,
							content: match ? lines.slice(1).join('\n') : block,
						}
					})
				: [],
		}
		const result = await saveSongToFile(song)
		if (result.ok) {
			alert('Canción guardada en .txt correctamente.')
		} else if (result.offline) {
			alert('La edición en archivo no está disponible en esta versión web. Usá la app en local para guardar.')
		} else {
			alert('Error al guardar: ' + (result.error || 'desconocido'))
		}
	}

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
					onSaveToFile={handleSaveToFile}
				/>
			</form>
		</div>
	)
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../app/context/app-context'
import { useSongForm } from './hooks/useSongForm'
import { stringToLyrics } from './utils/lyrics'
import './style/_song-form.scss'

/**
 * Vista del formulario para crear o editar canciones.
 * Muestra campos agrupados para datos básicos, letra con acordes
 * y tablatura, con vista previa de la letra.
 */
export const SongFormView = () => {
	const navigate = useNavigate()
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
		onSuccess: () => navigate('/biblioteca'),
	})

	const [showPreview, setShowPreview] = useState(false)
	const previewLyrics = showPreview ? stringToLyrics(form.lyrics) : []

	return (
		<div className='song-form-view'>
			<button className='back-btn' onClick={() => navigate('/biblioteca')}>
				← Volver
			</button>

			<h2>{isEditing ? 'Editar canción' : 'Nueva canción'}</h2>

			<form onSubmit={handleSubmit} className='song-form'>
				<fieldset className='form-section'>
					<legend>Información básica</legend>

					<label className='form-field'>
						<span className='form-label'>Nombre *</span>
						<input
							name='name'
							placeholder='Ej: Nothing Else Matters'
							value={form.name}
							onChange={handleChange}
							required
						/>
					</label>

					<label className='form-field'>
						<span className='form-label'>Artista</span>
						<input
							name='artist'
							placeholder='Ej: Metallica'
							value={form.artist}
							onChange={handleChange}
						/>
					</label>

					<label className='form-field'>
						<span className='form-label'>Tonalidad *</span>
						<input
							name='key'
							placeholder='Ej: C, Am, G, Dm, F#m...'
							value={form.key}
							onChange={handleChange}
							required
						/>
					</label>
				</fieldset>

				<fieldset className='form-section'>
					<legend>Letra y acordes</legend>

					<div className='form-hint'>
						Escribe cada verso en una línea. Usa <code>[Acorde]</code> antes del
						texto para indicar un acorde, podés usar varios por línea.
					</div>

					<label className='form-field'>
						<span className='form-label'>Letra</span>
						<textarea
							name='lyrics'
							placeholder={
								'[Am]Hello darkness, my old [C]friend\n' +
								"[F]I've come to talk with you a[C]gain"
							}
							value={form.lyrics}
							onChange={handleChange}
							className='lyrics-input'
							rows={6}
						/>
					</label>

					<div className='form-preview-actions'>
						<button
							type='button'
							className='preview-toggle'
							onClick={() => setShowPreview(!showPreview)}
						>
							{showPreview ? 'Ocultar vista previa' : 'Vista previa'}
						</button>
					</div>

					{showPreview && (
						<div className='preview-box'>
							{previewLyrics.length > 0 ? (
								<div className='lyrics-preview'>
									{previewLyrics.map((line, i) => (
										<div key={i} className='preview-line'>
											{line.segments.map((seg, j) => (
												<span key={j} className='seg'>
													{seg.chord && (
														<span className='seg-chord'>{seg.chord}</span>
													)}
													<span className='seg-text'>{seg.text}</span>
												</span>
											))}
										</div>
									))}
								</div>
							) : (
								<p className='preview-empty'>
									Escribí algo con el formato <code>[Acorde]texto</code> para
									ver la previsualización.
								</p>
							)}
						</div>
					)}
				</fieldset>

				<fieldset className='form-section'>
					<legend>Tablatura</legend>

					<div className='form-hint'>
						Pegá o escribí la tablatura. Usá el botón "Insertar plantilla" para
						obtener las 6 cuerdas en blanco.
					</div>

					<label className='form-field'>
						<span className='form-label'>
							Nombre (ej: Riff principal, Solo…)
						</span>
						<input
							name='tabsLabel'
							placeholder='Ej: Riff Principal'
							value={form.tabsLabel}
							onChange={handleChange}
						/>
					</label>

					<label className='form-field'>
						<span className='form-label'>Tablatura</span>
						<textarea
							name='tabsContent'
							placeholder={
								'e|--0--0--0--0--0--0--0--0--|\n' +
								'B|--0--0--0--0--0--0--0--0--|'
							}
							value={form.tabsContent}
							onChange={handleChange}
							className='tabs-textarea'
							rows={6}
						/>
					</label>

					<button
						type='button'
						className='insert-template'
						onClick={insertTabTemplate}
					>
						+ Insertar plantilla
					</button>
				</fieldset>

				<div className='form-actions'>
					<button type='submit' className='btn-submit'>
						{isEditing ? 'Guardar cambios' : 'Agregar canción'}
					</button>
					<button
						type='button'
						className='btn-cancel'
						onClick={() => {
							handleCancel()
							navigate('/biblioteca')
						}}
					>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	)
}

import { useState } from 'react'
import { stringToLyrics } from '../../utils/lyrics'

export const SongFormLyrics = ({ form, handleChange }) => {
	const [showPreview, setShowPreview] = useState(false)
	const previewLyrics = showPreview ? stringToLyrics(form.lyrics) : []

	return (
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
	)
}

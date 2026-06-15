export const SongFormBasicInfo = ({ form, handleChange }) => (
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
)

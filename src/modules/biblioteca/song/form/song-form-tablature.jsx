export const SongFormTablature = ({ form, handleChange, insertTabTemplate }) => (
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
)

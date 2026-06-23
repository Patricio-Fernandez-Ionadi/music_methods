export const SongFormTablature = ({ form, handleChange, insertTabTemplate }) => (
	<fieldset className='form-section'>
		<legend>Tablatura</legend>

		<div className='form-hint'>
			Pegá o escribí la tablatura. Cada sección empieza con <code>== Nombre</code>{" "}
			y se separa con <code>---</code> entre secciones.
		</div>

		<label className='form-field'>
			<span className='form-label'>Tablatura</span>
			<textarea
				name='tabsContent'
				placeholder={
					'== Riff principal\ne|--0--0--0--0--0--0--0--0--|\nB|--0--0--0--0--0--0--0--0--|\n\n---\n\n== Solo\ne|--3--2--0--|\nB|--3--2--0--|'
				}
				value={form.tabsContent}
				onChange={handleChange}
				className='tabs-textarea'
				rows={8}
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

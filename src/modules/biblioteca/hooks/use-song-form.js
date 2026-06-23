import { useState, useEffect } from 'react'
import { lyricsToString, stringToLyrics } from '../utils/lyrics'

/**
 * Canción vacía usada como valor inicial del formulario.
 */
const EMPTY_SONG = {
	name: '',
	artist: '',
	key: '',
	lyrics: '',
	tabsContent: '',
}

/**
 * Hook que centraliza la lógica del formulario de agregar/editar canciones.
 *
 * - Cuando `editingSong` tiene un valor, popula el formulario con sus datos.
 * - `handleSubmit` crea o actualiza la canción según corresponda.
 * - `handleCancel` resetea el formulario y sale del modo edición.
 * - Al enviar con éxito ejecuta `onSuccess` si se proporcionó.
 *
 * @param {Object} params
 * @param {Array} params.songs - Lista de canciones
 * @param {Function} params.setSongs - Setter de la lista
 * @param {object|null} params.editingSong - Canción en edición
 * @param {Function} params.setEditingSong - Setter de edición
 * @param {Function} [params.onSuccess] - Callback al enviar con éxito
 * @returns {{ form: object, handleChange: Function, handleSubmit: Function, handleCancel: Function, isEditing: boolean }}
 */
export function useSongForm({
	songs,
	setSongs,
	editingSong,
	setEditingSong,
	onSuccess,
}) {
	const [form, setForm] = useState(EMPTY_SONG)

	/** Cuando se selecciona una canción para editar, llena el formulario. */
	useEffect(() => {
		if (editingSong) {
			const tabs = editingSong.tabs || []
			setForm({
				name: editingSong.name,
				artist: editingSong.artist,
				key: editingSong.key,
				lyrics: lyricsToString(editingSong.lyrics),
				tabsContent: tabs
					.map(t => `== ${t.label}\n${t.content}`)
					.join('\n\n---\n\n'),
			})
		} else {
			setForm(EMPTY_SONG)
		}
	}, [editingSong])

	/** @param {import('react').ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e */
	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	/**
	 * Pega la plantilla de tablatura en blanco al final del contenido actual.
	 */
	const insertTabTemplate = () => {
		const template =
			'e|--------------------------------------------------------------------|\n' +
			'B|--------------------------------------------------------------------|\n' +
			'G|--------------------------------------------------------------------|\n' +
			'D|--------------------------------------------------------------------|\n' +
			'A|--------------------------------------------------------------------|\n' +
			'E|--------------------------------------------------------------------|'
		setForm((prev) => ({
			...prev,
			tabsContent: prev.tabsContent
				? prev.tabsContent + '\n\n' + template
				: template,
		}))
	}

	/**
	 * Parsea el contenido del textarea de tabs de vuelta a un array de { label, content }.
	 * Formato: bloques separados por "\n\n---\n\n", cada bloque empieza con "== Label".
	 */
	function parseTabs(str) {
		if (!str.trim()) return editingSong?.tabs || []
		return str.split(/\n\n---\n\n/).filter(Boolean).map((block, i) => {
			const lines = block.split('\n')
			const match = lines[0]?.match(/^==\s*(.*)/)
			const label = match
				? match[1].trim() || editingSong?.tabs?.[i]?.label || `Tab ${i + 1}`
				: editingSong?.tabs?.[i]?.label || `Tab ${i + 1}`
			const content = match
				? lines.slice(1).join('\n')
				: block
			return { label, content }
		})
	}

	/**
	 * Crea o actualiza una canción.
	 * - Si `editingSong` existe → actualiza esa canción en la lista.
	 * - Si no → agrega una nueva con un id generado por Date.now().
	 */
	const handleSubmit = (e) => {
		e.preventDefault()
		if (!form.name.trim() || !form.key.trim()) return

		const tabs = parseTabs(form.tabsContent)

		const songData = {
			name: form.name.trim(),
			artist: form.artist.trim(),
			key: form.key.trim(),
			lyrics: stringToLyrics(form.lyrics),
			tabs,
		}

		if (editingSong) {
			setSongs((prev) => {
				const updated = prev.map((s) => (s.id === editingSong.id ? { ...s, ...songData } : s))
				return updated
			})
			setEditingSong(null)
		} else {
			setSongs((prev) => [...prev, { ...songData, id: Date.now() }])
		}
		setForm(EMPTY_SONG)
		onSuccess?.()
	}

	/** Resetea el formulario y sale del modo edición. */
	const handleCancel = () => {
		setForm(EMPTY_SONG)
		setEditingSong(null)
	}

	return {
		form,
		handleChange,
		handleSubmit,
		handleCancel,
		insertTabTemplate,
		isEditing: !!editingSong,
	}
}

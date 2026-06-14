import { useState, useEffect } from 'react'
import { lyricsToString, stringToLyrics } from './lyrics'

/**
 * Canción vacía usada como valor inicial del formulario.
 */
const EMPTY_SONG = { name: '', artist: '', key: '', lyrics: '', tabsLabel: '', tabsContent: '' }

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
      setForm({
        name: editingSong.name,
        artist: editingSong.artist,
        key: editingSong.key,
        lyrics: lyricsToString(editingSong.lyrics),
        tabsLabel: editingSong.tabs?.[0]?.label || '',
        tabsContent: editingSong.tabs?.[0]?.content || '',
      })
    } else {
      setForm(EMPTY_SONG)
    }
  }, [editingSong])

  /** @param {import('react').ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e */
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
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
    setForm(prev => ({
      ...prev,
      tabsContent: prev.tabsContent
        ? prev.tabsContent + '\n\n' + template
        : template,
    }))
  }

  /**
   * Crea o actualiza una canción.
   * - Si `editingSong` existe → actualiza esa canción en la lista.
   * - Si no → agrega una nueva con un id generado por Date.now().
   */
  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name.trim() || !form.key.trim()) return

    const tabs =
      form.tabsContent.trim()
        ? [{ label: form.tabsLabel.trim() || 'Tablatura', content: form.tabsContent }]
        : editingSong?.tabs || []

    const songData = {
      name: form.name.trim(),
      artist: form.artist.trim(),
      key: form.key.trim(),
      lyrics: stringToLyrics(form.lyrics),
      tabs,
    }

    if (editingSong) {
      setSongs(prev =>
        prev.map(s => (s.id === editingSong.id ? { ...s, ...songData } : s)),
      )
      setEditingSong(null)
    } else {
      setSongs(prev => [...prev, { ...songData, id: Date.now() }])
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

# Documentación del Proyecto

_Generada el 2026-06-23_

## Vistas

### `views/biblioteca/biblioteca-view.jsx`
  - `BibliotecaView`

### `views/biblioteca/song-detail.jsx`
  - `SongDetail`

### `views/biblioteca/song-form-view.jsx`
  - `SongFormView`

### `views/funcional/funcional-view.jsx`
  - `FuncionalView`

### `views/guitarra/guitarra-view.jsx`
  - `GuitarraView`

### `views/modos/modos-view.jsx`
  - `ModosView`

## Módulos

### `modules/biblioteca/hooks/use-song-filters.js`
  - `useSongFilters` — Hook que maneja los filtros independientes de búsqueda.  *  * Expone:  * - `filters`     → valores actuales de cada filtro  * - `setFilter`   → actualiza un filtro por su nombre  * - `filtered`    → lista de canciones que pasan todos los filtros activos  *  * @param {Array} songs - Lista completa de canciones  * @returns {{ filters: { name: string, artist: string, key: string }, setFilter: (name: string, value: string) => void, filtered: Array }}

### `modules/biblioteca/hooks/use-song-form.js`
  - `useSongForm` — Hook que centraliza la lógica del formulario de agregar/editar canciones.  *  * - Cuando `editingSong` tiene un valor, popula el formulario con sus datos.  * - `handleSubmit` crea o actualiza la canción según corresponda.  * - `handleCancel` resetea el formulario y sale del modo edición.  * - Al enviar con éxito ejecuta `onSuccess` si se proporcionó.  *  * @param {Object} params  * @param {Array} params.songs - Lista de canciones  * @param {Function} params.setSongs - Setter de la lista  * @param {object|null} params.editingSong - Canción en edición  * @param {Function} params.setEditingSong - Setter de edición  * @param {Function} [params.onSuccess] - Callback al enviar con éxito  * @returns {{ form: object, handleChange: Function, handleSubmit: Function, handleCancel: Function, isEditing: boolean }}

### `modules/biblioteca/library/song-filters.jsx`
  - `SongFilters`

### `modules/biblioteca/library/song-list-header.jsx`
  - `SongListHeader`

### `modules/biblioteca/library/song-list-item.jsx`
  - `SongListItem`

### `modules/biblioteca/library/song-list.jsx`
  - `SongList`

### `modules/biblioteca/song/details/chord-diagram-panel.jsx`
  - `ChordDiagramPanel`

### `modules/biblioteca/song/details/song-header.jsx`
  - `SongHeader`

### `modules/biblioteca/song/details/song-lyrics.jsx`
  - `SongLyrics`

### `modules/biblioteca/song/details/song-tablatures.jsx`
  - `SongTablatures`

### `modules/biblioteca/song/form/song-form-actions.jsx`
  - `SongFormActions`

### `modules/biblioteca/song/form/song-form-basic-info.jsx`
  - `SongFormBasicInfo`

### `modules/biblioteca/song/form/song-form-lyrics.jsx`
  - `SongFormLyrics`

### `modules/biblioteca/song/form/song-form-tablature.jsx`
  - `SongFormTablature`

### `modules/biblioteca/song/form/song-form.jsx`
  - `SongForm`

### `modules/biblioteca/utils/key-detection.js`
  - `detectKey`

### `modules/biblioteca/utils/lyrics.js`
  - `lyricsToString`
  - `stringToLyrics`

### `modules/biblioteca/utils/transpose.js`
  - `transposeChord`
  - `transposeKey`
  - `semitonesBetween`

### `modules/guitarra/chord-dict.jsx`
  - `ChordDict` — ChordDict — Selector de acordes del diccionario.

### `modules/guitarra/chord-dict/chord-dict-fretboard.jsx`
  - `ChordDictFretboard`

### `modules/guitarra/context/fretboard-context.jsx`
  - `FretboardContext`
  - `NOTE_CSS_VARS` — Mapea nombre de nota → nombre de CSS custom property definida en theme/values/_notes.scss.  *  Usa 's' para sostenido (#) y 'b' para bemol.
  - `FretboardProvider`
  - `useFretboard`

### `modules/guitarra/data/chord-dictionary.js`
  - `voicingToIndexes` — Convierte una digitación a Set de índices globales del diapasón.  * Los índices se usan en FretNote para resaltar las notas del acorde.  *  * @param {Voicing} voicing  - { name, frets }  * @param {Object}  STRING_INDEXES  - { e:0, b:20, g:40, D:60, A:80, E:100 }  * @returns {Set<number>}
  - `getChordVoicings` — Retorna las digitaciones disponibles para una raíz + tipo de acorde.  *  * @param {string} root  - Nota raíz ('C', 'C#', 'D', …, 'B')  * @param {string} type  - Clave en CHORD_TYPES ('M', 'm', '7', etc.)  * @returns {Voicing[]}   Array de digitaciones (vacío si no hay)
  - `CHORD_TYPES`

### `modules/guitarra/data/chord-voicings.js`
  - `CHORD_VOICINGS`

### `modules/guitarra/fretboard-view.jsx`
  - `FretboardView`

### `modules/guitarra/fretboard.jsx`
  - `Fretboard`

### `modules/guitarra/hooks/use-chord-dictionary.js`
  - `useChordDictionary` — useChordDictionary  *  * Administra la selección de un acorde del diccionario.  *  * Estado:  *   activeChordRoot  → nota raíz seleccionada (null si ninguna)  *   activeChordType  → tipo de acorde seleccionado (null si ninguna)  *   activeVoicingIdx → índice de la digitación activa dentro del tipo+raíz  *  * Acciones:  *   selectChord(root, type)          → selecciona raíz + tipo, resetea digitación a 0  *   clearChord()                     → deselecciona todo  *   setVoicing(index)                → cambia la digitación activa  *   nextVoicing()                    → siguiente digitación disponible  *  * Derivados:  *   availableVoicings   → digitaciones disponibles para la selección actual  *   activeVoicing       → digitación activa (o null)  *   chordTypeKeys       → lista de claves de tipos de acorde  *   hasSelection        → true si hay raíz + tipo seleccionados  *   chordName           → nombre legible del acorde seleccionado (ej. "Do Mayor")  *  * @returns {Object}

### `modules/guitarra/hooks/use-fretboard-state.js`
  - `useFretboardState`

### `modules/guitarra/hooks/use-position-state.js`
  - `usePositionState`

### `modules/guitarra/hooks/use-triad-state.js`
  - `useTriadState`

### `modules/guitarra/note/fret-note.jsx`
  - `FretNote`

### `modules/guitarra/position-controls.jsx`
  - `Positions`

### `modules/guitarra/scale-info.jsx`
  - `ScaleInfo`

### `modules/guitarra/selectors.jsx`
  - `Selectors`

### `modules/guitarra/string/fretboard-string.jsx`
  - `FretboardString`

### `modules/guitarra/triad-button.jsx`
  - `TriadButton`

### `modules/guitarra/triads.jsx`
  - `Triads`

### `modules/guitarra/utils/chord-labels.js`
  - `getChordNoteLabel`

### `modules/guitarra/utils/chord-names.js`
  - `buildChordName`

### `modules/guitarra/utils/position-utils.js`
  - `TOTAL_FRETS`
  - `getNoteIndexes`
  - `positionApplies`
  - `noteToGlobalIndex`

### `modules/guitarra/utils/scale-utils.js`
  - `CHROMATIC`
  - `normalizeNote`
  - `SHARP_TO_FLAT`
  - `scaleNoteName`

### `modules/guitarra/utils/voicing-generators.js`
  - `NOTE_IDX`
  - `getNoteChromaticIndex`
  - `getFretOnString`
  - `CHORD_INTERVALS`
  - `eFormBarre`
  - `aFormBarre`
  - `dFormBarre`
  - `buildBarreVoicings`
  - `buildAllVoicings`

### `modules/modes/mode-component.jsx`
  - `ModeComponent`

### `modules/modes/mode-header.jsx`
  - `ModeHeader`

### `modules/modes/mode-table-row.jsx`
  - `ModeTableRow`

### `modules/modes/mode-table.jsx`
  - `ModeTable`

### `modules/modes/pentagram-note.jsx`
  - `PentagramNote`

### `modules/modes/pentagram.jsx`
  - `Pentagram`

### `modules/modes/utils/pentagram-notes.js`
  - `pentagramNoteHeight`

## Componentes Compartidos

### `app/components/armonicTable/armonic-table.jsx`
  - `ArmonicTable`

### `app/components/button/back-button.jsx`
  - `BackButton`

### `app/components/field/field.jsx`
  - `Field`

### `app/components/header/header.jsx`
  - `Header`

## Datos

### `data/biblioteca.js`
  - `INITIAL_SONGS`

### `data/fretboard.js`
  - `STRING_NOTES`
  - `STRING_INDEXES`
  - `ENHARMONICS`
  - `NOTES`
  - `POSITIONS`

### `data/modes.js`
  - `MODES`

### `data/scales.js`
  - `SCALES`

### `data/songs-generated.js`
  - `IMPORTED_SONGS` — Archivo generado por scripts/import-songs.mjs — NO EDITAR MANUALMENTE

## App Shell

### `app/context/app-context.jsx`
  - `AppProvider` — Proveedor de estado global de la aplicación.  * Centraliza:  * - Tónica y modo seleccionados (para funcional/modos)  * - Escala y triadas derivadas  * - Lista de canciones de la biblioteca (persistida en localStorage)  * - Canción en edición (para el flujo editar → formulario)
  - `useApp` — Hook para acceder al contexto global.  * Debe usarse dentro de un <AppProvider>.

### `app/layout/main-layout.jsx`
  - `MainLayout`

### `app/router/app-router.jsx`
  - `AppRouter`


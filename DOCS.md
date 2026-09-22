# Documentación del Proyecto

_Generada el 2026-09-22_

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

### `views/playground/playground-view.jsx`
  - `PlaygroundView`

## Módulos

### `modules/biblioteca/hooks/use-song-filters.js`
  - `useSongFilters` — Hook que maneja los filtros independientes de búsqueda.  *  * Expone:  * - `filters`     → valores actuales de cada filtro  * - `setFilter`   → actualiza un filtro por su nombre  * - `filtered`    → lista de canciones que pasan todos los filtros activos  *  * @param {Array} songs - Lista completa de canciones  * @returns {{ filters: { name: string, artist: string, key: string }, setFilter: (name: string, value: string) => void, filtered: Array }}

### `modules/biblioteca/hooks/use-song-form.js`
  - `useSongForm` — Hook que centraliza la lógica del formulario de agregar/editar canciones.  *  * - Cuando `editingSong` tiene un valor, popula el formulario con sus datos.  * - `handleSubmit` crea o actualiza la canción según corresponda.  * - `handleCancel` resetea el formulario y sale del modo edición.  * - Al enviar con éxito ejecuta `onSuccess` si se proporcionó.  *  * @param {Object} params  * @param {Array} params.songs - Lista de canciones  * @param {Function} params.setSongs - Setter de la lista  * @param {object|null} params.editingSong - Canción en edición  * @param {Function} params.setEditingSong - Setter de edición  * @param {Function} [params.onSuccess] - Callback al enviar con éxito  * @returns {{ form: object, handleChange: Function, handleSubmit: Function, handleCancel: Function, isEditing: boolean }}

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

### `modules/guitarra/chord-dict.jsx`
  - `ChordDict` — ChordDict — Selector de acordes del diccionario.

### `modules/guitarra/context/fretboard-context.jsx`
  - `FretboardContext`
  - `FretboardProvider`
  - `useFretboard`

### `modules/guitarra/data/chord-voicings.js`
  - `CHORD_VOICINGS`

### `modules/guitarra/fretboard-view.jsx`
  - `FretboardView`

### `modules/guitarra/hooks/use-chord-dictionary.js`
  - `useChordDictionary` — useChordDictionary  *  * Administra la selección de un acorde del diccionario.  *  * Estado:  *   activeChordRoot  → nota raíz seleccionada (null si ninguna)  *   activeChordType  → tipo de acorde seleccionado (null si ninguna)  *   activeVoicingIdx → índice de la digitación activa dentro del tipo+raíz  *  * Acciones:  *   selectChord(root, type)          → selecciona raíz + tipo, resetea digitación a 0  *   clearChord()                     → deselecciona todo  *   setVoicing(index)                → cambia la digitación activa  *   nextVoicing()                    → siguiente digitación disponible  *  * Derivados:  *   availableVoicings   → digitaciones disponibles para la selección actual  *   activeVoicing       → digitación activa (o null)  *   chordTypeKeys       → lista de claves de tipos de acorde  *   hasSelection        → true si hay raíz + tipo seleccionados  *   chordName           → nombre legible del acorde seleccionado (ej. "Do Mayor")  *  * @returns {Object}

### `modules/guitarra/hooks/use-fretboard-state.js`
  - `useFretboardState`

### `modules/guitarra/hooks/use-position-state.js`
  - `usePositionState`

### `modules/guitarra/hooks/use-triad-state.js`
  - `useTriadState`

### `modules/guitarra/position-controls.jsx`
  - `Positions`

### `modules/guitarra/scale-info.jsx`
  - `ScaleInfo`

### `modules/guitarra/selectors.jsx`
  - `Selectors`

### `modules/guitarra/triad-button.jsx`
  - `TriadButton`

### `modules/guitarra/triads.jsx`
  - `Triads`

### `modules/guitarra/utils/position-utils.js`
  - `TOTAL_FRETS`
  - `getNoteIndexes`
  - `positionApplies`
  - `noteToGlobalIndex`

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

### `modules/playground/data/progressions.js`
  - `PROGRESSIONS`

### `modules/playground/fretboard-panel.jsx`
  - `FretboardPanel`

### `modules/playground/hooks/use-progression.js`
  - `useProgression`

### `modules/playground/key-analyzer.jsx`
  - `KeyAnalyzer`

### `modules/playground/progression-display.jsx`
  - `ProgressionDisplay`

### `modules/playground/progression-selector.jsx`
  - `ProgressionSelector`

### `modules/playground/save-dialog.jsx`
  - `SaveDialog`

### `modules/playground/saved-list.jsx`
  - `SavedList`

### `modules/playground/utils/chord-utils.js`
  - `buildChordLabel` — Construye el nombre legible de un acorde.  * @param {string} root  * @param {string} type  * @returns {string} e.g. 'Cm', 'G7', 'F#dim'
  - `analyzeChord` — Analiza un acorde relativo a una tonalidad y devuelve información completa  * sobre su grado romano, si es diatónico, y sugerencias de acorde cercano.  *  * @param {{ root: string, type: string }} chord  * @param {{ tonic, quality, scaleNotes, expectedChords? }} keyInfo  * @returns {{ inScale, roman, expectedQuality, matchesQuality, suggestion, qualitySuggestion, isAccidental }}
  - `chordToRoman` — Convierte un acorde a su numeral romano relativo a una tonalidad (compatibilidad).  * Para uso completo usar analyzeChord.

### `modules/playground/utils/key-analyzer.js`
  - `analyzeKey` — Analiza una progresión de acordes y devuelve la tonalidad detectada.  *  * @param {{ root: string, type: string }[]} chords  * @returns {{ best, variants }}

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
  - `AppProvider` — Proveedor de estado global de la aplicación.  * Centraliza:  * - Tónica y modo seleccionados (para funcional/modos)  * - Escala y triadas derivadas  * - Lista de canciones de la biblioteca (persistida en localStorage)  * - Canción en edición (para el flujo editar → formulario)
  - `useApp` — Hook para acceder al contexto global.  * Debe usarse dentro de un <AppProvider>.

### `app/layout/main-layout.jsx`
  - `MainLayout`

### `app/router/app-router.jsx`
  - `AppRouter`


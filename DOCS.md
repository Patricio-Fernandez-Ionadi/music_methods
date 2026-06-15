# Project Documentation

_Generated on 2026-06-15_

## Views

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

## Modules

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

### `modules/biblioteca/utils/lyrics.js`
  - `lyricsToString` — Convierte el array de versos con acordes a string plano.  * Formato de salida: `[Acorde]texto [Otro]más texto` (una línea por verso).  *  * @param {LyricLine[]} lyrics - Letra formateada como objetos con segmentos  * @returns {string} Texto plano listo para editar en un textarea  *  * @example  * lyricsToString([  *   { segments: [{ chord: 'Am', text: 'Hello ' }, { chord: 'C', text: 'world' }] }  * ])  * // => "[Am]Hello [C]world"
  - `stringToLyrics` — Parsea un string con formato `[Acorde]texto [Otro]más texto`  * al array de objetos que usa internamente la app.  *  * @param {string} str - Texto ingresado por el usuario  * @returns {LyricLine[]} Letra formateada como segmentos  *  * @example  * stringToLyrics("[Am]Hello [C]world")  * // => [{ segments: [{ chord: 'Am', text: 'Hello ' }, { chord: 'C', text: 'world' }] }]

### `modules/fretboard/context/fretboard-context.jsx`
  - `FretboardProvider`
  - `useFretboard`

### `modules/fretboard/data/chord-voicings.js`
  - `CHORD_VOICINGS`

### `modules/fretboard/extension-controls.jsx`
  - `ExtensionControls`

### `modules/fretboard/fretboard-view.jsx`
  - `FretboardView`

### `modules/fretboard/fretboard.jsx`
  - `Fretboard`

### `modules/fretboard/hooks/use-extension-state.js`
  - `useExtensionState`

### `modules/fretboard/hooks/use-fretboard-state.js`
  - `useFretboardState`

### `modules/fretboard/hooks/use-position-state.js`
  - `usePositionState`

### `modules/fretboard/hooks/use-triad-state.js`
  - `useTriadState`

### `modules/fretboard/position-controls.jsx`
  - `Positions`

### `modules/fretboard/scale-info.jsx`
  - `ScaleInfo`

### `modules/fretboard/selectors.jsx`
  - `Selectors`

### `modules/fretboard/triads.jsx`
  - `Triads`

### `modules/modes/mode-component.jsx`
  - `ModeComponent`

### `modules/modes/mode-header.jsx`
  - `ModeHeader`

### `modules/modes/mode-table.jsx`
  - `ModeTable`

### `modules/modes/pentagram.jsx`
  - `Pentagram`

## Shared Components

### `app/components/armonicTable/armonic-table.jsx`
  - `ArmonicTable`

### `app/components/button/back-button.jsx`
  - `BackButton`

### `app/components/field/field.jsx`
  - `Field`

### `app/components/header/header.jsx`
  - `Header`

## Data

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

## App Shell

### `app/context/app-context.jsx`
  - `AppProvider` — Proveedor de estado global de la aplicación.  * Centraliza:  * - Tónica y modo seleccionados (para funcional/modos)  * - Escala y triadas derivadas  * - Lista de canciones de la biblioteca (persistida en localStorage)  * - Canción en edición (para el flujo editar → formulario)
  - `useApp` — Hook para acceder al contexto global.  * Debe usarse dentro de un <AppProvider>.

### `app/layout/main-layout.jsx`
  - `MainLayout`

### `app/router/app-router.jsx`
  - `AppRouter`


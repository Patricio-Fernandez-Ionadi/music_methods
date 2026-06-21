# music_methods — Architecture Guide

## Directory Structure

```
src/
├── views/              ← Route pages (thin orchestrators)
│   ├── index.js        ← Barrel export for all views
│   ├── biblioteca/     ← /biblioteca/* routes
│   ├── funcional/      ← /funcional route
│   ├── modos/          ← /modos route
│   └── guitarra/       ← /guitarra route
├── modules/            ← Feature modules (logic + components)
│   ├── biblioteca/     ← Song library feature
│   ├── guitarra/      ← Guitar fretboard feature
│   ├── modes/          ← Music modes feature
│   └── style/_index.scss
├── app/                ← App shell
│   ├── components/     ← Shared/reusable components (Header, Field, BackButton…)
│   ├── context/        ← Global state (AppProvider)
│   ├── layout/         ← MainLayout (Header + Outlet)
│   └── router/         ← AppRouter (route definitions)
├── data/               ← Static data (modes, scales, fretboard…)
└── theme/              ← SCSS theme values (colors, sizes, mixins…)
```

## Architecture Rules

### 1. `views/` — Thin orchestrators ONLY

Each file in `views/` corresponds to one route. Views must:

- Extract params / get data from context or hooks
- Compose atomic components from `modules/`
- Keep inline JSX to a minimum
- NOT contain business logic hooks (those go in `modules/`)
- NOT contain complex state or effects (encapsulate in components)
- NOT contain style imports EXCEPT a minimal wrapper SCSS if the view has a container (e.g., `.biblioteca-view { padding }`)

**Goal**: a view should be ~20-40 lines. If it has more, extract into module components.

**Examples**:

`views/biblioteca/song-detail.jsx` (31 lines, no style import — uses fragments):
```jsx
import { useParams } from 'react-router-dom'
import { useApp } from '../../app/context/app-context'
import { BackButton } from '../../app/components/button/back-button'
import { SongHeader } from '../../modules/biblioteca/song/details/song-header'
import { SongLyrics } from '../../modules/biblioteca/song/details/song-lyrics'
import { SongTablatures } from '../../modules/biblioteca/song/details/song-tablatures'

export const SongDetail = () => {
  const { songId } = useParams()
  const { songs } = useApp()
  const song = songs.find((s) => s.id === Number(songId))

  if (!song) return (/* not found fallback */)

  return (
    <>
      <BackButton route='biblioteca' />
      <SongHeader song={song} />
      <SongTablatures song={song} />
      <SongLyrics song={song} />
    </>
  )
}
```

`views/biblioteca/song-form-view.jsx` (36 lines):
```jsx
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../app/context/app-context'
import { useSongForm } from '../../modules/biblioteca/hooks/use-song-form'
import { BackButton } from '../../app/components/button/back-button'
import { SongFormBasicInfo } from '../../modules/biblioteca/song/form/song-form-basic-info'
import { SongFormLyrics } from '../../modules/biblioteca/song/form/song-form-lyrics'
import { SongFormTablature } from '../../modules/biblioteca/song/form/song-form-tablature'
import { SongFormActions } from '../../modules/biblioteca/song/form/song-form-actions'

export const SongFormView = () => {
  const navigate = useNavigate()
  const { songs, setSongs, editingSong, setEditingSong } = useApp()
  const { form, handleChange, handleSubmit, handleCancel, insertTabTemplate, isEditing } = useSongForm({...})

  return (
    <div className='song-form-view'>
      <BackButton route='biblioteca' />
      <h2>{isEditing ? 'Editar canción' : 'Nueva canción'}</h2>
      <form onSubmit={handleSubmit} className='song-form'>
        <SongFormBasicInfo form={form} handleChange={handleChange} />
        <SongFormLyrics form={form} handleChange={handleChange} />
        <SongFormTablature form={form} handleChange={handleChange} insertTabTemplate={insertTabTemplate} />
        <SongFormActions isEditing={isEditing} onCancel={() => { handleCancel(); navigate('/biblioteca') }} />
      </form>
    </div>
  )
}
```

### 2. `modules/` — Atomic, single-responsibility components

Each subdirectory within a module is a **subfeature** with its own components and styles.

**Structure**:
```
modules/<feature>/
├── <subfeature>/
│   ├── component-a.jsx       ← One export per file
│   ├── component-b.jsx
│   └── style/
│       ├── _component-a.scss  ← Style partial per component
│       ├── _component-b.scss
│       └── _index.scss        ← Barrel: @forward all partials
├── hooks/                    ← Custom hooks (business logic)
├── utils/                    ← Utility functions
└── style/
    └── _index.scss           ← Barrel: @forward all subfeature/style/index
```

**Naming conventions**:
- Files: `kebab-case.jsx`
- Components: `PascalCase` (exported name)
- SCSS partials: `_kebab-case.scss`
- Hooks: `use-hook-name.js` (export `useHookName`)

**Component rules**:
- Each file exports ONE component
- Component receives data via props
- May own its own state/effects (self-contained)
- Imports its own SCSS partial or relies on the global SCSS chain
- No React import needed (unless using hooks directly like `useState`)

### 3. Shared components go in `app/components/`

Components used across multiple modules or views:

```
app/components/
├── button/
│   ├── back-button.jsx
│   └── _back-button.scss
├── field/
│   ├── field.jsx
│   └── _field.scss
├── header/
│   ├── header.jsx
│   └── _header.scss
└── style/_index.scss         ← Barrel: @forward all component style dirs
```

### 4. SCSS organization

- **Theme values** (`theme/values/`): Colors, sizes, mixins, media queries, animations. Imported via `@use '../../theme/values' as *`.
- **Component styles**: SCSS partial lives alongside the component in `style/`.
- **Barrel chain**: Each `style/_index.scss` `@forward`s its directory's partials. The chain flows up:
  `component/style/_index.scss` → `module/style/_index.scss` → `theme/index.scss`

**Path for `@use '../../theme/values'` from different depths**:
- From `modules/<feature>/<subfeature>/style/`: `@use '../../../../../theme/values' as *;`
- From `modules/<feature>/style/`: `@use '../../../../theme/values' as *;`
- From `modules/<feature>/`: `@use '../../../theme/values' as *;`
- From `views/<feature>/`: `@use '../../theme/values' as *;`
- From `app/components/<component>/`: `@use '../../../theme/values' as *;`

### 5. Routing

All views are exported from `views/index.js` as named exports. The router imports them via `import * as v from '../../views'`:

```jsx
import * as v from '../../views'
// ...
<Route path='/funcional' element={<v.FuncionalView />} />
<Route path='/biblioteca'>
  <Route index element={<v.BibliotecaView />} />
  <Route path='nueva' element={<v.SongFormView />} />
  <Route path=':songId' element={<v.SongDetail />} />
</Route>
```

### 6. Adding a new feature

1. Create `modules/<feature>/` with subdirectories for each view/subfeature
2. Create atomic components in `<subfeature>/` with their SCSS partials
3. Create the view in `views/<feature>/` as a thin orchestrator
4. Add barrel exports in `modules/<feature>/style/_index.scss`
5. Add export in `views/index.js`
6. Register the route in `app/router/app-router.jsx`

### 7. Refactoring existing code

When extracting inline JSX into atomic components:

1. **Identify the subfeature**: where does the extracted component belong?
   - `details/` — components for a detail/dedicated view
   - `form/` — components for creation/edition forms
   - `library/` — components for list/browse views
   - Use your judgment; create a new subfeature if none fits
2. **Create the component** in `modules/<feature>/<subfeature>/component-name.jsx`
   - One export per file
   - Receives data via props
   - Encapsulates its own state/effects if needed
3. **Create the SCSS partial** in `modules/<feature>/<subfeature>/style/_component-name.scss`
   - Import theme via `@use '../../../../../theme/values' as *;` (adjust depth)
4. **Add `@forward`** in the subfeature's `style/_index.scss`
5. **Ensure the barrel chain** is complete:
   - `subfeature/style/_index.scss` → `modules/<feature>/style/_index.scss` → `modules/style/_index.scss` → `theme/index.scss`
6. **Update the view** to import and use the new component
7. **Remove the inline JSX** from the view
8. **Strip view SCSS**: if the view had a `.scss` with styles that now live in the component, remove them. Views should only keep minimal container styles.
9. **Verify**: `npm run build`
10. **Update docs**: `npm run docs` (regenera `DOCS.md` con el listado actualizado de componentes)

---

## Project Summary (contexto completo para el agente)

### guitarra — módulo principal

#### Archivos clave

| Archivo | Rol |
|---|---|
| `modules/guitarra/context/fretboard-context.jsx` | FretboardProvider + useFretboard hook. Compone useFretboardState (triads + positions + chord-dict). |
| `modules/guitarra/hooks/use-fretboard-state.js` | Orquestador que llama useTriadState, usePositionState, useChordDictionary |
| `modules/guitarra/hooks/use-triad-state.js` | Selección de tríada: toggle, showThird, showFifth, activeTriadIndex |
| `modules/guitarra/hooks/use-position-state.js` | 5 posiciones CAGED: toggle, chord voicing indexes |
| `modules/guitarra/hooks/use-chord-dictionary.js` | Selección de acorde: defaults C/M, availableVoicings via getChordVoicings |
| `modules/guitarra/data/chord-dictionary.js` | CHORD_TYPES (8 tipos), getChordVoicings (3 fallbacks enharmónicos), voicingToIndexes, withBarreAndTriads |
| `modules/guitarra/data/chord-voicings.js` | CHORD_VOICINGS — 5 shapes CAGED root position (solo jónico/eólico poblados) |
| `modules/guitarra/utils/voicing-generators.js` | NOTE_IDX, CHORD_INTERVALS, buildAllVoicings, buildBarreVoicings, CAGED barre forms (E/A/D) |
| `modules/guitarra/utils/scale-utils.js` | CHROMATIC, normalizeNote, SHARP_TO_FLAT, scaleNoteName |
| `modules/guitarra/utils/chord-labels.js` | getChordNoteLabel — 'root', 'third', 'fifth', null |
| `modules/guitarra/utils/chord-names.js` | buildChordName — 'C', 'Dm', 'Gdim' |
| `modules/guitarra/utils/position-utils.js` | TOTAL_FRETS, getNoteIndexes, positionApplies, noteToGlobalIndex |
| `modules/guitarra/chord-dict.jsx` | UI: root select + type buttons + voicing buttons + ChordDictFretboard |
| `modules/guitarra/chord-dict/chord-dict-fretboard.jsx` | Fretboard con currentScale contextual para nombres enharmónicos correctos |
| `modules/guitarra/fretboard-view.jsx` | Orquestador delgado: compone Selectors + ScaleInfo + Triads + Fretboard + Positions + ChordDict |
| `modules/guitarra/fretboard.jsx` | Grid del diapasón: 6 strings × frets, con positionIndexes, chordVoicingIndexes, chordDictIndexes |
| `modules/guitarra/note/fret-note.jsx` | Nota individual: clases CSS según contexto + scaleNoteName para enharmónicos |
| `modules/guitarra/triad-button.jsx` | Botón de tríada individual |
| `modules/guitarra/triads.jsx` | Selector de 7 tríadas (I–VII) |
| `modules/guitarra/selectors.jsx` | Selectores de tónica + modo |
| `modules/guitarra/scale-info.jsx` | Display de notas de la escala actual |
| `modules/guitarra/position-controls.jsx` | 5 botones CAGED + All |

#### Sistema de índices globales

```
globalIndex = STRING_INDEXES[stringName] + fret
STRING_INDEXES = { e: 0, b: 20, g: 40, D: 60, A: 80, E: 100 }
TOTAL_FRETS = 120
```

Todas las búsquedas (positionIndexes, chordVoicingIndexes, chordDictIndexes) usan `Set<globalIndex>` para O(1).

#### Enharmónicos

- `normalizeNote(note)` → resuelve bemol→sostenido (Bb→A#, Db→C#) usando ENHARMONICS
- `SHARP_TO_FLAT` → reverse map (C#→Db, D#→Eb, F#→Gb, G#→Ab)
- `scaleNoteName(note, currentScale)` → si la nota no está en la escala, busca su equivalente bemol y lo usa si está en la escala
- `getChordVoicings(root, type)` → 3 intentos: directo → normalizeNote → SHARP_TO_FLAT → []

#### Generación de voicings (voicing-generators.js)

```
CHORD_INTERVALS = {
  M: [0, 4, 7], m: [0, 3, 7], dim: [0, 3, 6],
  7: [0, 4, 7, 10], m7: [0, 3, 7, 10], maj7: [0, 4, 7, 11],
  sus4: [0, 5, 7], sus2: [0, 2, 7],
}

buildAllVoicings(root, quality):
  ├─ Si es tríada (3 notas): buildCloseVoicings en GBE (3 inversiones, span ≤ 5)
  └─ Si es 7ª (4 notas): buildDrop2Voicings en DGBE + ADGB (4 inversiones c/u, span ≤ 5)

buildBarreVoicings(root, quality):
  └─ Cejilla E, A, D — cada una con offsets propios por calidad (M/m/7/m7/maj7/dim/sus4/sus2)
```

Nombres de voicings generados:
- Triadas GBE: "Agudas", "Agudas 1ª inv.", "Agudas 2ª inv."
- Drop-2: "DGBE", "DGBE 1ª inv.", …, "ADGB", "ADGB 1ª inv.", …
- Cejillas: "Cejilla E", "Cejilla A", "Cejilla D"

#### ChordDictFretboard (chord-dict/chord-dict-fretboard.jsx)

Recibe `activeVoicing`, `root`, `type` como props.
- Computa `currentScale` desde `CHORD_INTERVALS[type]` + `NOTE_IDX[root]`
- Aplica `SHARP_TO_FLAT` para intervalos 3 y 10 (3ª menor, 7ª menor) para nombrar correctamente (Eb no D#)
- Pasa `currentScale` al `FretboardContext.Provider` para que `scaleNoteName` en FretNote funcione correctamente

#### FretNote — lógica de renderizado

1. `inScale` → nota en normalizedScale?
2. `isTonic` → nota === scale[0] (si showScaleTonic)
3. `inPosition` → globalIndex en positionIndexes
4. `inChordVoicing` → globalIndex en chordVoicingIndexes
5. `isRoot/isThird/isFifth` → nota === currentTriadDegrees (si showTriad)
6. `inChordDict` → globalIndex en chordDictIndexes (prioridad sobre voicing)
7. Clases CSS resultantes: `.fretActive`, `.fretTonic`, `.positionNote`, `.triadRoot/Third/Fifth`, `.chordDictNote`

### biblioteca — módulo

| Archivo | Rol |
|---|---|
| `hooks/use-song-filters.js` | Filtros por name, artist, key (AND, case-insensitive) |
| `hooks/use-song-form.js` | Crear/editar canciones, parsing de letras [Acorde]texto, plantilla de tablatura |
| `library/song-filters.jsx` | 3 inputs de filtro |
| `library/song-list-header.jsx` | Header + botón "Nueva canción" |
| `library/song-list-item.jsx` | Fila de canción individual |
| `library/song-list.jsx` | Lista completa o "Sin resultados" |
| `song/details/song-header.jsx` | Nombre, artista, tonalidad + menú editar/eliminar |
| `song/details/song-lyrics.jsx` | Letras con acordes inline |
| `song/details/song-tablatures.jsx` | Secciones de tablatura |
| `song/form/song-form.jsx` | Orquestador del formulario |
| `song/form/song-form-basic-info.jsx` | Inputs: nombre, artista, tonalidad |
| `song/form/song-form-lyrics.jsx` | Textarea de letras con preview |
| `song/form/song-form-tablature.jsx` | Textarea de tab + botón insertar plantilla |
| `song/form/song-form-actions.jsx` | Botones guardar/cancelar |
| `utils/lyrics.js` | lyricsToString / stringToLyrics |

Modelo de canción:
```js
{ id: Number, name: String, artist: String, key: String,
  lyrics: [{ segments: [{ chord, text }] }],
  tabs: [{ label: String, content: String }] }
```

Persistencia: localStorage clave `biblioteca-songs`, inicializado desde `src/data/biblioteca.js`.

### modes — módulo

| Archivo | Rol |
|---|---|
| `mode-component.jsx` | Tarjeta de modo (header + armónica + tabla + pentagrama) |
| `mode-header.jsx` | Nombre, intervalos T/S, alteraciones |
| `mode-table.jsx` | Tabla de 12 tonalidades |
| `mode-table-row.jsx` | Fila de tonalidad |
| `pentagram.jsx` | Pentagrama visual |
| `pentagram-note.jsx` | Nota en pentagrama |
| `utils/pentagram-notes.js` | pentagramNoteHeight |

### views — orquestadores delgados

| View | Ruta | Compone |
|---|---|---|
| `views/biblioteca/biblioteca-view.jsx` | `/biblioteca` | SongListHeader, SongFilters, SongList |
| `views/biblioteca/song-detail.jsx` | `/biblioteca/:songId` | BackButton, SongHeader, SongTablatures, SongLyrics |
| `views/biblioteca/song-form-view.jsx` | `/biblioteca/nueva` | BackButton, SongForm |
| `views/funcional/funcional-view.jsx` | `/funcional` | ModeComponent (jónico + eólico) |
| `views/modos/modos-view.jsx` | `/modos` | ModeComponent (5 modos) |
| `views/guitarra/guitarra-view.jsx` | `/guitarra` | FretboardProvider → FretboardView |

### app shell

| Archivo | Rol |
|---|---|
| `app/context/app-context.jsx` | AppProvider: tónica, modo, escala, tríadas, canciones |
| `app/layout/main-layout.jsx` | Header + Outlet |
| `app/router/app-router.jsx` | Definiciones de rutas (import * as v from '../../views') |
| `app/components/header/header.jsx` | Navegación principal |
| `app/components/field/field.jsx` | Field wrapper con label |
| `app/components/button/back-button.jsx` | Botón volver |
| `app/components/armonicTable/armonic-table.jsx` | Tabla armónica de grados |

### SCSS barrel chain

```
theme/index.scss
 ├── values/_index.scss  ← colores, tamaños, mixins, notas, media queries
 ├── app/style/_index.scss  ← layout + componentes compartidos
 └── modules/style/_index.scss
       ├── biblioteca/style/  ← details + form + library
       ├── guitarra/style/  ← _fretboard, _triads, _selectors, _positions,
       │                        _scale-info, _chord-dict, _chord-dict-fretboard,
       │                        _fretboard-header
       └── modes/style/  ← _mode-header, _mode-table, _pentagram
```

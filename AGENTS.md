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
│   ├── fretboard/      ← Guitar fretboard feature
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

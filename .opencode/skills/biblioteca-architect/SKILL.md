---
name: biblioteca-architect
description: Use when working with the biblioteca module, song library, songs, canciones, biblioteca-view, song-detail, song-form, formulario, lyrics, tablatures, or the CRUD operations for songs.
---

# Biblioteca Architect

## Architecture pattern

Views are thin orchestrators (15–30 lines). All logic and markup goes in module subfeatures.

**Views** (`src/views/biblioteca/`):
- `biblioteca-view.jsx` — composes `SongListHeader`, `SongFilters`, `SongList`
- `song-detail.jsx` — composes `BackButton`, `SongHeader`, `SongTablatures`, `SongLyrics`
- `song-form-view.jsx` — composes `BackButton`, `SongForm`

## Module structure

```
src/modules/biblioteca/
├── hooks/
│   ├── use-song-form.js          ← creates/edits songs
│   └── use-song-filters.js       ← search filters
├── library/                      ← list/browse components
│   ├── song-filters.jsx          ← filter inputs (name, artist, key)
│   ├── song-list-header.jsx      ← header + "Nueva canción" button
│   ├── song-list-item.jsx        ← single song row
│   └── song-list.jsx             ← renders list or "Sin resultados"
├── song/
│   ├── details/                  ← song detail components
│   │   ├── song-header.jsx       ← name, artist, key, edit/delete menu
│   │   ├── song-lyrics.jsx       ← renders parsed lyrics with chords
│   │   └── song-tablatures.jsx   ← renders tab sections
│   └── form/                     ← song form components
│       ├── song-form.jsx         ← orchestrator (wires hook → sub-components)
│       ├── song-form-actions.jsx ← submit + cancel buttons
│       ├── song-form-basic-info.jsx ← name, artist, key fields
│       ├── song-form-lyrics.jsx  ← textarea + preview toggle
│       └── song-form-tablature.jsx ← label + tab textarea + insert template
├── utils/
│   └── lyrics.js                 ← lyricsToString / stringToLyrics parsers
└── style/_index.scss             ← barrel forwards details + form + library
```

## Song data model

```js
{
  id: Number,          // Date.now() for new songs
  name: String,        // required
  artist: String,      // optional
  key: String,         // required (e.g. "Em", "G", "F#m")
  lyrics: [{ segments: [{ chord: String, text: String }] }],  // parsed
  tabs: [{ label: String, content: String }]  // raw ascii tablature
}
```

Songs persist to `localStorage` key `'biblioteca-songs'`, initialized from `src/data/biblioteca.js` (`INITIAL_SONGS`).

## Hook signatures

### `useSongForm({ songs, setSongs, editingSong, setEditingSong, onSuccess? })`
Returns: `{ form, handleChange, handleSubmit, handleCancel, insertTabTemplate, isEditing }`

- `form` — `{ name, artist, key, lyrics (raw string), tabsLabel, tabsContent }`
- `handleSubmit` — validates name+key non-empty, parses lyrics via `stringToLyrics`, assembles tabs array, creates/updates song by id, resets form, calls `onSuccess?.()`
- `handleCancel` — resets form + clears editingSong
- `insertTabTemplate` — appends 6-string blank tab template to tabsContent

### `useSongFilters(songs)`
Returns: `{ filters: { name, artist, key }, setFilter(name, value), filtered: Array }`

- Case-insensitive AND filter across all three fields

## Component props

| Component | Props |
|---|---|
| `SongListHeader` | `{ onNewSong: fn }` |
| `SongFilters` | `{ filters: object, setFilter: fn }` |
| `SongList` | `{ songs: array, onSongClick: fn }` |
| `SongListItem` | `{ song: object, onClick: fn }` |
| `SongHeader` | `{ song: object }` (has internal menu state) |
| `SongLyrics` | `{ song: object }` |
| `SongTablatures` | `{ song: object }` |
| `SongForm` | `{ onSuccess: fn, onCancel: fn }` |
| `SongFormBasicInfo` | `{ form: object, handleChange: fn }` |
| `SongFormLyrics` | `{ form: object, handleChange: fn }` |
| `SongFormTablature` | `{ form: object, handleChange: fn, insertTabTemplate: fn }` |
| `SongFormActions` | `{ isEditing: bool, onCancel: fn }` |

## Lyrics format

Internal: `[{ segments: [{ chord: 'Am', text: 'Hello ' }, ...] }]`
Textarea: `[Am]Hello [C]world` — `[Chord]text` per segment, `\n` per verse line.

Parsing: `stringToLyrics(str)` → internal array | `lyricsToString(lyrics)` → textarea string.

## SCSS barrel chain

```
modules/biblioteca/style/_index.scss
 ├── song/details/style/    ← _dotted-menu, _song-header, _song-tablatures, _song-lyrics
 ├── song/form/style/       ← _song-form, _song-form-basic-info, _song-form-lyrics, _song-form-tablature, _song-form-actions
 └── library/style/         ← _song-list-header, _song-filters, _song-list, _song-list-item
```

Each `_index.scss` `@forward`s individual component partials.

## When refactoring

1. Extract inline JSX into `modules/biblioteca/<subfeature>/<name>.jsx`
2. Create `modules/biblioteca/<subfeature>/style/_<name>.scss` importing theme
3. Add `@forward` in subfeature's `style/_index.scss`
4. Update view to use new component, remove inline JSX
5. Strip view SCSS (minimal container padding only if needed)
6. **Run `npm run docs`** to regenerate `DOCS.md`

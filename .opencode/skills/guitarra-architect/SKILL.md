---
name: guitarra-architect
description: Use when working with the fretboard module, guitarra view, fretboard rendering, trastes, diapasón, CAGED positions, chord voicings, chord dictionary, triads, scale visualization, or note rendering on the guitar neck.
---

# Guitarra Architect

## Module structure

```
src/modules/guitarra/
├── context/
│   └── fretboard-context.jsx      ← FretboardProvider + useFretboard() hook (30 lines)
├── data/
│   ├── chord-voicings.js          ← CHORD_VOICINGS: 7 modos × 5 shapes CAGED (root position only)
│   └── chord-dictionary.js        ← CHORD_TYPES: diccionario de acordes con digitaciones fijas
├── hooks/
│   ├── use-fretboard-state.js     ← orchestrator — composes all sub-hooks (20 lines)
│   ├── use-triad-state.js         ← triad selection + display toggles (56 lines)
│   ├── use-position-state.js      ← CAGED positions + chord voicing index computation (83 lines)
│   └── use-chord-dictionary.js    ← chord dictionary selection state (80 lines)
├── note/
│   └── fret-note.jsx              ← individual fret render with class/color logic (100 lines)
├── string/
│   └── fretboard-string.jsx       ← single string container (46 lines)
├── style/
│   ├── _index.scss                ← barrel: forwards 7 partials
│   ├── _fretboard.scss            ← fretboard-container, .fret (notes), .visual-string
│   ├── _fretboard-header.scss     ← .scale-header (layout top area)
│   ├── _selectors.scss            ← .selector-group (mode + tonic dropdowns)
│   ├── _scale-info.scss           ← .scale-notes (color-coded note display)
│   ├── _triads.scss               ← .triad-btn, .triad-selector
│   ├── _positions.scss            ← .position-btn, .position-toggle-group
│   └── _chord-dict.scss           ← .chord-dict, .chord-dict-select, .chord-dict-result
├── utils/
│   ├── chord-labels.js            ← getChordNoteLabel() — returns 'root'|'third'|'fifth'|null
│   ├── chord-names.js             ← buildChordName(root, type) — ej. 'C', 'Dm', 'Gdim'
│   ├── position-utils.js          ← getNoteIndexes(), positionApplies(), noteToGlobalIndex() + TOTAL_FRETS
│   └── scale-utils.js             ← CHROMATIC, normalizeNote()
├── chord-dict.jsx                 ← chord dictionary selector UI (80 lines)
├── fretboard-view.jsx             ← thin orchestrator — composes all sub-components (28 lines)
├── fretboard.jsx                  ← fretboard grid — maps STRING_ORDER → FretboardString (66 lines)
├── position-controls.jsx          ← position toggle 1–5 + All (28 lines)
├── scale-info.jsx                 ← current scale notes display (18 lines)
├── selectors.jsx                  ← mode + tonic dropdowns (44 lines)
├── triad-button.jsx               ← single triad button (36 lines)
└── triads.jsx                     ← triad degree selector (62 lines)
```

## Data flow

```
AppProvider (global context — src/app/context/app-context.jsx)
  ├─ selectedTonic, setSelectedTonic  (default: 'C')
  ├─ selectedMode, setSelectedMode    (default: MODES.jonico)
  ├─ currentScale (derived via SCALES[tonic][modeId])
  ├─ rawTriads (7 triads derived from currentScale)
  ├─ MODES, NOTES
  └─ songs, setSongs, editingSong, setEditingSong
       ↓
FretboardProvider (wraps guitarra route)
  ├─ useFretboardState()
  │    ├─ useTriadState(normalizedTriads)
  │    │    └─ returns { showTriad, showThird, showFifth, activeTriadIndex,
  │    │                  showScaleTonic, currentTriadDegrees,
  │    │                  toggleTriad, toggleThird, toggleFifth,
  │    │                  selectTriad, deselectTriad }
  │    ├─ usePositionState(normalizedScale, modeId)
  │    │    ├─ POSITIONS (CAGED scale offsets — src/data/fretboard.js)
  │    │    ├─ CHORD_VOICINGS (chord shapes — modules/guitarra/data/chord-voicings.js)
  │    │    └─ returns { activePositions, getPositionIndexes,
  │    │                  getChordVoicingIndexes, togglePosition, toggleAllPositions }
  │    └─ useChordDictionary()
  │         ├─ CHORD_TYPES (from data/chord-dictionary.js — see below)
  │         └─ returns { activeChordRoot, activeChordType, activeVoicing,
  │                      selectChord, clearChord, nextVoicing, hasSelection, ... }
  ├─ NOTE_CSS_VARS (note name → CSS variable, e.g. C → --note-C)
  └─ NOTES (chromatic 12-note array)
       ↓
  Components → FretboardView → selectors, scale-info, triads,
                                chord-dict, fretboard, position-controls
```

## Key data models

### `STRING_NOTES` (from src/data/fretboard.js)
6 strings × 20 frets, note names with sharps (except Bb).
```js
STRING_NOTES = {
  e: ['F', 'F#', 'G', 'G#', 'A', 'Bb', 'B', 'C',  ...],  // high E
  b: ['C', 'C#', 'D', 'D#', 'E', 'F',  'F#', 'G', ...],  // B
  g: ['G', 'G#', 'A', 'Bb', 'B', 'C',  'C#', 'D',  ...],  // G
  D: ['D', 'D#', 'E', 'F',  'F#', 'G', 'G#', 'A',  ...],  // D
  A: ['A', 'Bb', 'B', 'C',  'C#', 'D', 'D#', 'E',  ...],  // A
  E: ['E', 'F',  'F#', 'G', 'G#', 'A', 'Bb', 'B',  ...],  // low E
}
```
- String order for display: `['e', 'b', 'g', 'D', 'A', 'E']` (high e first).

### `STRING_INDEXES` (from src/data/fretboard.js)
Global linear offset per string (20 frets × 6 strings = 120 total positions).
```js
STRING_INDEXES = { e: 0, b: 20, g: 40, D: 60, A: 80, E: 100 }
```
Formula: `globalIndex = STRING_INDEXES[stringName] + fret`

### `total notes`
`TOTAL_FRETS = 120` (6 strings × 20 frets) — used as upper bound for globalIndex.

### `POSITIONS[modeId][pos]` (from src/data/fretboard.js)
CAGED pattern offsets relative to tonic global index. Each position is `Array<{ offset, degree }>`.
- 7 modes (jonico, dorico, frigio, lidio, mixolidio, eolico, locrio)
- 5 positions per mode (1–5)
- `positionApplies(pos, tonicIndex)` filters: pos 1-2 on low E, pos 3-4 on A, pos 5 on D.

### `CHORD_VOICINGS[modeId][pos]` (from modules/guitarra/data/chord-voicings.js)
Chord shapes (root position only — all 5 CAGED shapes). Each:
```js
{
  name: 'E',           // shape name (CAGED letter)
  rootString: 'E',     // string where root fret is calculated
  notes: [
    { string: 'E', fretOffset: 0, degree: 1 },
    { string: 'A', fretOffset: 2, degree: 5 },
    // ...
  ]
}
```
- Currently only `jonico` and `eolico` modes are populated (2 modas × 5 positions each).
- Degree can be number (1, 3, 5) or string ('b3').

### `CHORD_TYPES` (from modules/guitarra/data/chord-dictionary.js)
Chord dictionary with fixed fret positions (like tablature). Indexed by chord type (`'M'`, `'m'`, `'7'`, etc.) then root note.

```js
CHORD_TYPES = {
  M: {
    label: 'Mayor',
    short: '',
    roots: {
      C: [
        { name: 'Abierta', frets: [-1, 3, 2, 0, 1, 0] },
        { name: 'Cejilla E', frets: [8, 10, 10, 9, 8, 8] },
      ],
      // ... other roots
    },
  },
  // ... other chord types
}
```

Each voicing:
- `name` — display name (e.g. 'Abierta', 'Cejilla E')
- `frets` — `[lowE, A, D, G, B, highE]` where `-1` = mute, `0` = open, `>0` = fret

**Helpers exported:**
- `getChordVoicings(root, type)` → `Voicing[]` — lookup by root + type
- `voicingToIndexes(voicing, STRING_INDEXES)` → `Set<number>` — global indexes for fretboard

**Integration:**
- `useChordDictionary()` hook manages selection state
- When a chord is selected, `fretboard.jsx` computes `chordDictIndexes` via `voicingToIndexes()`
- `FretNote` receives these as `chordDictIndexes` prop
- When `hasChordDict` is true, chord dict notes take visual priority over triad/voicing notes
- The chord dict UI (`ChordDict` component) renders in `FretboardView` below the fretboard

### `rawTriads` (derived in AppProvider)
7 triads from `currentScale`, each is `[root, third, fifth]`:
```js
rawTriads = [
  [scale[0], scale[2], scale[4]],  // I
  [scale[1], scale[3], scale[5]],  // II
  // ...
]
```
Normalized via `normalizeNote()` (resolves enharmonics) before use.

## Components inventory

All components consume from `useFretboard()` context — NO props passed (except FretboardString and FretNote which receive props from Fretboard).

| Component | Uses from context |
|---|---|
| `Selectors` | `selectedTonic`, `setSelectedTonic`, `selectedMode`, `setSelectedMode`, `MODES`, `NOTES` |
| `ScaleInfo` | `selectedTonic`, `selectedMode`, `currentScale`, `NOTE_CSS_VARS` |
| `Triads` | `rawTriads`, `showTriad`, `activeTriadIndex`, `selectTriad`, `deselectTriad`, `selectedMode`, `NOTE_CSS_VARS` |
| `TriadButton` | Receives props: `triad`, `name`, `isActive`, `activeChordName`, `NOTE_CSS_VARS`, `onClick` |
| `Positions` | `activePositions`, `togglePosition`, `toggleAllPositions` |
| `ChordDict` | Receives props from FretboardView: `activeChordRoot`, `activeChordType`, `activeVoicingIdx`, `selectChord`, `clearChord`, `setVoicing`, `nextVoicing`, `availableVoicings`, `activeVoicing`, `hasSelection`, `chordName`, `NOTES`, `chordTypeKeys` |
| `Fretboard` | `showTriad`, `showThird`, `showFifth`, `normalizedScale`, `showScaleTonic`, `currentTriadDegrees`, `getPositionIndexes`, `getChordVoicingIndexes`, `activeTriadIndex`, `activePositions`, `NOTE_CSS_VARS`, `hasSelection`, `activeVoicing` |
| `FretboardString` | Receives props: `stringName` + the same computed values passed from Fretboard |
| `FretNote` | Receives props from FretboardString. Computes classes and colors internally |

## Fretboard rendering logic

The `Fretboard` component:
1. Computes `positionIndexes` (Set of global indexes for active CAGED positions)
2. Computes `chordVoicingIndexes` (Set of global indexes for chord shapes, if showTriad + positions active)
3. Computes `chordDictIndexes` (Set of global indexes for chord dictionary voicing, if chord selected)
4. Destructures `{ root, third, fifth }` from `currentTriadDegrees`
5. Maps `STRING_ORDER` → `<FretboardString>` passing all computed data as props

`FretboardString` maps `STRING_NOTES[stringName]` → `<FretNote>` for each fret.

`FretNote` computes per-note:
1. `globalIndex = STRING_INDEXES[stringName] + fret`
2. `inScale` → note in `normalizedScale`?
3. `isTonic` → note === `normalizedScale[0]` (if `showScaleTonic`)
4. `inPosition` → `globalIndex` in `positionIndexes` set?
5. `inChordVoicing` → `globalIndex` in `chordVoicingIndexes` set?
6. `isRoot` / `isThird` / `isFifth` → note matches currentTriadDegrees (if showTriad)
7. `chordLabel` → `getChordNoteLabel(note, root, third, fifth)` → `'root'`|`'third'`|`'fifth'`|null
8. `isVoicingNote` → inChordVoicing + showTriad + hasChordVoicing
9. `inChordDict` → globalIndex in `chordDictIndexes` set? (takes priority, supresses voicing notes)
10. CSS classes built:
    - `.fretActive` → inScale, no chord/voicing highlight
    - `.fretTonic` → isTonic, no triad/voicing highlight
    - `.positionNote` → inPosition + inScale, no chord/voicing highlight
    - `.triadRoot` / `.triadThird` / `.triadFifth` → voicing or chord highlight
    - `.chordDictNote` → inChordDict (shows note name + note color)

Color: `style={{ '--note-color': 'var(--note-X)' }}` — from `NOTE_CSS_VARS` map.

## SCSS structure

### Theme values (src/theme/values/)
- `_colors.scss`: `$primary`, `$black`, `$white`, `$grey_light`, etc.
- `_notes.scss`: `:root { --note-C: hsl(...); --note-Cs: hsl(...); ... }` — 12 HSL colors at 30° intervals
- `_sizes.scss`: `$gap`, `$button-height`, `$smooth`, etc.
- `_mixins.scss`, `_mediaqueries.scss`, `_animations.scss`, etc.

### Barrel chain
```
modules/guitarra/style/_index.scss → forwards:
  _fretboard-header.scss  ← .scale-header
  _fretboard.scss         ← .fretboard-container, .string-container, .fret, .visual-string
  _triads.scss            ← .triad-selector, .triad-btn
  _selectors.scss         ← .selector-group, .selector-input
  _positions.scss         ← .controls, .position-btn, .position-toggle-group
  _scale-info.scss        ← .scale-notes
  _chord-dict.scss        ← .chord-dict, .chord-dict-select, .chord-dict-result
```

Each partial imports theme values with:
```scss
@use '../../../theme/values/colors' as *;
```

## Chord labeling

`buildChordName(root, type)` returns chord name like `'C'`, `'Dm'`, `'Gdim'`, etc.

- `type` comes from `MODES[modeId].chords[degree]` — `'M'`, `'m'`, or `'dim'`
- `chordSuffix(type)`: `'M'` → `''`, `'m'` → `'m'`, `'dim'` → `'dim'`

`getChordNoteLabel(note, root, third, fifth)` returns a label string:
- Matches against root, third, fifth
- Returns `null` if no match

## Rendering defaults

- All positions off (activePositions starts as `[]`)
- Scale tonic displayed (`showScaleTonic: true`)
- Triads off (`showTriad: false`)
- Default mode: Jónico, key: C

## Global index system

The fretboard uses a **flat global index** system for efficient Set lookups:
- 6 strings × 20 frets = 120 positions
- `globalIndex = STRING_INDEXES[string] + fret`
- `STRING_INDEXES = { e: 0, b: 20, g: 40, D: 60, A: 80, E: 100 }`
- All position/voicing computations return `Set<globalIndex>` for O(1) lookup

## Known issues & priorities

- **Diccionario de acordes**: el diccionario actual tiene digitaciones para M, m, 7, m7, maj7, dim, sus4, sus2 — pero faltan más tipos (aug, m7b5, etc.) y más voicings por raíz. El data format es simple de extender: solo agregar entries en `chord-dictionary.js`.
- **Chord voicings CAGED**: solo jónico y eólico tienen shapes. Los otros 5 modos están vacíos en `chord-voicings.js`.
- **Información pedagógica**: los datos de modos (grados, función emocional, intervalos) ya existen en `src/data/modes.js` pero no se muestran en la vista guitarra.
- **Interactividad**: no hay click en notas del diapasón. Podría permitir seleccionar notas para construir acordes.
- **use-position-state.js**: `getChordVoicingIndexes` tiene lógica inline para mapear tonicIndex a rootStringIdx — podría moverse a utils.

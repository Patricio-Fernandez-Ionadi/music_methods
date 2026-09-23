---
name: guitarra-architect
description: Use when working with the fretboard module, guitarra view, fretboard rendering, trastes, diapasón, CAGED positions, chord voicings, chord dictionary, triads, scale visualization, or note rendering on the guitar neck.
---

# Guitarra Architect

## Module structure

```
src/modules/guitarra/
├── context/
│   └── fretboard-context.jsx          ← FretboardProvider + useFretboard() hook
├── data/
│   ├── chord-voicings.js              ← CHORD_VOICINGS: 7 modes × 5 shapes CAGED (root position)
│   └── chord-dictionary.js            ← CHORD_TYPES + getChordVoicings + voicingToIndexes
├── hooks/
│   ├── use-fretboard-state.js         ← orchestrator — composes all sub-hooks
│   ├── use-triad-state.js             ← triad selection + display toggles
│   ├── use-position-state.js          ← CAGED positions + chord voicing indexes
│   └── use-chord-dictionary.js        ← chord dictionary selection state (default C/M)
├── note/
│   └── fret-note.jsx                  ← individual fret render (uses scaleNoteName from context)
├── string/
│   └── fretboard-string.jsx           ← single string container
├── chord-dict/
│   └── chord-dict-fretboard.jsx       ← fretboard con currentScale contextual (enharmónicos correctos)
├── utils/
│   ├── chord-labels.js                ← getChordNoteLabel() — 'root'|'third'|'fifth'|null
│   ├── chord-names.js                 ← buildChordName(root, type) — 'C', 'Dm', 'Gdim'
│   ├── position-utils.js              ← getNoteIndexes(), positionApplies(), noteToGlobalIndex(), TOTAL_FRETS
│   ├── scale-utils.js                 ← CHROMATIC, normalizeNote, SHARP_TO_FLAT, scaleNoteName
│   └── voicing-generators.js          ← NOTE_IDX, CHORD_INTERVALS, buildAllVoicings, buildBarreVoicings
├── style/
│   ├── _index.scss                    ← barrel: forwards 8 partials
│   ├── _fretboard-header.scss         ← .scale-header
│   ├── _fretboard.scss                ← .fretboard-container, .fret, .visual-string
│   ├── _triads.scss                   ← .triad-btn, .triad-selector
│   ├── _selectors.scss                ← .selector-group, .selector-input
│   ├── _positions.scss                ← .position-btn, .position-toggle-group
│   ├── _scale-info.scss               ← .scale-notes
│   ├── _chord-dict.scss               ← .chord-dict, .chord-dict-select, .chord-dict-type-btn, .chord-dict-voicing-btn
│   └── chord-dict/style/
│       ├── _chord-dict-fretboard.scss ← .chord-dict-fretboard (210px height, same as main)
│       └── _index.scss                ← forwards _chord-dict-fretboard
├── chord-dict.jsx                     ← chord dictionary selector UI (root select + type buttons + voicing buttons)
├── fretboard-view.jsx                 ← thin orchestrator — composes all sub-components
├── fretboard.jsx                      ← fretboard grid — 6 strings × frets
├── position-controls.jsx              ← position toggle 1–5 + All
├── scale-info.jsx                     ← current scale notes display
├── selectors.jsx                      ← mode + tonic dropdowns
├── triad-button.jsx                   ← single triad button
└── triads.jsx                         ← triad degree selector (I–VII)
```

## Fretboard measurements — single source of truth

All fretboard dimensions live in **`src/shared/components/fretboard/fretboard-config.js`** → `FRETBOARD_VARIANTS`.

| Variant | Fret window | Fret width | Fixed width | Where |
|---|---|---|---|---|
| `full` | `{ start: 0, end: 12 }` (13 frets) | 50px | 650px | guitarra main (`fretboard-view.jsx`) + playground ScalePanel — `variant='full'` |
| `voicing` | 6 frets (dynamic centering) | 70px | 420px | playground FretboardPanel — `variant='voicing'` |
| `chordDict` | 5 frets (dynamic centering) | 70px | 350px | guitarra ChordDict — `variant='chordDict'`, **model for all reduced boards** |

Rules:
- Reduced boards (`voicing`, `chordDict`) use **wider frets** (70px) than `full` (50px). Model = `ChordDict`.
- The shared `Fretboard` (`shared/components/fretboard/fretboard.jsx`) takes `variant` (default `'full'`); it only applies the fixed `width` + `margin: 0 auto` when the variant defines one. Reduced variants keep their own sized wrappers.
- Dynamic windows come from `variant.window` — do NOT redefine `WINDOW_SIZE`/`DEFAULT_RANGE` in consumers (see `fretboard-panel.jsx`, `chord-dict-fretboard.jsx`).
- NEVER stretch/squash frets to fit a container: adjust the layout, never the fretboard (playground is a single column so the 650px `full` always fits).

## Data flow

```
AppProvider (src/app/context/app-context.jsx)
  ├─ selectedTonic, setSelectedTonic  (default: 'C')
  ├─ selectedMode, setSelectedMode    (default: MODES.jonico)
  ├─ currentScale (derived via SCALES[tonic][modeId])
  ├─ rawTriads (7 triads from currentScale)
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
  │    │    ├─ POSITIONS (CAGED offsets — src/data/fretboard.js)
  │    │    ├─ CHORD_VOICINGS (modes/guitarra/data/chord-voicings.js)
  │    │    └─ returns { activePositions, getPositionIndexes,
  │    │                  getChordVoicingIndexes, togglePosition, toggleAllPositions }
  │    └─ useChordDictionary()
  │         ├─ CHORD_TYPES (8 types: M, m, 7, m7, maj7, dim, sus4, sus2)
  │         └─ returns { activeChordRoot, activeChordType, activeVoicing,
  │                      selectChord, setVoicing, availableVoicings, ... }
  ├─ NOTE_CSS_VARS (note name → CSS variable, e.g. C → --note-C)
  └─ NOTES (chromatic 12-note array)
       ↓
  FretboardView → Selectors, ScaleInfo, Triads, Fretboard, Positions, ChordDict
```

## Key data models

### `STRING_NOTES` (src/data/fretboard.js)
6 strings × 20 frets, note names with sharps (except Bb).
```
STRING_ORDER (display order): ['e', 'b', 'g', 'D', 'A', 'E']  (high e first)
FRET_CONVERSE (internal order): ['E', 'A', 'D', 'g', 'b', 'e']  (low E first for frets array)
```

### `STRING_INDEXES` (src/data/fretboard.js)
```
STRING_INDEXES = { e: 0, b: 20, g: 40, D: 60, A: 80, E: 100 }
TOTAL_FRETS = 120
globalIndex = STRING_INDEXES[stringName] + fret
```

### `POSITIONS[modeId][pos]` (src/data/fretboard.js)
7 modes × 5 positions CAGED. Each position: `Array<{ offset, degree }>`.
`positionApplies(pos, tonicIndex)`: pos 1-2 on low E, pos 3-4 on A, pos 5 on D.

### `CHORD_VOICINGS[modeId][pos]` (modules/guitarra/data/chord-voicings.js)
CAGED shapes (root position). Only jónico/eólico populated. Shape structure:
```js
{ name: 'E', rootString: 'E', notes: [{ string: 'E', fretOffset: 0, degree: 1 }, ...] }
```

### `CHORD_TYPES` (modules/guitarra/data/chord-dictionary.js)
8 chord types. Each root's voicings are a mix of:
- **Manual**: open chords (unique per root, e.g. C Abierta)
- **Barre**: generated via `buildBarreVoicings(root, quality)` → E, A, D forms
- **Generated**: via `buildAllVoicings(root, quality)` → close triads (GBE) + drop-2 (DGBE, ADGB)

```js
CHORD_TYPES = {
  M:  { label: 'Mayor',          short: '',    roots: { C: withBarreAndTriads('C','M',[manual]), ... } },
  m:  { label: 'Menor',          short: 'm',   roots: { ... } },
  7:  { label: 'Dominante 7ª',   short: '7',   roots: allRoots(...) },
  m7: { label: 'Menor 7ª',       short: 'm7',  roots: allRoots(...) },
  maj7:{ label: 'Mayor 7ª',      short: 'maj7',roots: allRoots(...) },
  dim: { label: 'Disminuido',    short: 'dim', roots: allRoots(...) },
  sus4:{ label: 'Suspendida 4ª', short: 'sus4',roots: allRoots(...) },
  sus2:{ label: 'Suspendida 2ª', short: 'sus2',roots: allRoots(...) },
}
```

Key helpers:
- `getChordVoicings(root, type)` → 3 lookups: direct → `normalizeNote(root)` → `SHARP_TO_FLAT[root]` → `[]`
- `voicingToIndexes(voicing, STRING_INDEXES)` → `Set<globalIndex>`
- `withBarreAndTriads(root, quality, manual)` → merges manual + barre + generated voicings
- `allRoots(fn)` → calls fn for all 12 chromatic roots

### `rawTriads` (derived in AppProvider)
7 triads from currentScale: `[scale[0], scale[2], scale[4]]` (I) through `[scale[6], scale[8], scale[10]]` (VII).
Normalized via `normalizeNote()` before use.

## Components inventory

| Component | Props (from FretboardView) |
|---|---|
| `Selectors` | (reads context: `selectedTonic`, `selectedMode`, `MODES`, `NOTES`) |
| `ScaleInfo` | (reads context: `currentScale`, `selectedTonic`, `selectedMode`) |
| `Triads` | (reads context: `rawTriads`, `showTriad`, `activeTriadIndex`, etc.) |
| `TriadButton` | `{ triad, name, isActive, activeChordName, NOTE_CSS_VARS, onClick }` |
| `Positions` | (reads context: `activePositions`, `togglePosition`, `toggleAllPositions`) |
| `ChordDict` | `activeChordRoot, activeChordType, selectChord, setVoicing, availableVoicings, activeVoicing, NOTES, chordTypeKeys` |
| `Fretboard` | (reads context: all state) |
| `FretboardString` | `{ stringName, ...computedIndexes }` from Fretboard |
| `FretNote` | `{ note, fret, globalIndex, ...classes }` from FretboardString |

## Voicing generators (voicing-generators.js)

```
CHORD_INTERVALS = {
  M: [0, 4, 7], m: [0, 3, 7], dim: [0, 3, 6],
  7: [0, 4, 7, 10], m7: [0, 3, 7, 10], maj7: [0, 4, 7, 11],
  sus4: [0, 5, 7], sus2: [0, 2, 7],
}
```

### `buildCloseVoicings(root, quality, setKey)`
Triads (3 notes) on GBE → 3 inversions. 7th chords (4 notes) → 4 inversions.
All filtered by span ≤ 5 frets.

### `buildDrop2Voicings(root, quality, setKey)`
7th chords only. Drop-2 formula: [a,b,c,d] → [c,a,b,d]. 4 inversions.
Generates on DGBE + ADGB string sets. Filtered by span ≤ 5 frets.

### `buildBarreVoicings(root, quality)`
CAGED barre forms (E, A, D) with offset patterns per quality.
- `eFormBarre(rootFret, quality)` → cejilla E form
- `aFormBarre(rootFret, quality)` → cejilla A form
- `dFormBarre(rootFret, quality)` → cejilla D form
Offsets defined in `BARRE` object for M, m, 7, m7, maj7, dim, aug, sus4, sus2.

### `buildAllVoicings(root, quality)`
- Triad types (M, m, dim, sus4, sus2): close voicings on GBE only
- 7th types (7, m7, maj7): drop-2 on DGBE + ADGB

Naming convention: "Agudas" / "Agudas 1ª inv." / "Agudas 2ª inv." for triads;
"DGBE" / "DGBE 1ª inv." / … for drop-2; "Cejilla E/A/D" for barres; "Abierta" for open chords.

## Enharmonic handling

### `scale-utils.js`
- `CHROMATIC`: `['C','C#','D','D#','E','F','F#','G','G#','A','Bb','B']`
- `normalizeNote(note)`: resolves ENHARMONICS (flat→sharp): A#→Bb, Db→C#, Eb→D#, Gb→F#, Ab→G#
- `SHARP_TO_FLAT`: reverse map (sharp→flat): C#→Db, D#→Eb, F#→Gb, G#→Ab
- `scaleNoteName(note, currentScale)`: if note not in scale, tries flat equivalent

### `getChordVoicings` (chord-dictionary.js)
3 fallback lookups for root: direct key → `normalizeNote(root)` → `SHARP_TO_FLAT[root]` → `[]`

### `ChordDictFretboard` (chord-dict/chord-dict-fretboard.jsx)
Computes `currentScale` from `CHORD_INTERVALS[type]` + `NOTE_IDX[root]`, then applies `SHARP_TO_FLAT` for intervals 3 (minor 3rd) and 10 (minor 7th) to produce correct enharmonic note names (e.g. Eb not D# for Cm). Passes `currentScale` to `FretboardContext.Provider`.

## FretNote rendering logic

1. `inScale` → note in `normalizedScale`?
2. `isTonic` → note === scale[0] (if `showScaleTonic`)
3. `inPosition` → globalIndex in `positionIndexes`
4. `inChordVoicing` → globalIndex in `chordVoicingIndexes`
5. `isRoot/isThird/isFifth` → note === currentTriadDegrees (if `showTriad`)
6. `inChordDict` → globalIndex in `chordDictIndexes` (takes priority over voicing)
7. CSS classes: `.fretActive`, `.fretTonic`, `.positionNote`, `.triadRoot/Third/Fifth`, `.chordDictNote`
8. Note name displayed via `scaleNoteName(note, currentScale)` from context

## Rendering defaults

- All positions off (`activePositions: []`)
- Scale tonic displayed (`showScaleTonic: true`)
- Triads off (`showTriad: false`)
- Default mode: Jónico, key: C
- ChordDict default: C Major (C, M)

## Global index system

Flat global index for O(1) Set lookups:
```
globalIndex = STRING_INDEXES[string] + fret
STRING_INDEXES = { e: 0, b: 20, g: 40, D: 60, A: 80, E: 100 }
```

## Known issues & priorities

- **Chord voicings CAGED**: solo jónico y eólico tienen shapes en `chord-voicings.js`. Los otros 5 modos están vacíos.
- **Información pedagógica**: los datos de modos (grados, función emocional, intervalos) existen en `src/data/modes.js` pero no se muestran en la vista guitarra.
- **Interactividad**: no hay click en notas del diapasón. Podría permitir seleccionar notas para construir acordes.
- **use-position-state.js**: `getChordVoicingIndexes` tiene lógica inline para mapear tonicIndex a rootStringIdx — podría moverse a utils.
- **buildCloseVoicings** y **buildDrop2Voicings**: las funciones viejas `buildTriadSetVoicings`, `generateTriadVoicing` ya no se usan, seguras de eliminar.

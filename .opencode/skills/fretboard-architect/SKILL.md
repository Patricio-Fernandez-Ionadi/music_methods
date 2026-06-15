---
name: fretboard-architect
description: Use when working with the fretboard module, guitarra view, fretboard rendering, trastes, diapasón, CAGED positions, chord voicings, triads, extensions, inversions, scale visualization, or note rendering on the guitar neck.
---

# Fretboard Architect

## Module structure

```
src/modules/fretboard/
├── context/fretboard-context.jsx  ← FretboardProvider + useFretboard()
├── data/chord-voicings.js         ← CHORD_VOICINGS (chord shapes per mode/position)
├── hooks/
│   ├── use-fretboard-state.js     ← orchestrator hook (composes all sub-hooks)
│   ├── use-triad-state.js         ← triad selection + display state
│   ├── use-position-state.js      ← CAGED position + chord voicing index computation
│   ├── use-extension-state.js     ← extension toggle state (7, b7, 6, 9, 11, sus4, sus2)
│   └── use-inversion-state.js     ← inversion selection state
├── style/                         ← 8 partials (one per component group)
├── extension-controls.jsx         ← toggle buttons for extensions
├── fretboard-view.jsx             ← thin orchestrator (composes all sub-components)
├── fretboard.jsx                  ← visual fretboard grid (127 lines — NEEDS REFACTOR)
├── inversion-controls.jsx         ← inversion selector
├── position-controls.jsx          ← position toggle (1–5 + All)
├── scale-info.jsx                 ← current scale notes display
├── selectors.jsx                  ← mode + tonic dropdowns
└── triads.jsx                     ← triad degree selector (148 lines — NEEDS REFACTOR)
```

## Data flow

```
AppProvider (global context)
  └─ selectedTonic, selectedMode
       └─ currentScale (from SCALES[tonic][modeId])
       └─ rawTriads (derived from currentScale)
            ↓
FretboardProvider (wraps guitarra route)
  ├─ useFretboardState()
  │    ├─ useTriadState(normalizedTriads)
  │    ├─ usePositionState(normalizedScale, modeId)
  │    │    ├─ POSITIONS (CAGED scale: src/data/fretboard.js)
  │    │    └─ CHORD_VOICINGS (chord shapes: modules/fretboard/data/)
  │    ├─ useExtensionState(currentDegExtensions)
  │    └─ useInversionState()
  ├─ NOTE_CSS_VARS (note name → CSS variable, e.g. C → --note-C)
  └─ NOTES (chromatic 12-note array)
       ↓
  Components → FretboardView → GuitarraView
```

## Key data models

**`STRING_NOTES`** (from `src/data/fretboard.js`): 6 strings × 20 frets, note names with sharps (except Bb).

**`STRING_INDEXES`**: global linear offset per string: `{ e: 0, b: 20, g: 40, D: 60, A: 80, E: 100 }`.

**`POSITIONS[modeId][pos]`**: Array of `{ offset, degree }` — CAGED pattern offsets relative to tonic global index.

**`CHORD_VOICINGS[modeId][pos]`**: `{ name, rootString, notes: [{ string, fretOffset, degree }] }` — chord shapes with degree 1/3/5 or 'b3'.

## Components inventory

All components consume from `useFretboard()` context — NO props passed.

| Component | Uses from context |
|---|---|
| `Selectors` | `selectedTonic`, `setSelectedTonic`, `selectedMode`, `setSelectedMode`, `MODES`, `NOTES` |
| `ScaleInfo` | `selectedTonic`, `selectedMode`, `currentScale`, `NOTE_CSS_VARS` |
| `Triads` | `rawTriads`, `showTriad`, `activeTriadIndex`, `selectTriad`, `deselectTriad`, `selectedMode`, `activeExtensions`, `activeInversion`, `NOTE_CSS_VARS` |
| `ExtensionControls` | `activeExtensions`, `toggleExtension`, `EXTENSION_OPTIONS`, `showTriad` |
| `InversionControls` | `activeInversion`, `selectInversion`, `INVERSION_OPTIONS`, `showTriad` |
| `Positions` (position-controls) | `activePositions`, `togglePosition`, `toggleAllPositions` |
| `Fretboard` | `showTriad`, `showThird`, `showFifth`, `normalizedScale`, `showScaleTonic`, `currentTriadDegrees`, `getPositionIndexes`, `getChordVoicingIndexes`, `activeTriadIndex`, `activeInversion`, `currentExtensions`, `activePositions`, `NOTE_CSS_VARS` |

## Hook signatures

| Hook | Returns |
|---|---|
| `useTriadState(normalizedTriads)` | `{ showTriad, showThird, showFifth, activeTriadIndex, showScaleTonic, currentTriadDegrees, toggleTriad, toggleThird, toggleFifth, selectTriad, deselectTriad }` |
| `usePositionState(normalizedScale, modeId)` | `{ activePositions, getPositionIndexes, getChordVoicingIndexes, togglePosition, toggleAllPositions }` |
| `useExtensionState(normalizedExtensionNotes)` | `{ activeExtensions, setActiveExtensions, toggleExtension, currentExtensions, EXTENSION_OPTIONS }` |
| `useInversionState()` | `{ activeInversion, selectInversion, INVERSION_OPTIONS }` |

## Fretboard rendering logic

The `Fretboard` component maps over `STRING_ORDER` (high e → low E) then over `STRING_NOTES[stringName]`. For each note it computes:

1. `globalIndex = STRING_INDEXES[stringName] + fret`
2. `inScale` — note in normalized scale?
3. `isTonic` — first scale degree?
4. `inPosition` — globalIndex in active position set?
5. Triad match: `isRoot`, `isThird`, `isFifth` against `currentTriadDegrees`
6. `chordLabel` via `getChordNoteLabel()` — returns `'root'`, `'third'`, `'fifth'`, extension key, or null
7. `inChordVoicing` — globalIndex in chord voicing index set?
8. CSS classes: `fretActive`, `fretTonic`, `positionNote`, `triadRoot/Third/Fifth/Extension`
9. Color via inline `style={{ '--note-color': 'var(--note-X)' }}`

## Known refactoring priorities

- `fretboard.jsx` (127 lines): extract `FretboardString` and `FretNote` sub-components; move `getChordNoteLabel()` to `utils/`
- `triads.jsx` (148 lines): extract `buildChordName()` and `chordSuffix()` to `utils/chord-names.js`; extract triad buttons into `TriadButton` sub-component
- `use-position-state.js` (143 lines): extract 5 utility functions to `utils/position-utils.js`
- `use-fretboard-state.js`: extract `CHROMATIC`, `normalizeNote()`, `getExtensionNotesForDegree()` to `utils/`

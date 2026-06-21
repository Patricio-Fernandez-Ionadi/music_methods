---
name: voicings-architect
description: Use when working with chord voicings, triad inversions, CAGED barre forms, chord-dictionary.js, voicing-generators.js, the complete voicings system across string sets, or adding new voicings to the fretboard.
---

# Voicings Architect

## Two voicing systems

### System A: CAGED Position Voicings (`src/modules/guitarra/data/chord-voicings.js`)
- Used when positions 1-5 are toggled on the fretboard
- 5 shapes per mode (E, G, C, A, D), only populated for jonico + eolico
- `rootString` + `fretOffset` per note relative to the root position
- Rendered as solid colored circles (`triadRoot/Third/Fifth`)

### System B: Chord Dictionary (`src/modules/guitarra/data/chord-dictionary.js`)
- Used for triad voicing buttons and ChordDict component
- Explicit `frets: [lowE, A, D, G, B, highE]` format where -1 = mute
- Populated via manual data + `voicing-generators.js` helpers
- Rendered as hollow outlined circles (`triadVoicingNote`)

## Helper generators (`src/modules/guitarra/utils/voicing-generators.js`)

### Barre forms
| Helper | Root string | Strings | Use |
|--------|-------------|---------|-----|
| `eFormBarre(f, q)` | E (6th) | 6 | E shape (Mi) |
| `aFormBarre(f, q)` | A (5th) | 5-6 | A shape (La) |
| `dFormBarre(f, q)` | D (4th) | 4 | D shape (Re) |

### Triad voicings
`generateTriadVoicing(rootIdx, quality, inversion, stringSet)`

- `rootIdx`: 0=C .. 11=B
- `quality`: 'M'|'m'|'dim'|'aug'
- `inversion`: 0=root, 1=1st, 2=2nd
- `stringSet`: `['G','B','e']`, `['D','G','B']`, `['A','D','G']`, `['E','A','D']`

Returns `[lowE, A, D, G, B, highE]` frets array.

### Utility helpers
- `getNoteChromaticIndex(note)` → 0..11
- `getFretOnString(note, stringName)` → fret number

## Data flow

```
voicing-generators.js
  ↓ (computed at module load)
chord-dictionary.js  CHORD_TYPES
  ↓
triads.jsx → getChordVoicings(root, type) → voicing buttons
  ↓
fretboard.jsx → voicingToIndexes(voicing) → Set<globalIndex>
  ↓
fret-note.jsx → render as triadRoot/Third/Fifth or triadVoicingNote
```

## How to add voicings

1. If it follows a barre pattern → add quality pattern to generator
2. If it's a unique open chord → add manually to `chord-dictionary.js`
3. If it's a 3-string triad → use `generateTriadVoicing`
4. If it's a new chord quality → add entry in `CHORD_TYPES` + generator pattern

## String sets for triads

| Set | Strings | Register |
|-----|---------|----------|
| 1 | G, B, e (top 3) | Agudo |
| 2 | D, G, B | Medio-agudo |
| 3 | A, D, G | Medio-grave |
| 4 | E, A, D (bottom 3) | Grave |

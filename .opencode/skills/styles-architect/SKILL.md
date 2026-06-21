---
name: styles-architect
description: Use when working with SCSS, styles, theme, barrel chain, CSS, styling, variables, mixins, placeholders, animations, responsive design, or the visual appearance of components across any module.
---

# Styles Architect

## Theme values (`src/theme/values/`)

Import via `@use '../../theme/values' as *;` (adjust depth per file location).

| Partial | Contents |
|---|---|
| `_colors.scss` | `$primary_light`, `$primary`, `$primary_dark`, `$white`, `$grey`, `$black`, `$background` (#121212), `$success`, `$error`, `$info`, `$shadow_color`, degree colors (`$relative_major`, `$relative_minor`, etc.) |
| `_sizes.scss` | `$padding-container`, `$pad`, `$gap`, `$smooth`, `$ball`, `$thin`, `$navigation-height`, `$navigation-width` |
| `_mediaqueries.scss` | `$small` (320px), `$smallL` (568px), `$medium` (769px), `$large` (1025px), `$xlarge` (1441px) |
| `_mixins.scss` | `useThemeText($light, $dark)`, `useThemeBg($light, $dark)`, `useThemeShadow(...)`, `elevate($value)` (extends `%elevation-N`) |
| `_animations.scss` | `useHighlight($color, $time, $mode)`, `useRotation($time, $mode)`, `$fast` (0.2s) |
| `_placeholders.scss` | `%flex-row-center`, `%flex-col-center` |
| `_classes.scss` | `.flex`, `.flex-col`, `.jc`, `.ac`, `.gap`, `.non-mobile` |
| `_notes.scss` | CSS custom props `--note-{C,Cs,D,Ds,E,F,Fs,G,Gs,A,Bb,B}` (HSL 30° steps) |
| `_app.scss` | `:root`, `body`, `h1`–`h3`, `.section.modes` |

## Barrel chain

```
theme/index.scss
 ├── values/_index.scss          (forwards all partials above)
 ├── app/style/_index.scss       (layout + components)
 │    ├── layout/style/_layout.scss
 │    └── components/style/_index.scss
 │         ├── header/_header.scss
 │         ├── armonicTable/_armonic-table.scss
 │         ├── field/_field.scss
 │         └── button/_back-button.scss
  └── modules/style/_index.scss   (forwards each module)
        ├── guitarra/style/_index.scss
        │    ├── _fretboard-header, _fretboard, _triads, _selectors
        │    ├── _positions, _scale-info, _chord-dict
        │    └── ../chord-dict/style/   ← sub-barrel
        │         └── _chord-dict-fretboard   ← .chord-dict-fretboard (210px, same height as main)
        ├── modes/style/_index.scss
        │    ├── _mode-header, _mode-table, _pentagram
        └── biblioteca/style/_index.scss
               ├── song/details/style/_index.scss
               │    ├── _dotted-menu, _song-header, _song-tablatures, _song-lyrics
               ├── song/form/style/_index.scss
               │    ├── _song-form, _song-form-basic-info, _song-form-lyrics, _song-form-tablature, _song-form-actions
               └── library/style/_index.scss
                    ├── _song-list-header, _song-filters, _song-list, _song-list-item
```

## SCSS conventions

- **Partial naming**: `_kebab-case.scss` (one per component, prefixed with underscore)
- **Selector naming**: BEM-like kebab-case (`.fretboard-container`, `.song-detail-header`, `.menu-dropdown`)
- **State classes**: `.active`, `.disabled`, `.open`, `.fretActive`, `.positionNote`, `.triadRoot`
- **Barrel**: every `style/` dir has `_index.scss` that `@forward`s all its partials
- **Component SCSS** lives in `style/` alongside the JSX file
- **`@use` path depth** varies: from `modules/biblioteca/song/form/style/` → `@use '../../../../../../theme/values' as *;` (6 levels up)
- **No inline `<style>` or JS style objects** — prefer CSS classes via `className`

## Notas

- `$fretboard-chord-dict-height` fue eliminado de `theme/values/_fretboard.scss` — el chord-dict fretboard ahora usa `$fretboard-height` (210px) para consistencia con el diapasón principal.
- Los botones de tipo de acorde (`.chord-dict-type-btn`) y voicing (`.chord-dict-voicing-btn`) comparten estilos unificados (igual que `.triad-btn`): `border-radius: 8px`, `hover: #2a2a2a`, `active: rgba(var(--primary-rgb), 0.1)`.

## When refactoring styles

1. Create `_component-name.scss` in the subfeature's `style/` dir
2. Add `@forward './component-name';` to the subfeature's `style/_index.scss`
3. Remove any style imports from the view file — views should NOT import SCSS
4. Verify the barrel chain is complete from subfeature → module → `theme/index.scss`

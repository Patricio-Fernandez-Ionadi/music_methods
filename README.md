# Music Methods v0.1.0

Aplicación educativa interactiva para explorar teoría musical en la guitarra. Enfocada en los **7 modos musicales**, el **diapasón interactivo** con tríadas, diccionario de acordes y posiciones CAGED, y un **cancionero** con letras y tablaturas.

---

## Secciones

### Funcional — `/funcional`

Explora los dos modos **tonales**: Jónico (mayor natural) y Eólico (menor natural). Cada modo incluye:

- **Cabecera** — nombre, secuencia de intervalos (T/S), alteraciones respecto a mayor/menor
- **Tabla armónica** — grados con calidad de acorde (M/m/dim), función emocional (+, -, x) y grados evitados/importantes
- **Tabla por tonalidades** — las 12 teclas con notas, tríada, nombre del acorde y relativo mayor/menor
- **Pentagrama** — representación visual de las notas en el pentagrama

### Modos — `/modos`

Los 5 modos **modales**: Dórico, Frigio, Lidio, Mixolidio y Locrio. Misma estructura de tarjeta que la sección Funcional.

### Guitarra — `/guitarra`

Diapasón interactivo de 6 cuerdas con múltiples herramientas:

- **Selector de tónica y modo** — cambia la escala y resalta las notas en el diapasón
- **Visualización de escala** — muestra las 7 notas coloreadas
- **Selector de tríadas** — 7 botones (I a VII) con nomenclatura inteligente de acordes. Al pulsar una tríada se resaltan sus notas en el diapasón con colores por función (fundamental, tercera, quinta)
- **Controles de posición CAGED** — 5 posiciones, permite alternar entre posiciones individuales o ver todas
- **Diccionario de acordes** — selecciona raíz y tipo (M, m, 7, m7, maj7, dim, sus4, sus2) para ver digitaciones reales en el diapasón
- **Voicings generados** — triadas cerradas (cuerdas GBE) + drop-2 (DGBE, ADGB) para acordes de 7ª + cejillas CAGED + voicings manuales abiertos

### Biblioteca — `/biblioteca`

Cancionero con letras y tablaturas:

- **Lista de canciones** — filtros por nombre, artista y tonalidad
- **Detalle de canción** — letras con acordes inline y tablaturas. Menú desplegable para editar o eliminar
- **Formulario** — crear o editar canciones con nombre, artista, tonalidad, letras (sintaxis `[Acorde]texto`) y tablaturas con plantilla de 6 cuerdas
- **Persistencia** — las canciones se guardan en localStorage

---

## Stack técnico

| Tecnología | Versión | Rol |
|-----------|---------|-----|
| React | 19.2.4 | UI framework |
| react-router-dom | 7.15.1 | Enrutamiento |
| Vite | 8.0.4 | Build tool / dev server |
| Sass | 1.99.0 | Preprocesador CSS |
| ESLint | 9.39.4 | Calidad de código |
| React Compiler | 1.0.0 | Memorización automática en compilación |

---

## Estructura del proyecto

```
src/
├── views/              ← Vistas-route (orquestadores delgados)
│   ├── biblioteca/     → /biblioteca/*
│   ├── funcional/      → /funcional
│   ├── modos/          → /modos
│   ├── guitarra/       → /guitarra
│   └── index.js        ← Barrel exports
├── modules/            ← Módulos de funcionalidad (lógica + componentes)
│   ├── biblioteca/     → Cancionero (hooks, library, song/details, song/form, utils)
│   ├── guitarra/       → Diapasón (context, hooks, data, utils, note, string,
│   │                     chord-dict, chord-dict/style, triads, selectors…)
│   └── modes/          → Modos (utils, mode-component, mode-table, pentagram)
├── app/                ← App shell
│   ├── components/     → Componentes reutilizables (Header, Field, BackButton…)
│   ├── context/        → Estado global (AppProvider)
│   ├── layout/         → MainLayout (Header + Outlet)
│   └── router/         → AppRouter (definiciones de rutas)
├── data/               → Datos estáticos (modos, escalas, diapasón, canciones)
└── theme/              → Valores SCSS (colores, tamaños, mixins, animaciones)
```

---

## Flujo de datos

```
AppProvider (tónica, modo, escala, tríadas, canciones)
  └─ MainLayout (Header + anidación)
       ├─ FuncionalView / ModosView → ModeComponent, ModeTable, Pentagram, ArmonicTable
       ├─ GuitarraView
       │    └─ FretboardProvider
       │         └─ FretboardView → Selectors, ScaleInfo, Triads,
       │              Fretboard, Positions, ChordDict
       └─ BibliotecaView → BibliotecaView, SongDetail, SongFormView
```

- **Estado global**: `AppContext` gestiona tónica, modo, escala derivada, tríadas y canciones
- **Estado del diapasón**: `FretboardContext` compone hooks especializados para tríadas, posiciones y diccionario de acordes
- **Persistencia**: Las canciones se guardan en `localStorage` bajo la clave `biblioteca-songs`

---

## Convenciones

- **Idioma**: toda la UI y el código están en español
- **Arquitectura**: `views/` son orquestadores delgados (~20-40 líneas); `modules/` contienen componentes atómicos con una exportación por archivo; `app/components/` tiene componentes compartidos
- **React Compiler**: el proyecto usa el compilador experimental de React para memorización automática
- **SCSS**: sistema modular con `@use`/`@forward`. Cadena de barril: componente → submódulo → módulo → tema
- **Datos**: Las escalas están precalculadas en `src/data/scales.js`. Las equivalencias enharmónicas se resuelven mediante el mapa `ENHARMONICS` en `src/data/fretboard.js`
- **Voicings**: Generación híbrida — datos manuales para voicings abiertos + cejillas CAGED generadas por fórmula + triadas cerradas (GBE) y drop-2 (DGBE, ADGB) generadas por intervalo, con filtro de span ≤ 5 trastes
- **Sin librerías externas de estado**: solo Context + hooks nativos

---

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Vista previa de la build
npm run lint         # Ejecutar ESLint
npm run docs         # Regenerar DOCS.md
```

---

## Licencia

Proyecto educativo de uso libre.

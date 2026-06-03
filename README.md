# Music Methods

Aplicación educativa interactiva para explorar teoría musical en la guitarra. Enfocada en los **7 modos musicales**, el **diapasón interactivo** con tríadas, extensiones, inversiones y posiciones CAGED, y un **cancionero** con letras y tablaturas.

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
- **Selector de tríadas** — 7 botones (I a VII) con nomenclatura inteligente de acordes. Al pulsar una tríada se resaltan sus notas en el diapasón con colores por función (fundamental, tercera, quinta, extensiones)
- **Controles de posición CAGED** — 5 posiciones, permite alternar entre posiciones individuales o ver todas
- **Controles de extensión** — añade extensiones a los acordes: 7, b7, 6, 9, 11, sus4, sus2
- **Controles de inversión** — selecciona inversiones: Fundamental, 1ra, 2da, 3ra
- **Visualización de acordes** — muestra voicings predefinidos sobre el diapasón

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
├── main.jsx                    # Punto de entrada
├── App.jsx                     # Componente raíz
├── router/
│   └── AppRouter.jsx           # Definición de rutas + AppProvider
├── context/
│   └── AppContext.jsx          # Estado global (tónica, modo, escala, tríadas, canciones)
├── data/
│   ├── index.js                # Barrel
│   ├── modes.js                # Definiciones de los 7 modos
│   ├── scales.js               # 84 escalas precalculadas (12 tónicas × 7 modos)
│   ├── fretboard.js            # Notas del diapasón, enharmónicos, posiciones CAGED
│   └── biblioteca.js           # Canciones iniciales
├── pages/
│   ├── FuncionalPage.jsx       # /funcional
│   ├── ModosPage.jsx           # /modos
│   ├── GuitarraPage.jsx        # /guitarra
│   └── BibliotecaPage.jsx      # /biblioteca (layout anidado)
├── features/
│   ├── modes/                  # Componentes de modos
│   │   ├── mode-component.jsx  # Tarjeta de modo
│   │   ├── mode-header.jsx     # Cabecera con intervalos y alteraciones
│   │   ├── mode-table.jsx      # Tabla de 12 tonalidades
│   │   ├── mode-view.jsx       # Vista combinada de todos los modos
│   │   └── pentagram.jsx       # Pentagrama musical
│   ├── fretboard/              # Componentes del diapasón
│   │   ├── context/            # FretboardContext
│   │   ├── hooks/              # useFretboardState, useTriadState, usePositionState,
│   │   │                       # useExtensionState, useInversionState
│   │   ├── data/               # chord-voicings.js (voicings predefinidos)
│   │   ├── fretboard-view.jsx  # Layout de la página guitarra
│   │   ├── fretboard.jsx       # Render del diapasón
│   │   ├── triads.jsx          # Selector de tríadas
│   │   ├── scale-info.jsx      # Información de escala
│   │   ├── selectors.jsx       # Selectores de modo y tónica
│   │   ├── position-controls.jsx
│   │   ├── extension-controls.jsx
│   │   └── inversion-controls.jsx
│   ├── biblioteca/             # Componentes del cancionero
│   │   ├── BibliotecaView.jsx
│   │   ├── SongDetail.jsx
│   │   └── SongFormView.jsx
│   └── style/                  # Estilos compartidos
├── components/
│   ├── header/                 # Navegación principal
│   └── armonicTable/           # Tabla armónica de grados
├── layouts/
│   └── MainLayout.jsx          # Layout compartido (header + scroll-to-anchor)
└── theme/
    └── values/                 # Variables Sass: colores, tamaños, notas, media queries
```

---

## Flujo de datos

```
AppProvider (tónica, modo, escala, tríadas, canciones)
  └─ MainLayout (Header + anidación)
       ├─ FuncionalPage / ModosPage → mode-component, mode-table, pentagram, armonic-table
       ├─ GuitarraPage
       │    └─ FretboardProvider
       │         └─ FretboardView → selectors, scale-info, triads,
       │              fretboard, position-controls, extension-controls, inversion-controls
       └─ BibliotecaPage → BibliotecaView, SongDetail, SongFormView
```

- **Estado global**: `AppContext` gestiona tónica, modo, escala derivada, tríadas y canciones
- **Estado del diapasón**: `FretboardContext` compone hooks especializados para tríadas, posiciones, extensiones e inversiones
- **Persistencia**: Las canciones se guardan en `localStorage` bajo la clave `biblioteca-songs`

---

## Comandos

```bash
npm install      # Instalar dependencias
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Vista previa de la build
npm run lint     # Ejecutar ESLint
```

---

## Convenciones

- **Idioma**: toda la UI y el código están en español
- **React Compiler**: el proyecto usa el compilador experimental de React para memorización automática
- **CSS**: Sass con módulo `@use`/`@forward`. Los colores de notas musicales son custom properties CSS con tonos HSL equiespaciados
- **Datos**: Las escalas están precalculadas en `src/data/scales.js`. Las equivalencias enharmónicas se resuelven mediante el mapa `ENHARMONICS` en `src/data/fretboard.js`
- **Sin librerías externas de estado**: solo Context + hooks nativos

---

## Licencia

Proyecto educativo de uso libre.

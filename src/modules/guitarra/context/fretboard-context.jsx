import { createContext, useContext } from 'react'
import { useApp } from '../../../app/context/app-context'
import { useFretboardState } from '../hooks/use-fretboard-state'
import { useChordDictionary } from '../hooks/use-chord-dictionary'
import { NOTES } from '../../../data'

const FretboardContext = createContext(null)

/** Mapea nombre de nota → nombre de CSS custom property definida en theme/values/_notes.scss.
 *  Usa 's' para sostenido (#) y 'b' para bemol. */
const NOTE_CSS_VARS = {
	C: '--note-C',
	'C#': '--note-Cs',
	D: '--note-D',
	'D#': '--note-Ds',
	E: '--note-E',
	F: '--note-F',
	'F#': '--note-Fs',
	G: '--note-G',
	'G#': '--note-Gs',
	A: '--note-A',
	Bb: '--note-Bb',
	B: '--note-B',
}

export function FretboardProvider({ children }) {
	const app = useApp()
	const fretboard = useFretboardState()
	const chordDict = useChordDictionary()

	const value = {
		...app,
		...fretboard,
		...chordDict,
		NOTE_CSS_VARS,
		NOTES,
	}

	return (
		<FretboardContext.Provider value={value}>
			{children}
		</FretboardContext.Provider>
	)
}

export function useFretboard() {
	const ctx = useContext(FretboardContext)
	if (!ctx) {
		throw new Error('useFretboard debe usarse dentro de FretboardProvider')
	}
	return ctx
}

export { NOTES }

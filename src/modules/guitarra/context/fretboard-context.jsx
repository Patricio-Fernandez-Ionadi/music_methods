import { createContext, useContext } from 'react'
import { useApp } from '../../../app/context/app-context'
import { useFretboardState } from '../hooks/use-fretboard-state'
import { useChordDictionary } from '../hooks/use-chord-dictionary'
import { NOTES } from '../../../data'
import { NOTE_CSS_VARS } from '../../../shared/utils/note-css-vars'

export { NOTE_CSS_VARS }

export const FretboardContext = createContext(null)

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

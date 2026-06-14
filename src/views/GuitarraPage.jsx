import { FretboardView } from '../modules/fretboard/fretboard-view'
import { FretboardProvider } from '../modules/fretboard/context/FretboardContext'

export const GuitarraPage = () => {
	return (
		<FretboardProvider>
			<FretboardView />
		</FretboardProvider>
	)
}

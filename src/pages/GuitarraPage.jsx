import { FretboardView } from '../features/fretboard/fretboard-view'
import { FretboardProvider } from '../features/fretboard/context/FretboardContext'

export const GuitarraPage = () => {
	return (
		<FretboardProvider>
			<FretboardView />
		</FretboardProvider>
	)
}

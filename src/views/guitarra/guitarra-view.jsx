import { FretboardView } from '../../modules/fretboard/fretboard-view'
import { FretboardProvider } from '../../modules/fretboard/context/fretboard-context'

export const GuitarraView = () => {
	return (
		<FretboardProvider>
			<FretboardView />
		</FretboardProvider>
	)
}

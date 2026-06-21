import { FretboardView } from '../../modules/guitarra/fretboard-view'
import { FretboardProvider } from '../../modules/guitarra/context/fretboard-context'

export const GuitarraView = () => {
	return (
		<FretboardProvider>
			<FretboardView />
		</FretboardProvider>
	)
}

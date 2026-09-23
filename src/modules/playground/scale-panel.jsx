import { useMemo } from 'react'
import { Fretboard } from '../../shared/components/fretboard/fretboard'
import { ScaleNotes } from '../../shared/components/scale-notes/scale-notes'
import {
	getScaleNotes,
	normalizeNote,
	CHROMATIC,
	noteToPitchClass,
} from '../../shared/utils/scale-utils'
import { NOTE_CSS_VARS } from '../../shared/utils/note-css-vars'

const HARMONIC_MINOR_INTERVALS = [2, 1, 2, 2, 1, 3, 3]

function buildHarmonicMinor(tonic) {
	const pc = noteToPitchClass(tonic)
	if (pc === -1) return []
	const notes = []
	let pos = 0
	for (const step of HARMONIC_MINOR_INTERVALS) {
		notes.push(CHROMATIC[(pos + pc) % 12])
		pos += step
	}
	return notes
}

export function ScalePanel({ tonic, modeId, modeName }) {
	const { currentScale, normalizedScale } = useMemo(() => {
		if (modeId === 'armonica') {
			const current = buildHarmonicMinor(tonic)
			return { currentScale: current, normalizedScale: current.map(normalizeNote) }
		}
		return getScaleNotes(tonic, modeId)
	}, [tonic, modeId])

	return (
		<div className='scale-panel'>
			<div className='scale-panel-header'>
				<h4>Escala para la melodía</h4>
				<span className='scale-panel-key'>
					{tonic} {modeName}
				</span>
			</div>
			{currentScale.length > 0 ? (
				<>
					<ScaleNotes scale={currentScale} NOTE_CSS_VARS={NOTE_CSS_VARS} />
					<Fretboard
						containerClass='fretboard-container'
						normalizedScale={normalizedScale}
						currentScale={currentScale}
						showScaleTonic
						NOTE_CSS_VARS={NOTE_CSS_VARS}
					/>
				</>
			) : (
				<p className='scale-panel-empty'>Escala no disponible</p>
			)}
		</div>
	)
}
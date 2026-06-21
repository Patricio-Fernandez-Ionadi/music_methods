import { CHORD_TYPES } from './data/chord-dictionary'
import { Field } from '../../app/components/field/field'
import { ChordDictFretboard } from './chord-dict/chord-dict-fretboard'

/**
 * ChordDict — Selector de acordes del diccionario.
 */
export function ChordDict({
	activeChordRoot,
	activeChordType,
	selectChord,
	setVoicing,
	availableVoicings,
	activeVoicing,
	NOTES,
	chordTypeKeys,
}) {
	return (
		<Field label='Diccionario de acordes'>
			<div className='chord-dict'>
				<div className='chord-dict-selectors'>
					<select
						className='chord-dict-select'
						value={activeChordRoot ?? ''}
						onChange={(e) => {
							const root = e.target.value
							if (root && activeChordType) selectChord(root, activeChordType)
						}}
					>
						<option value='' disabled>Raíz</option>
						{NOTES.map((n) => (
							<option key={n} value={n}>{n}</option>
						))}
					</select>

					<select
						className='chord-dict-select'
						value={activeChordType ?? ''}
						onChange={(e) => {
							const type = e.target.value
							if (type && activeChordRoot) selectChord(activeChordRoot, type)
							else if (type) selectChord('C', type)
						}}
					>
						<option value='' disabled>Tipo</option>
						{chordTypeKeys.map((key) => (
							<option key={key} value={key}>{CHORD_TYPES[key].label}</option>
						))}
					</select>
				</div>

				{availableVoicings.length > 1 && (
					<div className='chord-dict-voicings'>
						{availableVoicings.map((voicing, vi) => (
							<button
								key={vi}
								className={`chord-dict-voicing-btn${activeVoicing === voicing ? ' active' : ''}`}
								onClick={() => setVoicing(vi)}
							>
								{voicing.name}
							</button>
						))}
					</div>
				)}

				<ChordDictFretboard activeVoicing={activeVoicing} />
			</div>
		</Field>
	)
}

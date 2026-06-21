import { CHORD_TYPES } from './data/chord-dictionary'
import { Field } from '../../app/components/field/field'
import { ChordDictFretboard } from './chord-dict/chord-dict-fretboard'

/**
 * ChordDict — Selector de acordes del diccionario.
 *
 * Props (inyectadas desde el hook useChordDictionary):
 *   activeChordRoot  → raíz actual (o null)
 *   activeChordType  → tipo actual (o null)
 *   activeVoicingIdx → índice de digitación activa
 *   selectChord(root, type)  → seleccionar acorde
 *   clearChord()             → limpiar selección
 *   setVoicing(idx)           → cambiar digitación
 *   nextVoicing()             → siguiente digitación
 *   availableVoicings         → digitaciones disponibles
 *   activeVoicing             → digitación activa
 *   hasSelection              → booleano
 *   chordName                 → nombre del acorde activo
 *   NOTES                     → array de 12 notas
 *   chordTypeKeys             → claves de CHORD_TYPES
 */
export function ChordDict({
	activeChordRoot,
	activeChordType,
	activeVoicingIdx,
	selectChord,
	clearChord,
	setVoicing,
	nextVoicing,
	availableVoicings,
	activeVoicing,
	hasSelection,
	chordName,
	NOTES,
	chordTypeKeys,
}) {
	return (
		<Field label='Diccionario de acordes'>
			<div className='chord-dict'>
				{/* Selector de raíz + tipo */}
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

				{/* Resultado: nombre del acorde + selector de digitación */}
				{hasSelection && (
					<div className='chord-dict-result'>
						<button
							className='chord-dict-clear'
							onClick={clearChord}
							title='Limpiar selección'
						>
							✕
						</button>
						<span className='chord-dict-name'>{chordName}</span>

						{availableVoicings.length > 1 && (
							<div className='chord-dict-voicings'>
								<button
									className='chord-dict-voicing-btn'
									onClick={nextVoicing}
									title='Siguiente digitación'
								>
									{activeVoicing?.name ?? ''} ({activeVoicingIdx + 1}/{availableVoicings.length})
								</button>
							</div>
						)}
					</div>
				)}

				{/* Botón rápido para seleccionar desde el tipo */}
				{!hasSelection && (
					<div className='chord-dict-quick'>
						{chordTypeKeys.slice(0, 6).map((key) => (
							<button
								key={key}
								className='chord-dict-quick-btn'
								onClick={() => selectChord('C', key)}
							>
								{CHORD_TYPES[key].label}
							</button>
						))}
					</div>
				)}

				<ChordDictFretboard activeVoicing={activeVoicing} />
			</div>
		</Field>
	)
}

import { useState } from 'react'
import { useProgression } from '../../modules/playground/hooks/use-progression'
import { ProgressionSelector } from '../../modules/playground/progression-selector'
import { ProgressionDisplay } from '../../modules/playground/progression-display'
import { FretboardPanel } from '../../modules/playground/fretboard-panel'
import { KeyAnalyzer } from '../../modules/playground/key-analyzer'
import { SaveDialog } from '../../modules/playground/save-dialog'
import { SavedList } from '../../modules/playground/saved-list'

export const PlaygroundView = () => {
	const {
		chords, selectedIndex, displayMode, keyAnalysis, savedProgressions,
		transposeMode,
		selectChord, addChord, removeChord, setChord,
		loadPreset, loadProgression, toggleDisplayMode,
		saveProgression, deleteProgression,
		transposeTo, toggleTransposeMode,
	} = useProgression()

	const [showSave, setShowSave] = useState(false)

	return (
		<div className='playground-view' id='playground'>
			<h2>Playground de Progresiones</h2>

			<ProgressionSelector onLoad={loadPreset} />

			<div className='playground-main'>
				<div className='playground-left'>
					<div className='playground-controls'>
						<button
							className={`playground-mode-btn${displayMode === 'individual' ? ' active' : ''}`}
							onClick={() => displayMode !== 'individual' && toggleDisplayMode()}
						>
							Individual
						</button>
						<button
							className={`playground-mode-btn${displayMode === 'all' ? ' active' : ''}`}
							onClick={() => displayMode !== 'all' && toggleDisplayMode()}
						>
							Todos
						</button>
						<button
							className='playground-save-btn'
							onClick={() => setShowSave(true)}
						>
							Guardar
						</button>
					</div>

					<ProgressionDisplay
						chords={chords}
						selectedIndex={selectedIndex}
						keyAnalysis={keyAnalysis}
						onSelect={selectChord}
						onSet={setChord}
						onRemove={removeChord}
						onAdd={addChord}
					/>

					<FretboardPanel
						chords={chords}
						selectedIndex={selectedIndex}
						displayMode={displayMode}
						onSelect={selectChord}
					/>

					<KeyAnalyzer
						keyAnalysis={keyAnalysis}
						chords={chords}
						transposeMode={transposeMode}
						transposeTo={transposeTo}
						toggleTransposeMode={toggleTransposeMode}
					/>
				</div>

				<div className='playground-right'>
					<SavedList
						savedProgressions={savedProgressions}
						onLoad={(prog) => loadProgression(prog.chords)}
						onDelete={deleteProgression}
					/>
				</div>
			</div>

			{showSave && (
				<SaveDialog
					onSave={saveProgression}
					onClose={() => setShowSave(false)}
				/>
			)}
		</div>
	)
}

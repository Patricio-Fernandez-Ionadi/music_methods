import { CHROMATIC as NOTES } from '../../shared/utils/scale-utils'
import { CHORD_TYPES } from '../../shared/data/chord-dictionary'

const TYPE_KEYS = Object.keys(CHORD_TYPES)

export function ChordPicker({ chord, onChange, onRemove }) {
	return (
		<div className='chord-picker'>
			<select
				className='chord-picker-root'
				value={chord.root}
				onChange={(e) => onChange({ ...chord, root: e.target.value })}
			>
				{NOTES.map((n) => (
					<option key={n} value={n}>{n}</option>
				))}
			</select>
			<div className='chord-picker-types'>
				{TYPE_KEYS.map((key) => (
					<button
						key={key}
						className={`chord-picker-type-btn${chord.type === key ? ' active' : ''}`}
						onClick={() => onChange({ ...chord, type: key })}
					>
						{CHORD_TYPES[key].short || 'M'}
					</button>
				))}
			</div>
			{onRemove && (
				<button className='chord-picker-remove' onClick={onRemove}>
					x
				</button>
			)}
		</div>
	)
}

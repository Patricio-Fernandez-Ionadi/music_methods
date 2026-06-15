import { ENHARMONICS } from '../../../data'

function chordSuffix(type) {
	if (type === 'm') return 'm'
	if (type === 'dim') return 'dim'
	return ''
}

export function buildChordName(root, type, extensions, inversion) {
	const base = chordSuffix(type)
	const extOrder = ['sus4', 'sus2', 'b7', '7', '6', '9', '11']
	const active = extOrder.filter((e) => extensions.includes(e))

	let name

	if (active.length === 0) {
		name = `${root}${base}`
	} else {
		const first = active[0]

		if (first === 'sus4' || first === 'sus2') {
			name = `${root}${first}`
		} else {
			let suffix = base

			for (const ext of active) {
				if (ext === 'b7') {
					if (type === 'dim') {
						suffix = 'm7b5'
					} else {
						suffix += '7'
					}
				} else if (ext === '7') {
					suffix += 'maj7'
				} else if (ext === '6') {
					suffix += '6'
				} else if (ext === '9') {
					if (extensions.includes('b7') || extensions.includes('7')) {
						suffix += '9'
					} else {
						suffix += 'add9'
					}
				} else if (ext === '11') {
					if (extensions.includes('b7') || extensions.includes('7')) {
						suffix += '11'
					} else {
						suffix += 'add11'
					}
				}
			}

			name = `${root}${suffix}`
		}
	}

	if (inversion > 0) {
		const invLabels = ['', '1ra inv.', '2da inv.', '3ra inv.']
		name += ` (${invLabels[inversion]})`
	}

	return name
}

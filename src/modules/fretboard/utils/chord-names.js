import { ENHARMONICS } from '../../../data'

function chordSuffix(type) {
	if (type === 'm') return 'm'
	if (type === 'dim') return 'dim'
	return ''
}

export function buildChordName(root, type, extensions) {
	const base = chordSuffix(type)
	const extOrder = ['sus4', 'sus2', 'b7', '7', '6', '9', '11']
	const active = extOrder.filter((e) => extensions.includes(e))

	if (active.length === 0) {
		return `${root}${base}`
	}

	const first = active[0]

	if (first === 'sus4' || first === 'sus2') {
		return `${root}${first}`
	}

	let suffix = base

	for (const ext of active) {
		if (ext === 'b7') {
			suffix = type === 'dim' ? 'm7b5' : `${suffix}7`
		} else if (ext === '7') {
			suffix += 'maj7'
		} else if (ext === '6') {
			suffix += '6'
		} else if (ext === '9') {
			suffix += (extensions.includes('b7') || extensions.includes('7')) ? '9' : 'add9'
		} else if (ext === '11') {
			suffix += (extensions.includes('b7') || extensions.includes('7')) ? '11' : 'add11'
		}
	}

	return `${root}${suffix}`
}

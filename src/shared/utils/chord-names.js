function chordSuffix(type) {
	if (type === 'm') return 'm'
	if (type === 'dim') return 'dim'
	return ''
}

export function buildChordName(root, type) {
	return `${root}${chordSuffix(type)}`
}

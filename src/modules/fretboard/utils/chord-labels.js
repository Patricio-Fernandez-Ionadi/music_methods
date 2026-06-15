export function getChordNoteLabel(note, root, third, fifth, extensions) {
	if (note === root) return 'root'
	if (note === third) return 'third'
	if (note === fifth) return 'fifth'
	for (const [extKey, extNote] of Object.entries(extensions)) {
		if (note === extNote) return extKey
	}
	return null
}

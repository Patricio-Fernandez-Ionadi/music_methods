export function getChordNoteLabel(note, root, third, fifth) {
	if (note === root) return 'root'
	if (note === third) return 'third'
	if (note === fifth) return 'fifth'
	return null
}

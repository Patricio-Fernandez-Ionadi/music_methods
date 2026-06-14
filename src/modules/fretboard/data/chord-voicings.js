export const CHORD_VOICINGS = {
	jonico: {
		1: {
			name: 'E',
			rootString: 'E',
			notes: [
				{ string: 'E', fretOffset: 0, degree: 1 },
				{ string: 'A', fretOffset: 2, degree: 5 },
				{ string: 'D', fretOffset: 2, degree: 1 },
				{ string: 'G', fretOffset: 1, degree: 3 },
				{ string: 'B', fretOffset: 0, degree: 5 },
				{ string: 'e', fretOffset: 0, degree: 1 },
			],
		},
		2: {
			name: 'G',
			rootString: 'E',
			notes: [
				{ string: 'E', fretOffset: 0, degree: 1 },
				{ string: 'A', fretOffset: -1, degree: 3 },
				{ string: 'D', fretOffset: -3, degree: 5 },
				{ string: 'G', fretOffset: -3, degree: 1 },
				{ string: 'B', fretOffset: -3, degree: 3 },
				{ string: 'e', fretOffset: 0, degree: 1 },
			],
		},
		3: {
			name: 'C',
			rootString: 'A',
			notes: [
				{ string: 'A', fretOffset: 0, degree: 1 },
				{ string: 'D', fretOffset: -1, degree: 3 },
				{ string: 'G', fretOffset: -3, degree: 5 },
				{ string: 'B', fretOffset: -2, degree: 1 },
				{ string: 'e', fretOffset: -3, degree: 3 },
			],
		},
		4: {
			name: 'A',
			rootString: 'A',
			notes: [
				{ string: 'A', fretOffset: 0, degree: 1 },
				{ string: 'D', fretOffset: 2, degree: 5 },
				{ string: 'G', fretOffset: 2, degree: 1 },
				{ string: 'B', fretOffset: 2, degree: 3 },
				{ string: 'e', fretOffset: 0, degree: 5 },
				{ string: 'E', fretOffset: 0, degree: 5 },
			],
		},
		5: {
			name: 'D',
			rootString: 'D',
			notes: [
				{ string: 'D', fretOffset: 0, degree: 1 },
				{ string: 'G', fretOffset: 2, degree: 5 },
				{ string: 'B', fretOffset: 3, degree: 1 },
				{ string: 'e', fretOffset: 2, degree: 3 },
			],
		},
	},
	eolico: {
		1: {
			name: 'Em',
			rootString: 'E',
			notes: [
				{ string: 'E', fretOffset: 0, degree: 1 },
				{ string: 'A', fretOffset: 2, degree: 5 },
				{ string: 'D', fretOffset: 2, degree: 1 },
				{ string: 'G', fretOffset: 0, degree: 'b3' },
				{ string: 'B', fretOffset: 0, degree: 5 },
				{ string: 'e', fretOffset: 0, degree: 1 },
			],
		},
		2: {
			name: 'Gm',
			rootString: 'E',
			notes: [
				{ string: 'E', fretOffset: 0, degree: 1 },
				{ string: 'A', fretOffset: -2, degree: 'b3' },
				{ string: 'D', fretOffset: -3, degree: 5 },
				{ string: 'G', fretOffset: -3, degree: 1 },
				{ string: 'B', fretOffset: 0, degree: 5 },
				{ string: 'e', fretOffset: 0, degree: 1 },
			],
		},
		3: {
			name: 'Cm',
			rootString: 'A',
			notes: [
				{ string: 'A', fretOffset: 0, degree: 1 },
				{ string: 'D', fretOffset: -2, degree: 'b3' },
				{ string: 'G', fretOffset: -3, degree: 5 },
				{ string: 'B', fretOffset: -2, degree: 1 },
				{ string: 'e', fretOffset: -3, degree: 'b3' },
			],
		},
		4: {
			name: 'Am',
			rootString: 'A',
			notes: [
				{ string: 'A', fretOffset: 0, degree: 1 },
				{ string: 'D', fretOffset: 2, degree: 5 },
				{ string: 'G', fretOffset: 2, degree: 1 },
				{ string: 'B', fretOffset: 1, degree: 'b3' },
				{ string: 'e', fretOffset: 0, degree: 5 },
				{ string: 'E', fretOffset: 0, degree: 5 },
			],
		},
		5: {
			name: 'Dm',
			rootString: 'D',
			notes: [
				{ string: 'D', fretOffset: 0, degree: 1 },
				{ string: 'G', fretOffset: 2, degree: 5 },
				{ string: 'B', fretOffset: 2, degree: 1 },
				{ string: 'e', fretOffset: 1, degree: 'b3' },
			],
		},
	},
}

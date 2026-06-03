export const STRING_NOTES = {
	e: [
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'Bb',
		'B',
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'Bb',
		'B',
	],
	b: [
		'B',
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'Bb',
		'B',
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
	],
	g: [
		'G',
		'G#',
		'A',
		'Bb',
		'B',
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'Bb',
		'B',
		'C',
		'C#',
		'D',
	],
	D: [
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'Bb',
		'B',
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
	],
	A: [
		'A',
		'Bb',
		'B',
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'Bb',
		'B',
		'C',
		'C#',
		'D',
		'D#',
		'E',
	],
	E: [
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'Bb',
		'B',
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'Bb',
		'B',
	],
}

export const STRING_INDEXES = {
	e: 0,
	b: 20,
	g: 40,
	D: 60,
	A: 80,
	E: 100,
}
export const ENHARMONICS = {
	// Dobles sostenidos → naturales
	'F##': 'G',
	'C##': 'D',
	'D##': 'E',
	'G##': 'A',
	'A##': 'B',
	// Dobles bemoles → naturales
	Ebb: 'D',
	Bbb: 'A',
	// Bemoles → sostenidos (STRING_NOTES usa # salvo Bb)
	Db: 'C#',
	Eb: 'D#',
	Gb: 'F#',
	Ab: 'G#',
	// Sostenido → bemol (STRING_NOTES tiene Bb no A#)
	'A#': 'Bb',
	// Casos especiales
	Cb: 'B',
	Fb: 'E',
	'E#': 'F',
	'B#': 'C',
}

export const NOTES = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'Bb',
	'B',
]

export const POSITIONS = {
	jonico: {
		1: [
			{ offset: -1, degree: 7 },
			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },

			{ offset: -21, degree: 3 },
			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -41, degree: 6 },
			{ offset: -39, degree: 7 },
			{ offset: -38, degree: 1 },

			{ offset: -61, degree: 2 },
			{ offset: -59, degree: 3 },
			{ offset: -58, degree: 4 },

			{ offset: -80, degree: 5 },
			{ offset: -78, degree: 6 },

			{ offset: -101, degree: 7 },
			{ offset: -100, degree: 1 },
			{ offset: -98, degree: 2 },
		],
		2: [
			{ offset: -3, degree: 6 },
			{ offset: -1, degree: 7 },
			{ offset: 0, degree: 1 },

			{ offset: -23, degree: 2 },
			{ offset: -21, degree: 3 },
			{ offset: -20, degree: 4 },

			{ offset: -43, degree: 5 },
			{ offset: -41, degree: 6 },

			{ offset: -64, degree: 7 },
			{ offset: -63, degree: 1 },
			{ offset: -61, degree: 2 },

			{ offset: -83, degree: 3 },
			{ offset: -82, degree: 4 },
			{ offset: -80, degree: 5 },

			{ offset: -103, degree: 6 },
			{ offset: -101, degree: 7 },
			{ offset: -100, degree: 1 },
		],
		3: [
			{ offset: 20, degree: 5 },
			{ offset: 22, degree: 6 },

			{ offset: -1, degree: 7 },
			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },

			{ offset: -21, degree: 3 },
			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -41, degree: 6 },
			{ offset: -39, degree: 7 },
			{ offset: -38, degree: 1 },

			{ offset: -60, degree: 2 },
			{ offset: -58, degree: 3 },
			{ offset: -57, degree: 4 },

			{ offset: -80, degree: 5 },
			{ offset: -78, degree: 6 },
		],
		4: [
			{ offset: 17, degree: 3 },
			{ offset: 18, degree: 4 },
			{ offset: 20, degree: 5 },

			{ offset: -3, degree: 6 },
			{ offset: -1, degree: 7 },
			{ offset: 0, degree: 1 },

			{ offset: -23, degree: 2 },
			{ offset: -21, degree: 3 },
			{ offset: -20, degree: 4 },

			{ offset: -43, degree: 5 },
			{ offset: -41, degree: 6 },

			{ offset: -63, degree: 7 },
			{ offset: -62, degree: 1 },
			{ offset: -60, degree: 2 },

			{ offset: -83, degree: 3 },
			{ offset: -82, degree: 4 },
			{ offset: -80, degree: 5 },
		],
		5: [
			{ offset: 40, degree: 2 },
			{ offset: 42, degree: 3 },
			{ offset: 43, degree: 4 },

			{ offset: 20, degree: 5 },
			{ offset: 22, degree: 6 },

			{ offset: -1, degree: 7 },
			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },

			{ offset: -21, degree: 3 },
			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -40, degree: 6 },
			{ offset: -38, degree: 7 },
			{ offset: -39, degree: 1 },

			{ offset: -60, degree: 2 },
			{ offset: -58, degree: 3 },
			{ offset: -57, degree: 4 },
		],
	},
	dorico: {
		1: [
			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -41, degree: 6 },
			{ offset: -40, degree: 1 },
			{ offset: -38, degree: 2 },

			{ offset: -58, degree: 3 },
			{ offset: -60, degree: 4 },
			{ offset: -61, degree: 5 },

			{ offset: -80, degree: 6 },
			{ offset: -78, degree: 7 },
			{ offset: -79, degree: 1 },

			{ offset: -100, degree: 2 },
			{ offset: -98, degree: 3 },
			{ offset: -97, degree: 4 },
		],
		2: [
			{ offset: -3, degree: 6 },
			{ offset: -2, degree: 1 },
			{ offset: 0, degree: 2 },

			{ offset: -23, degree: 3 },
			{ offset: -22, degree: 4 },
			{ offset: -20, degree: 5 },

			{ offset: -43, degree: 6 },
			{ offset: -41, degree: 7 },
			{ offset: -40, degree: 1 },

			{ offset: -63, degree: 2 },
			{ offset: -61, degree: 3 },
			{ offset: -60, degree: 4 },

			{ offset: -82, degree: 5 },
			{ offset: -80, degree: 6 },

			{ offset: -103, degree: 7 },
			{ offset: -102, degree: 1 },
			{ offset: -100, degree: 2 },
		],
		3: [
			{ offset: 20, degree: 5 },
			{ offset: 22, degree: 6 },
			{ offset: 23, degree: 7 },

			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -41, degree: 6 },
			{ offset: -40, degree: 7 },
			{ offset: -38, degree: 1 },

			{ offset: -60, degree: 2 },
			{ offset: -59, degree: 3 },
			{ offset: -57, degree: 4 },

			{ offset: -80, degree: 5 },
			{ offset: -78, degree: 6 },
			{ offset: -77, degree: 7 },
		],
		4: [
			{ offset: 18, degree: 4 },
			{ offset: 20, degree: 5 },

			{ offset: -3, degree: 6 },
			{ offset: -2, degree: 7 },
			{ offset: 0, degree: 1 },

			{ offset: -23, degree: 3 },
			{ offset: -22, degree: 4 },
			{ offset: -20, degree: 5 },

			{ offset: -43, degree: 6 },
			{ offset: -41, degree: 7 },
			{ offset: -40, degree: 1 },

			{ offset: -62, degree: 2 },
			{ offset: -59, degree: 3 },
			{ offset: -60, degree: 4 },

			{ offset: -82, degree: 5 },
			{ offset: -80, degree: 6 },
		],
		5: [
			{ offset: 40, degree: 2 },
			{ offset: 41, degree: 3 },
			{ offset: 43, degree: 4 },

			{ offset: 23, degree: 7 },
			{ offset: 22, degree: 6 },
			{ offset: 20, degree: 5 },

			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -40, degree: 6 },
			{ offset: -39, degree: 7 },
			{ offset: -37, degree: 1 },

			{ offset: -60, degree: 2 },
			{ offset: -59, degree: 3 },
			{ offset: -57, degree: 4 },
		],
	},
	frigio: {
		1: [
			{ offset: 0, degree: 1 },
			{ offset: 1, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 6 },
			{ offset: -18, degree: 7 },
			{ offset: -17, degree: 1 },

			{ offset: -40, degree: 2 },
			{ offset: -38, degree: 3 },
			{ offset: -37, degree: 4 },

			{ offset: -60, degree: 5 },
			{ offset: -58, degree: 6 },

			{ offset: -80, degree: 7 },
			{ offset: -79, degree: 1 },
			{ offset: -77, degree: 2 },

			{ offset: -100, degree: 3 },
			{ offset: -99, degree: 4 },
			{ offset: -97, degree: 5 },
		],
		2: [
			{ offset: -2, degree: 7 },
			{ offset: 0, degree: 1 },
			{ offset: 1, degree: 2 },

			{ offset: -22, degree: 3 },
			{ offset: -20, degree: 4 },

			{ offset: -43, degree: 5 },
			{ offset: -42, degree: 6 },
			{ offset: -40, degree: 7 },

			{ offset: -61, degree: 1 },
			{ offset: -62, degree: 2 },
			{ offset: -60, degree: 3 },

			{ offset: -82, degree: 4 },
			{ offset: -80, degree: 5 },
			{ offset: -79, degree: 6 },

			{ offset: -102, degree: 7 },
			{ offset: -100, degree: 1 },
			{ offset: -99, degree: 2 },
		],
		3: [
			{ offset: 20, degree: 5 },
			{ offset: 21, degree: 6 },
			{ offset: 23, degree: 7 },

			{ offset: 0, degree: 1 },
			{ offset: 1, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },
			{ offset: -17, degree: 6 },

			{ offset: -40, degree: 7 },
			{ offset: -38, degree: 1 },
			{ offset: -37, degree: 2 },

			{ offset: -59, degree: 3 },
			{ offset: -57, degree: 4 },

			{ offset: -80, degree: 5 },
			{ offset: -79, degree: 6 },
			{ offset: -77, degree: 7 },
		],
		4: [
			{ offset: 18, degree: 4 },
			{ offset: 20, degree: 5 },
			{ offset: 21, degree: 6 },

			{ offset: -2, degree: 7 },
			{ offset: 0, degree: 1 },
			{ offset: 1, degree: 2 },

			{ offset: -22, degree: 3 },
			{ offset: -20, degree: 4 },

			{ offset: -43, degree: 5 },
			{ offset: -42, degree: 6 },
			{ offset: -40, degree: 7 },

			{ offset: -62, degree: 1 },
			{ offset: -61, degree: 2 },
			{ offset: -59, degree: 3 },

			{ offset: -82, degree: 4 },
			{ offset: -80, degree: 5 },
			{ offset: -79, degree: 6 },
		],
		5: [
			{ offset: 41, degree: 3 },
			{ offset: 43, degree: 4 },

			{ offset: 20, degree: 5 },
			{ offset: 21, degree: 6 },
			{ offset: 23, degree: 7 },

			{ offset: 0, degree: 1 },
			{ offset: 1, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },
			{ offset: -17, degree: 6 },

			{ offset: -39, degree: 7 },
			{ offset: -37, degree: 1 },
			{ offset: -36, degree: 2 },

			{ offset: -59, degree: 3 },
			{ offset: -57, degree: 4 },
		],
	},
	lidio: {
		1: [
			{ offset: -1, degree: 7 },
			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },

			{ offset: -21, degree: 3 },
			{ offset: -19, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -41, degree: 6 },
			{ offset: -38, degree: 7 },
			{ offset: -39, degree: 1 },

			{ offset: -61, degree: 2 },
			{ offset: -59, degree: 3 },

			{ offset: -81, degree: 4 },
			{ offset: -80, degree: 5 },
			{ offset: -78, degree: 6 },

			{ offset: -101, degree: 7 },
			{ offset: -100, degree: 1 },
			{ offset: -98, degree: 2 },
		],
		2: [
			{ offset: -3, degree: 6 },
			{ offset: -1, degree: 7 },
			{ offset: 0, degree: 1 },

			{ offset: -23, degree: 2 },
			{ offset: -21, degree: 3 },

			{ offset: -44, degree: 4 },
			{ offset: -43, degree: 5 },
			{ offset: -41, degree: 6 },

			{ offset: -64, degree: 7 },
			{ offset: -63, degree: 1 },
			{ offset: -61, degree: 2 },

			{ offset: -83, degree: 3 },
			{ offset: -81, degree: 4 },
			{ offset: -80, degree: 5 },

			{ offset: -103, degree: 6 },
			{ offset: -101, degree: 7 },
			{ offset: -100, degree: 1 },
		],
		3: [
			{ offset: 19, degree: 4 },
			{ offset: 20, degree: 5 },
			{ offset: 22, degree: 6 },

			{ offset: -1, degree: 7 },
			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },

			{ offset: -21, degree: 3 },
			{ offset: -19, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -41, degree: 6 },
			{ offset: -39, degree: 7 },
			{ offset: -38, degree: 1 },

			{ offset: -60, degree: 2 },
			{ offset: -58, degree: 3 },

			{ offset: -81, degree: 4 },
			{ offset: -80, degree: 5 },
			{ offset: -78, degree: 6 },
		],
		4: [
			{ offset: 17, degree: 3 },
			{ offset: 19, degree: 4 },
			{ offset: 20, degree: 5 },

			{ offset: -3, degree: 6 },
			{ offset: -1, degree: 7 },
			{ offset: 0, degree: 1 },

			{ offset: -23, degree: 2 },
			{ offset: -21, degree: 3 },

			{ offset: -44, degree: 4 },
			{ offset: -43, degree: 5 },
			{ offset: -41, degree: 6 },

			{ offset: -63, degree: 7 },
			{ offset: -62, degree: 1 },
			{ offset: -60, degree: 2 },

			{ offset: -83, degree: 3 },
			{ offset: -81, degree: 4 },
			{ offset: -80, degree: 5 },
		],
		5: [
			{ offset: 40, degree: 2 },
			{ offset: 42, degree: 3 },

			{ offset: 19, degree: 4 },
			{ offset: 20, degree: 5 },
			{ offset: 22, degree: 6 },

			{ offset: -1, degree: 7 },
			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },

			{ offset: -21, degree: 3 },
			{ offset: -19, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -40, degree: 6 },
			{ offset: -38, degree: 7 },
			{ offset: -37, degree: 1 },

			{ offset: -60, degree: 2 },
			{ offset: -58, degree: 3 },
		],
	},
	mixolidio: {
		1: [
			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },

			{ offset: -21, degree: 3 },
			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -41, degree: 6 },
			{ offset: -40, degree: 7 },
			{ offset: -38, degree: 1 },

			{ offset: -61, degree: 2 },
			{ offset: -59, degree: 3 },
			{ offset: -58, degree: 4 },

			{ offset: -80, degree: 5 },
			{ offset: -78, degree: 6 },
			{ offset: -77, degree: 7 },

			{ offset: -100, degree: 1 },
			{ offset: -98, degree: 2 },
		],
		2: [
			{ offset: -3, degree: 6 },
			{ offset: -2, degree: 7 },
			{ offset: 0, degree: 1 },

			{ offset: -23, degree: 2 },
			{ offset: -21, degree: 3 },
			{ offset: -20, degree: 4 },

			{ offset: -43, degree: 5 },
			{ offset: -41, degree: 6 },
			{ offset: -40, degree: 7 },

			{ offset: -63, degree: 1 },
			{ offset: -61, degree: 2 },

			{ offset: -83, degree: 3 },
			{ offset: -82, degree: 4 },
			{ offset: -80, degree: 5 },

			{ offset: -103, degree: 6 },
			{ offset: -102, degree: 7 },
			{ offset: -100, degree: 1 },
		],
		3: [
			{ offset: 20, degree: 5 },
			{ offset: 22, degree: 6 },
			{ offset: 23, degree: 7 },

			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },

			{ offset: -21, degree: 3 },
			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -41, degree: 6 },
			{ offset: -40, degree: 7 },
			{ offset: -38, degree: 1 },

			{ offset: -60, degree: 2 },
			{ offset: -58, degree: 3 },
			{ offset: -57, degree: 4 },

			{ offset: -80, degree: 5 },
			{ offset: -78, degree: 6 },
			{ offset: -77, degree: 7 },
		],
		4: [
			{ offset: 20, degree: 5 },
			{ offset: 18, degree: 4 },
			{ offset: 17, degree: 3 },

			{ offset: -3, degree: 6 },
			{ offset: -2, degree: 7 },
			{ offset: 0, degree: 1 },

			{ offset: -23, degree: 2 },
			{ offset: -21, degree: 3 },
			{ offset: -20, degree: 4 },

			{ offset: -43, degree: 5 },
			{ offset: -41, degree: 6 },
			{ offset: -40, degree: 7 },

			{ offset: -62, degree: 1 },
			{ offset: -60, degree: 2 },

			{ offset: -83, degree: 3 },
			{ offset: -82, degree: 4 },
			{ offset: -80, degree: 5 },
		],
		5: [
			{ offset: 40, degree: 2 },
			{ offset: 42, degree: 3 },
			{ offset: 43, degree: 4 },

			{ offset: 20, degree: 5 },
			{ offset: 22, degree: 6 },
			{ offset: 23, degree: 7 },

			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },

			{ offset: -21, degree: 3 },
			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },

			{ offset: -40, degree: 6 },
			{ offset: -39, degree: 7 },
			{ offset: -37, degree: 1 },

			{ offset: -60, degree: 2 },
			{ offset: -58, degree: 3 },
			{ offset: -57, degree: 4 },
		],
	},
	eolico: {
		1: [
			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },
			{ offset: -17, degree: 6 },

			{ offset: -40, degree: 7 },
			{ offset: -38, degree: 1 },

			{ offset: -61, degree: 2 },
			{ offset: -60, degree: 3 },
			{ offset: -58, degree: 4 },

			{ offset: -80, degree: 5 },
			{ offset: -79, degree: 6 },
			{ offset: -77, degree: 7 },

			{ offset: -100, degree: 1 },
			{ offset: -98, degree: 2 },
			{ offset: -97, degree: 3 },
		],
		2: [
			{ offset: -2, degree: 7 },
			{ offset: 0, degree: 1 },

			{ offset: -23, degree: 2 },
			{ offset: -22, degree: 3 },
			{ offset: -20, degree: 4 },

			{ offset: -43, degree: 5 },
			{ offset: -42, degree: 6 },
			{ offset: -40, degree: 7 },

			{ offset: -63, degree: 1 },
			{ offset: -61, degree: 2 },
			{ offset: -60, degree: 3 },

			{ offset: -82, degree: 4 },
			{ offset: -80, degree: 5 },
			{ offset: -79, degree: 6 },

			{ offset: -102, degree: 7 },
			{ offset: -100, degree: 1 },
		],
		3: [
			{ offset: 20, degree: 5 },
			{ offset: 21, degree: 6 },
			{ offset: 23, degree: 7 },

			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },
			{ offset: 3, degree: 3 },
			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },
			{ offset: -17, degree: 6 },

			{ offset: -40, degree: 7 },
			{ offset: -38, degree: 1 },

			{ offset: -60, degree: 2 },
			{ offset: -59, degree: 3 },
			{ offset: -57, degree: 4 },

			{ offset: -80, degree: 5 },
			{ offset: -79, degree: 6 },
			{ offset: -77, degree: 7 },
		],
		4: [
			{ offset: 18, degree: 4 },
			{ offset: 20, degree: 5 },
			{ offset: 21, degree: 6 },

			{ offset: -2, degree: 7 },
			{ offset: 0, degree: 1 },

			{ offset: -23, degree: 2 },
			{ offset: -22, degree: 3 },
			{ offset: -20, degree: 4 },

			{ offset: -43, degree: 5 },
			{ offset: -42, degree: 6 },
			{ offset: -40, degree: 7 },

			{ offset: -62, degree: 1 },
			{ offset: -60, degree: 2 },
			{ offset: -59, degree: 3 },

			{ offset: -82, degree: 4 },
			{ offset: -80, degree: 5 },
			{ offset: -79, degree: 6 },
		],
		5: [
			{ offset: 40, degree: 2 },
			{ offset: 41, degree: 3 },
			{ offset: 43, degree: 4 },

			{ offset: 20, degree: 5 },
			{ offset: 21, degree: 6 },
			{ offset: 23, degree: 7 },

			{ offset: 0, degree: 1 },
			{ offset: 2, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 4 },
			{ offset: -18, degree: 5 },
			{ offset: -17, degree: 6 },

			{ offset: -39, degree: 7 },
			{ offset: -37, degree: 1 },

			{ offset: -60, degree: 2 },
			{ offset: -59, degree: 3 },
			{ offset: -57, degree: 4 },
		],
	},
	locrio: {
		1: [
			{ offset: 0, degree: 1 },
			{ offset: 1, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 4 },
			{ offset: -19, degree: 5 },
			{ offset: -17, degree: 6 },

			{ offset: -40, degree: 7 },
			{ offset: -38, degree: 1 },
			{ offset: -37, degree: 2 },

			{ offset: -60, degree: 3 },
			{ offset: -58, degree: 4 },
			{ offset: -57, degree: 5 },

			{ offset: -79, degree: 6 },
			{ offset: -77, degree: 7 },

			{ offset: -100, degree: 1 },
			{ offset: -99, degree: 2 },
			{ offset: -97, degree: 3 },
		],
		2: [
			{ offset: -2, degree: 7 },
			{ offset: 0, degree: 1 },
			{ offset: 1, degree: 2 },

			{ offset: -22, degree: 3 },
			{ offset: -20, degree: 4 },
			{ offset: -19, degree: 5 },

			{ offset: -42, degree: 6 },
			{ offset: -40, degree: 7 },

			{ offset: -63, degree: 1 },
			{ offset: -62, degree: 2 },
			{ offset: -60, degree: 3 },

			{ offset: -82, degree: 4 },
			{ offset: -81, degree: 5 },
			{ offset: -79, degree: 6 },

			{ offset: -102, degree: 7 },
			{ offset: -100, degree: 1 },
			{ offset: -99, degree: 2 },
		],
		3: [
			{ offset: 21, degree: 6 },
			{ offset: 23, degree: 7 },

			{ offset: 0, degree: 1 },
			{ offset: 1, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 4 },
			{ offset: -19, degree: 5 },
			{ offset: -17, degree: 6 },

			{ offset: -40, degree: 7 },
			{ offset: -38, degree: 1 },
			{ offset: -37, degree: 2 },

			{ offset: -59, degree: 3 },
			{ offset: -57, degree: 4 },
			{ offset: -56, degree: 5 },

			{ offset: -79, degree: 6 },
			{ offset: -77, degree: 7 },
		],
		4: [
			{ offset: 18, degree: 4 },
			{ offset: 19, degree: 5 },
			{ offset: 21, degree: 6 },

			{ offset: -2, degree: 7 },
			{ offset: 0, degree: 1 },
			{ offset: 1, degree: 2 },

			{ offset: -22, degree: 3 },
			{ offset: -20, degree: 4 },
			{ offset: -19, degree: 5 },

			{ offset: -42, degree: 6 },
			{ offset: -40, degree: 7 },

			{ offset: -62, degree: 1 },
			{ offset: -61, degree: 2 },
			{ offset: -59, degree: 3 },

			{ offset: -82, degree: 4 },
			{ offset: -81, degree: 5 },
			{ offset: -79, degree: 6 },
		],
		5: [
			{ offset: 41, degree: 3 },
			{ offset: 43, degree: 4 },
			{ offset: 44, degree: 5 },

			{ offset: 21, degree: 6 },
			{ offset: 23, degree: 7 },

			{ offset: 0, degree: 1 },
			{ offset: 1, degree: 2 },
			{ offset: 3, degree: 3 },

			{ offset: -20, degree: 4 },
			{ offset: -19, degree: 5 },
			{ offset: -17, degree: 6 },

			{ offset: -39, degree: 7 },
			{ offset: -37, degree: 1 },
			{ offset: -36, degree: 2 },

			{ offset: -59, degree: 3 },
			{ offset: -57, degree: 3 },
			{ offset: -56, degree: 3 },
		],
	},
}

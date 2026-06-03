export const INITIAL_SONGS = [
  {
    id: 1,
    name: 'Nothing Else Matters',
    artist: 'Metallica',
    key: 'Em',
    lyrics: [
      { segments: [{ chord: 'Em', text: 'So close, no matter how far' }] },
      { segments: [{ chord: 'D', text: "Couldn't be much more " }, { chord: 'C', text: 'from the heart' }] },
      { segments: [{ chord: 'Em', text: 'Forever trusting who we are' }] },
      { segments: [{ chord: 'D', text: 'And nothing else ' }, { chord: 'C', text: 'matters' }] },
      { segments: [{ chord: 'Em', text: 'Never opened myself this way' }] },
      { segments: [{ chord: 'D', text: 'Life is ours, we live it ' }, { chord: 'C', text: 'our way' }] },
      { segments: [{ chord: 'Em', text: 'All these words I do not just say' }] },
      { segments: [{ chord: 'D', text: 'And nothing else ' }, { chord: 'C', text: 'matters' }] },
    ],
    tabs: [
      {
        label: 'Riff Principal (intro)',
        content:
          'e|--0--0--0--0--0--0--0--0--|\n' +
          'B|--0--0--0--0--0--0--0--0--|\n' +
          'G|--0--0--0--0--0--0--0--0--|\n' +
          'D|--2--2--2--2--2--2--2--2--|\n' +
          'A|--2--2--2--2--2--2--2--2--|\n' +
          'E|--0--0--0--0--0--0--0--0--|',
      },
    ],
  },
  {
    id: 2,
    name: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    key: 'Am',
    lyrics: [
      { segments: [{ chord: 'Am', text: "There's a lady who's sure" }] },
      { segments: [{ chord: 'C', text: 'All that glitters is ' }, { chord: 'D', text: 'gold' }] },
      { segments: [{ chord: 'F', text: "And she's buying a stairway to " }, { chord: 'Am', text: 'heaven' }] },
      { segments: [{ chord: 'Am', text: "When she gets there she knows" }] },
      { segments: [{ chord: 'C', text: 'If the stores are all ' }, { chord: 'D', text: 'closed' }] },
      { segments: [{ chord: 'F', text: "With a word she can get what she " }, { chord: 'Am', text: 'came for' }] },
    ],
    tabs: [
      {
        label: 'Intro Fingerpicking',
        content:
          'e|------------------------|\n' +
          'B|--------1--------1-----|\n' +
          'G|------0--------0-------|\n' +
          'D|----2--------2---------|\n' +
          'A|--3--------3-----------|\n' +
          'E|------------------------|',
      },
    ],
  },
  {
    id: 3,
    name: 'Wonderwall',
    artist: 'Oasis',
    key: 'F#m',
    lyrics: [
      { segments: [{ chord: 'F#m', text: 'Today is gonna be the ' }, { chord: 'A', text: 'day' }] },
      { segments: [{ chord: 'Bm', text: "That they're gonna throw it back to " }, { chord: 'D', text: 'you' }] },
      { segments: [{ chord: 'F#m', text: "By now you should've " }, { chord: 'A', text: 'somehow' }] },
      { segments: [{ chord: 'Bm', text: 'Realised what you ' }, { chord: 'D', text: 'gotta do' }] },
    ],
    tabs: [],
  },
  {
    id: 4,
    name: "Knockin' on Heaven's Door",
    artist: 'Bob Dylan',
    key: 'G',
    lyrics: [
      { segments: [{ chord: 'G', text: 'Mama, take this badge off of ' }, { chord: 'D', text: 'me' }] },
      { segments: [{ chord: 'Am', text: "I can't use it any" }, { chord: 'C', text: 'more' }] },
      { segments: [{ chord: 'G', text: "It's getting dark, too dark to " }, { chord: 'D', text: 'see' }] },
      { segments: [{ chord: 'Am', text: "Feels like I'm knockin' on heaven's " }, { chord: 'C', text: 'door' }] },
    ],
    tabs: [],
  },
  {
    id: 5,
    name: 'Hotel California',
    artist: 'Eagles',
    key: 'Bm',
    lyrics: [
      { segments: [{ chord: 'Bm', text: 'On a dark desert highway, cool wind in my ' }, { chord: 'F#', text: 'hair' }] },
      { segments: [{ chord: 'F#', text: 'Warm smell of colitas, rising up through the ' }, { chord: 'A', text: 'air' }] },
      { segments: [{ chord: 'A', text: 'Up ahead in the distance, I saw a shimmering ' }, { chord: 'E', text: 'light' }] },
      { segments: [{ chord: 'E', text: 'My head grew heavy and my sight grew ' }, { chord: 'G', text: 'dim' }] },
      { segments: [{ chord: 'G', text: 'I had to stop for the ' }, { chord: 'Bm', text: 'night' }] },
    ],
    tabs: [
      {
        label: 'Solo Final',
        content:
          'e|----------------------------|\n' +
          'B|--------12-15-12------------|\n' +
          'G|-----12----------14-12------|\n' +
          'D|---14------------------14---|\n' +
          'A|----------------------------|\n' +
          'E|----------------------------|',
      },
    ],
  },
  {
    id: 6,
    name: 'Sweet Child O Mine',
    artist: "Guns N' Roses",
    key: 'Db',
    lyrics: [
      { segments: [{ chord: 'Db', text: "She's got a smile that it seems to " }, { chord: 'Ab', text: 'me' }] },
      { segments: [{ chord: 'Ab', text: 'Reminds me of childhood memo' }, { chord: 'Gb', text: 'ries' }] },
      { segments: [{ chord: 'Db', text: 'Where everything was as fresh as the bright blue ' }, { chord: 'Ab', text: 'sky' }] },
      { segments: [{ chord: 'Ab', text: 'Now and then when I see her ' }, { chord: 'Gb', text: 'face' }] },
    ],
    tabs: [
      {
        label: 'Riff de Intro',
        content:
          'e|--------------------------------|\n' +
          'B|--------------------------------|\n' +
          'G|-----14-14-12-----14-14-12------|\n' +
          'D|---12----------12---------------|\n' +
          'A|--------------------------------|\n' +
          'E|--------------------------------|',
      },
    ],
  },
  {
    id: 7,
    name: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    key: 'F',
    lyrics: [
      { segments: [{ chord: 'F', text: 'Load up on guns, bring your ' }, { chord: 'Bb', text: 'friends' }] },
      { segments: [{ chord: 'F', text: "It's fun to lose and to pre" }, { chord: 'Bb', text: 'tend' }] },
      { segments: [{ chord: 'F', text: "She's over bored and self-ass" }, { chord: 'Bb', text: 'ured' }] },
      { segments: [{ chord: 'F', text: 'Oh no, I know a dirty ' }, { chord: 'Bb', text: 'word' }] },
    ],
    tabs: [],
  },
  {
    id: 8,
    name: 'Back in Black',
    artist: 'AC/DC',
    key: 'E',
    lyrics: [
      { segments: [{ chord: 'E', text: 'Back in black, I hit the ' }, { chord: 'D', text: 'sack' }] },
      { segments: [{ chord: 'D', text: "I've been too long, I'm glad to be " }, { chord: 'A', text: 'back' }] },
      { segments: [{ chord: 'E', text: "Yes, I'm let loose from the " }, { chord: 'D', text: 'noose' }] },
      { segments: [{ chord: 'D', text: "That's kept me hangin' " }, { chord: 'A', text: 'about' }] },
    ],
    tabs: [
      {
        label: 'Riff Principal',
        content:
          'e|--------------------------------|\n' +
          'B|--------------------------------|\n' +
          'G|--------------------------------|\n' +
          'D|--------2--2-------------------|\n' +
          'A|--------2--2-------------------|\n' +
          'E|--0--0-------------------------|',
      },
    ],
  },
]

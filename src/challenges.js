export const CHALLENGES = [
  {
    id: 'animals-habitat', label: 'Animals: granja o bosc', prompt: 'On viuen aquests animals?',
    groups: [
      { id: 'farm', label: 'GRANJA', cue: '🏡🌾', examples: ['🐄'], items: ['🐔', '🐖', '🐑'] },
      { id: 'forest', label: 'BOSC', cue: '🌳🌲', examples: ['🦊'], items: ['🐿️', '🦌', '🦉'] },
    ],
  },
  {
    id: 'school-kitchen', label: 'Escola o cuina', prompt: 'On fem servir cada cosa?',
    groups: [
      { id: 'school', label: 'ESCOLA', cue: '🏫', examples: ['✏️'], items: ['📚', '🎒', '✂️'] },
      { id: 'kitchen', label: 'CUINA', cue: '🍽️', examples: ['🍳'], items: ['🥄', '🥣', '🧂'] },
    ],
  },
  {
    id: 'has-wheels', label: 'Amb rodes o sense', prompt: 'Quines coses tenen rodes?',
    groups: [
      { id: 'wheels', label: 'RODES', cue: '🛞', examples: ['🚲'], items: ['🚗', '🛴', '🛹'] },
      { id: 'no-wheels', label: 'NO RODES', cue: '🚫🛞', examples: ['🧸'], items: ['⚽', '📚', '🧩'] },
    ],
  },
  {
    id: 'wheel-count', label: 'Dues rodes o quatre', prompt: 'Comptem les rodes!',
    groups: [
      { id: 'two-wheels', label: '2 RODES', cue: '2️⃣🛞', examples: ['🚲'], items: ['🛴', '🏍️', '🛵'] },
      { id: 'four-wheels', label: '4 RODES', cue: '4️⃣🛞', examples: ['🚗'], items: ['🚕', '🚙', '🚘'] },
    ],
  },
  {
    id: 'can-fly', label: 'Pot volar o no', prompt: 'Quins animals poden volar?',
    groups: [
      { id: 'flies', label: 'VOLA', cue: '🪽', examples: ['🦅'], items: ['🦋', '🐝', '🦜'] },
      { id: 'cannot-fly', label: 'NO VOLA', cue: '🐾', examples: ['🐘'], items: ['🐕', '🐢', '🐟'] },
    ],
  },
  {
    id: 'water-land', label: 'A l’aigua o a terra', prompt: 'On viuen aquests animals?',
    groups: [
      { id: 'water', label: 'AIGUA', cue: '🌊', examples: ['🐬'], items: ['🐠', '🐳', '🦈'] },
      { id: 'land', label: 'TERRA', cue: '🌱', examples: ['🐘'], items: ['🐈', '🐇', '🐎'] },
    ],
  },
  {
    id: 'feathers-fur', label: 'Plomes o pèl', prompt: 'Què cobreix el cos de cada animal?',
    groups: [
      { id: 'feathers', label: 'PLOMES', cue: '🪶', examples: ['🐔'], items: ['🦆', '🦉', '🐧'] },
      { id: 'fur', label: 'PÈL', cue: '🐾', examples: ['🐈'], items: ['🐕', '🐇', '🐑'] },
    ],
  },
  {
    id: 'fruit-vegetable', label: 'Fruita o verdura', prompt: 'Què és fruita i què és verdura?',
    groups: [
      { id: 'fruit', label: 'FRUITA', cue: '🍎', examples: ['🍐'], items: ['🍌', '🍓', '🍊'] },
      { id: 'vegetable', label: 'VERDURA', cue: '🥕', examples: ['🥦'], items: ['🥬', '🌽', '🥒'] },
    ],
  },
  {
    id: 'food-temperature', label: 'Menjar calent o fred', prompt: 'Aquest menjar se sol prendre calent o fred?',
    groups: [
      { id: 'hot', label: 'CALENT', cue: '♨️', examples: ['🍲'], items: ['🍜', '🍵', '☕'] },
      { id: 'cold', label: 'FRED', cue: '❄️', examples: ['🍦'], items: ['🍧', '🍨', '🥤'] },
    ],
  },
  {
    id: 'sun-rain-clothes', label: 'Roba de sol o de pluja', prompt: 'Què ens posem quan fa sol o quan plou?',
    groups: [
      { id: 'sun', label: 'SOL', cue: '☀️', examples: ['🕶️'], items: ['🧢', '👒', '🩱'] },
      { id: 'rain', label: 'PLUJA', cue: '🌧️', examples: ['☂️'], items: ['🥾', '🧥', '🌂'] },
    ],
  },
  {
    id: 'round-long', label: 'Rodó o allargat', prompt: 'Quina forma té cada cosa?',
    groups: [
      { id: 'round', label: 'RODÓ', cue: '⭕', examples: ['⚽'], items: ['🍊', '🎈', '🪙'] },
      { id: 'long', label: 'LLARG', cue: '↔️', examples: ['✏️'], items: ['🥖', '🥒', '📏'] },
    ],
  },
  {
    id: 'red-blue', label: 'Vermell o blau', prompt: 'Mirem el color de cada dibuix.',
    groups: [
      { id: 'red', label: 'VERMELL', cue: '🔴', examples: ['🍓'], items: ['🍎', '❤️', '🍅'] },
      { id: 'blue', label: 'BLAU', cue: '🔵', examples: ['🫐'], items: ['🐳', '🧢', '🟦'] },
    ],
  },
  {
    id: 'yellow-blue', label: 'Groc o blau', prompt: 'Mirem el color de cada dibuix.',
    groups: [
      { id: 'yellow', label: 'GROC', cue: '🟡', examples: ['🍌'], items: ['🌻', '🍋', '⭐'] },
      { id: 'blue', label: 'BLAU', cue: '🔵', examples: ['🫐'], items: ['🐳', '🧢', '🟦'] },
    ],
  },
  {
    id: 'orange-black', label: 'Taronja o negre', prompt: 'Mirem el color de cada dibuix.',
    groups: [
      { id: 'orange', label: 'TARONJA', cue: '🟠', examples: ['🍊'], items: ['🥕', '🎃', '🦊'] },
      { id: 'black', label: 'NEGRE', cue: '⚫', examples: ['🐈‍⬛'], items: ['🕷️', '🐜', '⬛'] },
    ],
  },
  {
    id: 'wood-metal', label: 'Fusta o metall', prompt: 'De quin material està feta cada cosa?',
    groups: [
      { id: 'wood', label: 'FUSTA', cue: '🪵', examples: ['🪑'], items: ['🪜', '✏️', '🚪'] },
      { id: 'metal', label: 'METALL', cue: '⚙️', examples: ['🔩'], items: ['🔑', '🥄', '🔔'] },
    ],
  },
  {
    id: 'road-air', label: 'Per terra o per l’aire', prompt: 'Per on es mou cada transport?',
    groups: [
      { id: 'road', label: 'TERRA', cue: '🛣️', examples: ['🚗'], items: ['🚌', '🚲', '🚂'] },
      { id: 'air', label: 'AIRE', cue: '☁️', examples: ['✈️'], items: ['🚁', '🎈', '🚀'] },
    ],
  },
  {
    id: 'day-night', label: 'De dia o de nit', prompt: 'Quan són més actius aquests animals?',
    groups: [
      { id: 'day', label: 'DIA', cue: '☀️', examples: ['🐓'], items: ['🐝', '🦋', '🐿️'] },
      { id: 'night', label: 'NIT', cue: '🌙', examples: ['🦉'], items: ['🦇', '🦔', '🦝'] },
    ],
  },
];

export function getItems(challenge) {
  return challenge.groups.flatMap(group => group.items.map(emoji => ({ emoji, groupId: group.id })));
}

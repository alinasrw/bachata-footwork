export const STEPS = [
  // Basics
  { name: 'Basic', category: 'Basics', countLength: 8, countingDisplay: '1-2-3-(4), 5-6-7-(8)', description: 'Basic step: 3 steps + tap, weight shifts side to side.', doubleForEight: false },
  { name: 'Cuadrado', category: 'Basics', countLength: 8, countingDisplay: '1-2-3-4, 5-6-7-8', description: 'Steps in a square/box pattern instead of side to side.', doubleForEight: false },
  { name: 'Open / Close', category: 'Basics', countLength: 4, countingDisplay: '1 (open), 2 (close), 3-4', description: 'Solo step on the spot: legs open on 1, close on 2, then normal steps on 3-4.', doubleForEight: true },
  { name: 'Side Step', category: 'Basics', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Sideways step similar to the Basic, but purely a side-to-side movement.', doubleForEight: true },
  { name: 'Side Step Sin Copa', category: 'Basics', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Side Step with reduced hip movement, more visible footwork.', doubleForEight: true },

  // Rompe & Madrid Family
  { name: 'Rompe adelante', category: 'Rompe & Madrid Family', countLength: 4, countingDisplay: '1-2-3-(4)', description: '"Break forward" – forward-step variation of the Basic.', doubleForEight: true },
  { name: 'Madrid', category: 'Rompe & Madrid Family', countLength: 8, countingDisplay: '1-2-3-4, 5-6-7-8', description: 'Cross step forward/backward, no closing step on 2 (difference from Double Madrid).', doubleForEight: false },
  { name: 'Double Madrid', category: 'Rompe & Madrid Family', countLength: 8, countingDisplay: '1-2-3-4, 5-6-7-8', description: 'Like Madrid, but with a closing step on 2 (and 6).', doubleForEight: false },
  { name: 'Majao', category: 'Rompe & Madrid Family', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Drop movement in the hips/knees, often called "Basic Majao" (Drop).', doubleForEight: true },

  // Sin Copa & Syncopation (Footwork Focus)
  { name: 'Sin copa (Basic, Triangle)', category: 'Sin Copa & Syncopation (Footwork Focus)', countLength: 4, countingDisplay: '1-2-&3-4', description: 'Basic variations without hip movement, often with a triangle foot pattern.', doubleForEight: true },
  { name: 'Syncopated Step (sin copa) + Triple Step', category: 'Sin Copa & Syncopation (Footwork Focus)', countLength: 4, countingDisplay: '1&2-3&4', description: 'An inserted intermediate step (triple) within the sin-copa movement.', doubleForEight: true },
  { name: 'Basic sin copa (1&2, 5&6)', category: 'Sin Copa & Syncopation (Footwork Focus)', countLength: 8, countingDisplay: '1&2-3-4, 5&6-7-8', description: 'Sin-copa variation with a triple directly on 1 and 5.', doubleForEight: false },
  { name: 'Cuadrado + Cha Cha', category: 'Sin Copa & Syncopation (Footwork Focus)', countLength: 8, countingDisplay: '1-2-3&4, 5-6-7&8', description: 'Cuadrado with a cha-cha-style triple step at the end of each 4-count block.', doubleForEight: false },
  { name: 'Madrid + Cha Cha', category: 'Sin Copa & Syncopation (Footwork Focus)', countLength: 8, countingDisplay: '1-2-3&4, 5-6-7&8', description: 'Madrid with a cha-cha-style triple step at the end of each 4-count block.', doubleForEight: false },
  { name: 'Basic + Cha Cha', category: 'Sin Copa & Syncopation (Footwork Focus)', countLength: 8, countingDisplay: '1-2-3&4, 5-6-7&8', description: 'Basic with a cha-cha-style triple step at the end of each 4-count block.', doubleForEight: false },

  // Hip & Body Movement
  { name: 'Contra de Cadera', category: 'Hip & Body Movement', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Hip movement opposing the step direction (a signature trait of the Bachata style).', doubleForEight: true },
  { name: 'Caballito', category: 'Hip & Body Movement', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Bouncy, horse-like hip movement, often used as a transition ("Caballito Up").', doubleForEight: true },

  // Tap, Heel & Toe Variations
  { name: 'Double Tap', category: 'Tap, Heel & Toe Variations', countLength: 4, countingDisplay: '1-2-3-4&4', description: 'Basic with a double tap instead of a single one.', doubleForEight: true },
  { name: 'Double Tap Turn (Backwards)', category: 'Tap, Heel & Toe Variations', countLength: 4, countingDisplay: '1-2-3-4&4', description: 'Double Tap combined with a backward turn.', doubleForEight: true },
  { name: 'Heel & Toe (sin copa & on the spot)', category: 'Tap, Heel & Toe Variations', countLength: 4, countingDisplay: '1-2-3-4', description: 'Alternating heel and toe placement, stationary or with sin copa.', doubleForEight: true },
  { name: 'V-Step', category: 'Tap, Heel & Toe Variations', countLength: 4, countingDisplay: '1-2-3-4', description: 'Feet form a V: out-out-in-in.', doubleForEight: true },

  // Cross & Slide Steps
  { name: 'Grape Vine', category: 'Cross & Slide Steps', countLength: 4, countingDisplay: '1-2-3-4', description: 'Sideways cross steps, a well-known move from general dance vocabulary.', doubleForEight: true },
  { name: 'Cross on 1', category: 'Cross & Slide Steps', countLength: 4, countingDisplay: '1-2-3-4', description: 'Cross step lands on count 1.', doubleForEight: true },
  { name: 'Cross on 2', category: 'Cross & Slide Steps', countLength: 4, countingDisplay: '1-2-3-4', description: 'Cross step lands on count 2.', doubleForEight: true },
  { name: 'Cross on 3', category: 'Cross & Slide Steps', countLength: 4, countingDisplay: '1-2-3-4', description: 'Cross step lands on count 3.', doubleForEight: true },
  { name: 'Puñaito', category: 'Cross & Slide Steps', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Small, compact step with a "punching" character.', doubleForEight: true },
  { name: 'Cheat Step', category: 'Cross & Slide Steps', countLength: 4, countingDisplay: '1-2-3-4', description: 'A trick step that disguises a change of direction.', doubleForEight: true },
  { name: 'Patín on the spot', category: 'Cross & Slide Steps', countLength: 4, countingDisplay: '1&2-3&4', description: '"Skating" slide movement done stationary, on the spot.', doubleForEight: true },
  { name: 'Patín to the side', category: 'Cross & Slide Steps', countLength: 4, countingDisplay: '1&2-3&4', description: '"Skating" slide movement done sideways.', doubleForEight: true },

  // Tiki Taka & Kicks
  { name: 'Tiki Tak', category: 'Tiki Taka & Kicks', countLength: 4, countingDisplay: '1&2&3&4&', description: 'Fast alternating steps ("drum roll" of the feet), repeatable on the spot.', doubleForEight: true },
  { name: 'Kick (normal)', category: 'Tiki Taka & Kicks', countLength: 4, countingDisplay: '1-2-3-4', description: 'Simple kick at the end of the block.', doubleForEight: true },
  { name: 'Kick Cross', category: 'Tiki Taka & Kicks', countLength: 4, countingDisplay: '1-2-3-4', description: 'Kick followed by a leg cross.', doubleForEight: true },
  { name: 'Kick Slide', category: 'Tiki Taka & Kicks', countLength: 4, countingDisplay: '1-2-3-4&', description: 'Kick combined with a slide movement.', doubleForEight: true },

  // Turns & Transitions
  { name: 'Break Turn', category: 'Turns & Transitions', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'A turn that "breaks"/interrupts the Basic rhythm.', doubleForEight: true },

  // Fusion Elements
  { name: 'Chest Roll', category: 'Fusion Elements', countLength: 8, countingDisplay: 'flowing over 8 counts', description: 'A wave movement through the chest.', doubleForEight: false },
  { name: 'Lean & Lift', category: 'Fusion Elements', countLength: 8, countingDisplay: '1-2-3-4 (approximate)', description: 'Body weight leans, then is lifted back up.', doubleForEight: false },
  { name: 'Michael Jackson Turn', category: 'Fusion Elements', countLength: 8, countingDisplay: '1-2-3-4 (approximate)', description: 'A turn with an MJ-style spin/footwork.', doubleForEight: false },
  { name: 'Fusion Slide in Basic', category: 'Fusion Elements', countLength: 8, countingDisplay: 'varies by base figure', description: 'A slide element integrated into the Basic step.', doubleForEight: false },
  { name: 'Fusion Slide in Turn', category: 'Fusion Elements', countLength: 8, countingDisplay: 'varies by base figure', description: 'A slide element integrated into a turn.', doubleForEight: false },
  { name: 'Fusion Shoulder', category: 'Fusion Elements', countLength: 8, countingDisplay: 'flowing over 8 counts', description: 'Shoulder isolation layered onto a base figure, e.g. Basic, Cuadrado, or a Slide.', doubleForEight: false }
];

export const BASIC_STEP = STEPS.find(step => step.name === 'Basic');

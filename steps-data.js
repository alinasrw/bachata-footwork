export const STEPS = [
  // Grundlagen (Basics)
  { name: 'Basic', category: 'Grundlagen (Basics)', countLength: 8, countingDisplay: '1-2-3-(4), 5-6-7-(8)', description: 'Grundschritt: 3 Schritte + Tap, Richtungswechsel seitlich.', doubleForEight: false },
  { name: 'Quadrat (Cuadrado)', category: 'Grundlagen (Basics)', countLength: 8, countingDisplay: '1-2-3-4, 5-6-7-8', description: 'Schritte im Quadrat/Box-Muster statt seitlich.', doubleForEight: false },
  { name: 'Open / Close', category: 'Grundlagen (Basics)', countLength: 4, countingDisplay: '1 (open), 2 (close), 3-4', description: 'Solo-Schritt am Platz: Beine öffnen auf 1, schließen auf 2, danach normale Schritte auf 3-4.', doubleForEight: true },
  { name: 'Side Step', category: 'Grundlagen (Basics)', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Seitwärtsschritt analog zum Basic, aber reine Seitwärtsbewegung.', doubleForEight: true },
  { name: 'Side Step Sin Copa', category: 'Grundlagen (Basics)', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Side Step mit reduzierter Hüfte, mehr Beinarbeit sichtbar.', doubleForEight: true },

  // Rompe & Madrid Familie
  { name: 'Rompe adelante', category: 'Rompe & Madrid Familie', countLength: 4, countingDisplay: '1-2-3-(4)', description: '"Brich nach vorne" – Vorwärtsschritt-Variante des Basic.', doubleForEight: true },
  { name: 'Madrid', category: 'Rompe & Madrid Familie', countLength: 8, countingDisplay: '1-2-3-4, 5-6-7-8', description: 'Kreuzschritt vorne/hinten, kein Schließen auf 2 (Unterschied zu Double Madrid).', doubleForEight: false },
  { name: 'Double Madrid', category: 'Rompe & Madrid Familie', countLength: 8, countingDisplay: '1-2-3-4, 5-6-7-8', description: 'Wie Madrid, aber mit schließendem Schritt auf 2 (bzw. 6).', doubleForEight: false },
  { name: 'Majao', category: 'Rompe & Madrid Familie', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Drop-Bewegung im Hüft-/Kniebereich, oft "Basic Majao" (Drop) genannt.', doubleForEight: true },

  // Sin Copa & Syncopation (Footwork-Fokus)
  { name: 'Sin copa (Basic, Triangle)', category: 'Sin Copa & Syncopation (Footwork-Fokus)', countLength: 4, countingDisplay: '1-2-&3-4', description: 'Basic-Varianten ohne Hüftbewegung, oft mit Triangle-Fußmuster.', doubleForEight: true },
  { name: 'Syncopated Step (sin copa) + Triple Step', category: 'Sin Copa & Syncopation (Footwork-Fokus)', countLength: 4, countingDisplay: '1&2-3&4', description: 'Eingeschobener Zwischenschritt (Triple) in die Sin-Copa-Bewegung.', doubleForEight: true },
  { name: 'Basic sin copa (1&2, 5&6)', category: 'Sin Copa & Syncopation (Footwork-Fokus)', countLength: 8, countingDisplay: '1&2-3-4, 5&6-7-8', description: 'Sin-Copa-Variante mit Triple direkt auf 1 und 5.', doubleForEight: false },
  { name: 'Quadrat/Madrid/Basic mit Triple Step (Cha Cha)', category: 'Sin Copa & Syncopation (Footwork-Fokus)', countLength: 8, countingDisplay: '1-2-3&4, 5-6-7&8', description: 'Cha-Cha-artiger Triple Step am Ende jedes 4er-Blocks, anwendbar auf Quadrat/Madrid/Basic.', doubleForEight: false },

  // Hüfte & Körperbewegung
  { name: 'Contra Cadero', category: 'Hüfte & Körperbewegung', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Gegenläufige Hüftbewegung zum Schritt (Kennzeichen des Bachata-Stils).', doubleForEight: true },
  { name: 'Caballito (Pferdchen)', category: 'Hüfte & Körperbewegung', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Hüpfende, pferdeähnliche Hüftbewegung, oft als Übergang ("Caballito Up").', doubleForEight: true },

  // Tap-, Heel- & Toe-Varianten
  { name: 'Double Tap', category: 'Tap-, Heel- & Toe-Varianten', countLength: 4, countingDisplay: '1-2-3-4&4', description: 'Basic mit doppeltem Tap statt einfachem.', doubleForEight: true },
  { name: 'Double Tap Turn (Backwards)', category: 'Tap-, Heel- & Toe-Varianten', countLength: 4, countingDisplay: '1-2-3-4&4', description: 'Double Tap kombiniert mit rückwärtiger Drehung.', doubleForEight: true },
  { name: 'Heel & Toe (sin copa & am Platz)', category: 'Tap-, Heel- & Toe-Varianten', countLength: 4, countingDisplay: '1-2-3-4', description: 'Abwechselndes Aufsetzen von Ferse und Fußspitze, stationär oder mit Sin Copa.', doubleForEight: true },
  { name: 'V-Step', category: 'Tap-, Heel- & Toe-Varianten', countLength: 4, countingDisplay: '1-2-3-4', description: 'Füße bilden ein V: raus-raus-rein-rein.', doubleForEight: true },

  // Kreuz- & Gleitschritte
  { name: 'Grape Vine (Cross Side)', category: 'Kreuz- & Gleitschritte', countLength: 4, countingDisplay: '1-2-3-4', description: 'Kreuzschritte seitlich, wie im Grundtanz-Vokabular bekannt.', doubleForEight: true },
  { name: 'Cross (on 1, 2 oder 3)', category: 'Kreuz- & Gleitschritte', countLength: 4, countingDisplay: '1-2-3-4 (Kreuzung variabel)', description: 'Benennung richtet sich danach, auf welchem Beat der Kreuzschritt passiert (lehrerabhängig).', doubleForEight: true },
  { name: 'Puñaito', category: 'Kreuz- & Gleitschritte', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Kleiner, kompakter Schritt mit "Stoß"-Charakter.', doubleForEight: true },
  { name: 'Cheat Step', category: 'Kreuz- & Gleitschritte', countLength: 4, countingDisplay: '1-2-3-4', description: 'Trick-/Täuschungsschritt, der eine Richtungsänderung "versteckt".', doubleForEight: true },
  { name: 'Patín (on the spot, to the side)', category: 'Kreuz- & Gleitschritte', countLength: 4, countingDisplay: '1&2-3&4', description: '"Schlittschuh"-Gleitbewegung, variabel stationär oder seitlich.', doubleForEight: true },

  // Tiki Taka & Kicks
  { name: 'Tiki Tak', category: 'Tiki Taka & Kicks', countLength: 4, countingDisplay: '1&2&3&4&', description: 'Schnelle Wechselschritte ("Trommelwirbel" der Füße), am Platz wiederholbar.', doubleForEight: true },
  { name: 'Kick (normal)', category: 'Tiki Taka & Kicks', countLength: 4, countingDisplay: '1-2-3-4', description: 'Einfacher Kick am Ende des Blocks.', doubleForEight: true },
  { name: 'Kick Cross', category: 'Tiki Taka & Kicks', countLength: 4, countingDisplay: '1-2-3-4', description: 'Kick mit anschließender Beinkreuzung.', doubleForEight: true },
  { name: 'Kick Slide', category: 'Tiki Taka & Kicks', countLength: 4, countingDisplay: '1-2-3-4&', description: 'Kick kombiniert mit Gleitbewegung.', doubleForEight: true },

  // Drehungen & Übergänge
  { name: 'Break Turn', category: 'Drehungen & Übergänge', countLength: 4, countingDisplay: '1-2-3-(4)', description: 'Drehung, die den Basic-Rhythmus "bricht"/unterbricht.', doubleForEight: true },

  // Fusion-Elemente
  { name: 'Chest Roll', category: 'Fusion-Elemente', countLength: 8, countingDisplay: 'fließend über 8 Counts', description: 'Wellenbewegung durch den Brustkorb.', doubleForEight: false },
  { name: 'Lean & Lift', category: 'Fusion-Elemente', countLength: 8, countingDisplay: '1-2-3-4 (angenähert)', description: 'Körpergewicht lehnt sich, wird dann angehoben.', doubleForEight: false },
  { name: 'Michael Jackson Turn', category: 'Fusion-Elemente', countLength: 8, countingDisplay: '1-2-3-4 (angenähert)', description: 'Drehung mit MJ-typischem Spin/Fußarbeit.', doubleForEight: false },
  { name: 'Slides (in Basic, in Turn)', category: 'Fusion-Elemente', countLength: 8, countingDisplay: 'variiert je nach Grundfigur', description: 'Gleitelement, in bestehende Basics/Turns integriert.', doubleForEight: false },
  { name: 'Fusion Wave / Shoulder Fusion', category: 'Fusion-Elemente', countLength: 8, countingDisplay: 'fließend über 8 Counts', description: 'Wellenbewegungen und Schulterisolationen auf dem Basic-Grundgerüst.', doubleForEight: false }
];

export const BASIC_STEP = STEPS.find(step => step.name === 'Basic');

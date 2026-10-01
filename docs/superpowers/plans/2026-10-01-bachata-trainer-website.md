# Bachata Footwork Trainer Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a free, static Bachata-footwork reference + random-figure trainer website, deployable via GitHub Pages from the repo root.

**Architecture:** Plain HTML/CSS/JS (no framework, no bundler). Pure business logic (step filtering, random picking, sequencing, BPM timing, list grouping/search) lives in small ES modules that are unit-testable with Node's built-in test runner. `app.js` is a thin DOM-wiring layer on top of those modules and is verified manually in a browser.

**Tech Stack:** Vanilla HTML/CSS/JavaScript (ES modules), Node.js built-in `node:test` + `node:assert/strict` for unit tests. No npm dependencies, no build step. GitHub Pages for hosting.

## Global Constraints

- No backend, no database, no login, no cookies, no analytics/tracking, no third-party scripts (per spec `docs/superpowers/specs/2026-10-01-bachata-trainer-website-design.md`).
- All steps are solo footwork (no partner-dance framing anywhere in copy).
- Counting/figure data must come from a single source of truth (`steps-data.js`), consumed by both the list view and the trainer.
- Count modes are exactly `4` and `8`; 4-count steps with `doubleForEight: true` must be shown as "`<Name> (beide Seiten)`" with doubled counting display when the 8-count mode is active, and must count for a full 8 beats in the trainer timer.
- Trainer timer is BPM-driven and purely visual (no audio/metronome).
- "Basic dazwischen" toggle, when on, inserts the `Basic` step between every two random figures.
- Category filter checkboxes must be derived from the data (`steps-data.js`), not hand-duplicated in HTML.
- Impressum tab needs a clearly marked placeholder for name/contact (not filled in by the implementer) plus a short, accurate data-privacy paragraph mentioning GitHub Pages server logs and linking to GitHub's privacy statement.
- Files live in the repo root (not `/docs`) per spec, since GitHub Pages will be configured to serve from root.
- Repo: `/Users/apptelligentcoding/footwork`, GitHub remote `origin` already pushed and working (SSH).

---

### Task 1: Project scaffolding + step data module

**Files:**
- Create: `package.json`
- Create: `steps-data.js`
- Test: `tests/steps-data.test.js`

**Interfaces:**
- Produces: `STEPS` (array of 34 step objects, each `{ name: string, category: string, countLength: 4|8, countingDisplay: string, description: string, doubleForEight: boolean }`), `BASIC_STEP` (the single `STEPS` entry with `name === 'Basic'`). Both are named exports from `steps-data.js`, consumed by Tasks 2, 3, 5, 6.

- [ ] **Step 1: Create `package.json` so Node's test runner works with ES modules**

```json
{
  "name": "bachata-footwork-trainer",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
```

- [ ] **Step 2: Write the failing data-shape test**

Create `tests/steps-data.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STEPS, BASIC_STEP } from '../steps-data.js';

test('STEPS contains exactly 34 entries', () => {
  assert.equal(STEPS.length, 34);
});

test('every step has the required fields with correct types', () => {
  for (const step of STEPS) {
    assert.equal(typeof step.name, 'string', `${JSON.stringify(step)} missing string name`);
    assert.equal(typeof step.category, 'string', `${step.name} missing string category`);
    assert.ok([4, 8].includes(step.countLength), `${step.name} has invalid countLength`);
    assert.equal(typeof step.countingDisplay, 'string', `${step.name} missing countingDisplay`);
    assert.equal(typeof step.description, 'string', `${step.name} missing description`);
    assert.equal(typeof step.doubleForEight, 'boolean', `${step.name} missing boolean doubleForEight`);
  }
});

test('BASIC_STEP references the Basic entry with 8 counts', () => {
  assert.equal(BASIC_STEP.name, 'Basic');
  assert.equal(BASIC_STEP.countLength, 8);
});

test('category names match the nine sections from BACHATA_STEPS.md', () => {
  const categories = [...new Set(STEPS.map(step => step.category))];
  assert.deepEqual(categories, [
    'Grundlagen (Basics)',
    'Rompe & Madrid Familie',
    'Sin Copa & Syncopation (Footwork-Fokus)',
    'Hüfte & Körperbewegung',
    'Tap-, Heel- & Toe-Varianten',
    'Kreuz- & Gleitschritte',
    'Tiki Taka & Kicks',
    'Drehungen & Übergänge',
    'Fusion-Elemente'
  ]);
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `node --test`
Expected: FAIL — `steps-data.js` does not exist yet (`Cannot find module '../steps-data.js'`).

- [ ] **Step 4: Create `steps-data.js` with the full dataset**

```js
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
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `node --test`
Expected: PASS — all 4 tests in `tests/steps-data.test.js` green.

- [ ] **Step 6: Commit**

```bash
git add package.json steps-data.js tests/steps-data.test.js
git commit -m "feat: add step data module with full Bachata footwork dataset"
```

---

### Task 2: Trainer logic module (pure functions)

**Files:**
- Create: `trainer-logic.js`
- Test: `tests/trainer-logic.test.js`

**Interfaces:**
- Consumes: nothing from other project files (uses only plain step-like objects in its own tests; in production it's called by `app.js` with objects shaped like `steps-data.js`'s `STEPS` entries).
- Produces: `filterStepsForCountMode(steps, mode)`, `filterByCategories(steps, activeCategories)`, `pickRandomStep(steps, rng = Math.random)`, `countDurationMs(bpm)`, `createSequencer({ steps, basicStep, insertBasicBetween, rng = Math.random })` returning `{ next(): item }`. Consumed by Task 6 (`app.js` trainer wiring).

- [ ] **Step 1: Write the failing tests**

Create `tests/trainer-logic.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterStepsForCountMode,
  filterByCategories,
  pickRandomStep,
  countDurationMs,
  createSequencer
} from '../trainer-logic.js';

const sampleSteps = [
  { name: 'Basic', category: 'Grundlagen (Basics)', countLength: 8, countingDisplay: '1-2-3-4, 5-6-7-8', description: 'desc', doubleForEight: false },
  { name: 'Madrid', category: 'Rompe & Madrid Familie', countLength: 4, countingDisplay: '1-2-3-4', description: 'desc', doubleForEight: true },
  { name: 'Chest Roll', category: 'Fusion-Elemente', countLength: 8, countingDisplay: 'fließend', description: 'desc', doubleForEight: false }
];

test('filterStepsForCountMode in 8-mode keeps 8-count steps and doubles eligible 4-count steps', () => {
  const result = filterStepsForCountMode(sampleSteps, 8);
  assert.equal(result.length, 3);
  const madrid = result.find(s => s.name === 'Madrid');
  assert.equal(madrid.countLength, 8);
  assert.equal(madrid.displayName, 'Madrid (beide Seiten)');
  assert.equal(madrid.displayCounting, '1-2-3-4 / 1-2-3-4');
  const basic = result.find(s => s.name === 'Basic');
  assert.equal(basic.displayName, 'Basic');
  assert.equal(basic.displayCounting, '1-2-3-4, 5-6-7-8');
});

test('filterStepsForCountMode in 4-mode only returns true 4-count steps, undoubled', () => {
  const result = filterStepsForCountMode(sampleSteps, 4);
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Madrid');
  assert.equal(result[0].countLength, 4);
  assert.equal(result[0].displayName, 'Madrid');
});

test('filterByCategories keeps only steps whose category is active', () => {
  const result = filterByCategories(sampleSteps, ['Fusion-Elemente']);
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Chest Roll');
});

test('pickRandomStep picks the step at the index implied by the injected rng', () => {
  const result = pickRandomStep(sampleSteps, () => 0.5);
  assert.equal(result.name, 'Madrid');
});

test('pickRandomStep throws when no steps are available', () => {
  assert.throws(() => pickRandomStep([], () => 0.5), /No steps available/);
});

test('countDurationMs converts bpm to milliseconds per count', () => {
  assert.equal(countDurationMs(120), 500);
  assert.equal(countDurationMs(60), 1000);
});

test('countDurationMs throws for non-positive bpm', () => {
  assert.throws(() => countDurationMs(0), /BPM must be positive/);
  assert.throws(() => countDurationMs(-10), /BPM must be positive/);
});

test('createSequencer inserts the basic step between random figures when enabled', () => {
  const basicStep = { name: 'Basic', countLength: 8 };
  const onlyFigure = sampleSteps[1];
  const sequencer = createSequencer({ steps: [onlyFigure], basicStep, insertBasicBetween: true, rng: () => 0 });
  assert.equal(sequencer.next().name, 'Madrid');
  assert.equal(sequencer.next().name, 'Basic');
  assert.equal(sequencer.next().name, 'Madrid');
  assert.equal(sequencer.next().name, 'Basic');
});

test('createSequencer returns figures back-to-back when basic insertion is disabled', () => {
  const basicStep = { name: 'Basic', countLength: 8 };
  const onlyFigure = sampleSteps[1];
  const sequencer = createSequencer({ steps: [onlyFigure], basicStep, insertBasicBetween: false, rng: () => 0 });
  assert.equal(sequencer.next().name, 'Madrid');
  assert.equal(sequencer.next().name, 'Madrid');
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test`
Expected: FAIL — `Cannot find module '../trainer-logic.js'`.

- [ ] **Step 3: Implement `trainer-logic.js`**

```js
export function filterStepsForCountMode(steps, mode) {
  return steps
    .filter(step => step.countLength === mode || (mode === 8 && step.countLength === 4 && step.doubleForEight))
    .map(step => {
      const isDoubled = mode === 8 && step.countLength === 4 && step.doubleForEight;
      return {
        ...step,
        countLength: isDoubled ? 8 : step.countLength,
        displayName: isDoubled ? `${step.name} (beide Seiten)` : step.name,
        displayCounting: isDoubled ? `${step.countingDisplay} / ${step.countingDisplay}` : step.countingDisplay
      };
    });
}

export function filterByCategories(steps, activeCategories) {
  return steps.filter(step => activeCategories.includes(step.category));
}

export function pickRandomStep(steps, rng = Math.random) {
  if (steps.length === 0) {
    throw new Error('No steps available for the current filters');
  }
  const index = Math.floor(rng() * steps.length);
  return steps[index];
}

export function countDurationMs(bpm) {
  if (bpm <= 0) {
    throw new Error('BPM must be positive');
  }
  return 60000 / bpm;
}

export function createSequencer({ steps, basicStep, insertBasicBetween, rng = Math.random }) {
  let nextIsBasic = false;
  return {
    next() {
      if (insertBasicBetween && nextIsBasic) {
        nextIsBasic = false;
        return basicStep;
      }
      const figure = pickRandomStep(steps, rng);
      if (insertBasicBetween) {
        nextIsBasic = true;
      }
      return figure;
    }
  };
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test`
Expected: PASS — all tests in `tests/trainer-logic.test.js` and `tests/steps-data.test.js` green.

- [ ] **Step 5: Commit**

```bash
git add trainer-logic.js tests/trainer-logic.test.js
git commit -m "feat: add pure trainer logic for count modes, filtering, and sequencing"
```

---

### Task 3: List-rendering helper module (pure functions)

**Files:**
- Create: `list-render.js`
- Test: `tests/list-render.test.js`

**Interfaces:**
- Produces: `groupStepsByCategory(steps)` → `Array<{ category: string, steps: Array<step> }>` in first-seen order; `filterStepsByName(steps, query)` → filtered array, case-insensitive substring match, returns all steps for empty/whitespace query. Consumed by Task 6 (`app.js` list tab wiring).

- [ ] **Step 1: Write the failing tests**

Create `tests/list-render.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { groupStepsByCategory, filterStepsByName } from '../list-render.js';

const sampleSteps = [
  { name: 'Basic', category: 'Grundlagen (Basics)', countingDisplay: '1-2-3-4', description: 'desc' },
  { name: 'Madrid', category: 'Rompe & Madrid Familie', countingDisplay: '1-2-3-4', description: 'desc' },
  { name: 'Majao', category: 'Rompe & Madrid Familie', countingDisplay: '1-2-3-4', description: 'desc' }
];

test('groupStepsByCategory groups steps preserving first-seen category order', () => {
  const groups = groupStepsByCategory(sampleSteps);
  assert.equal(groups.length, 2);
  assert.equal(groups[0].category, 'Grundlagen (Basics)');
  assert.equal(groups[0].steps.length, 1);
  assert.equal(groups[1].category, 'Rompe & Madrid Familie');
  assert.equal(groups[1].steps.length, 2);
});

test('filterStepsByName returns all steps for an empty or whitespace query', () => {
  assert.equal(filterStepsByName(sampleSteps, '').length, 3);
  assert.equal(filterStepsByName(sampleSteps, '   ').length, 3);
});

test('filterStepsByName matches case-insensitively by substring', () => {
  const result = filterStepsByName(sampleSteps, 'mad');
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Madrid');
});

test('filterStepsByName returns an empty array when nothing matches', () => {
  assert.equal(filterStepsByName(sampleSteps, 'xyz').length, 0);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test`
Expected: FAIL — `Cannot find module '../list-render.js'`.

- [ ] **Step 3: Implement `list-render.js`**

```js
export function groupStepsByCategory(steps) {
  const order = [];
  const byCategory = new Map();
  for (const step of steps) {
    if (!byCategory.has(step.category)) {
      byCategory.set(step.category, []);
      order.push(step.category);
    }
    byCategory.get(step.category).push(step);
  }
  return order.map(category => ({ category, steps: byCategory.get(category) }));
}

export function filterStepsByName(steps, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return steps;
  }
  return steps.filter(step => step.name.toLowerCase().includes(normalized));
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test`
Expected: PASS — all tests across the three test files green.

- [ ] **Step 5: Commit**

```bash
git add list-render.js tests/list-render.test.js
git commit -m "feat: add pure list grouping and search helpers"
```

---

### Task 4: Static markup and styling

**Files:**
- Create: `index.html`
- Create: `style.css`

**Interfaces:**
- Produces: DOM elements that Tasks 5 and 6 wire up: `#list-search`, `#list-content`, `input[name="count-mode"]`, `#insert-basic`, `#bpm-input`, `#category-filters` (empty fieldset to be populated by JS), `#trainer-start`, `#trainer-stop`, `#trainer-figure-name`, `#trainer-figure-counting`, `#trainer-count-number`, `.tab-button[data-tab]`, `.tab-panel#tab-<name>`.

- [ ] **Step 1: Create `index.html`**

```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Bachata Footwork Trainer</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>Bachata Footwork Trainer</h1>
    <nav class="tabs">
      <button class="tab-button active" data-tab="list" type="button">📋 Liste</button>
      <button class="tab-button" data-tab="trainer" type="button">🎲 Trainer</button>
      <button class="tab-button" data-tab="impressum" type="button">ℹ️ Impressum</button>
    </nav>
  </header>

  <main>
    <section id="tab-list" class="tab-panel active">
      <input type="search" id="list-search" placeholder="Step suchen..." />
      <div id="list-content"></div>
    </section>

    <section id="tab-trainer" class="tab-panel">
      <div class="trainer-settings">
        <fieldset>
          <legend>Count-Modus</legend>
          <label><input type="radio" name="count-mode" value="4" /> 4 Counts</label>
          <label><input type="radio" name="count-mode" value="8" checked /> 8 Counts</label>
        </fieldset>
        <label class="inline-toggle"><input type="checkbox" id="insert-basic" checked /> Basic dazwischen</label>
        <label class="inline-toggle">BPM: <input type="number" id="bpm-input" value="130" min="40" max="220" /></label>
        <fieldset id="category-filters">
          <legend>Kategorien</legend>
        </fieldset>
        <div class="trainer-buttons">
          <button id="trainer-start" type="button">Start</button>
          <button id="trainer-stop" type="button" disabled>Stop</button>
        </div>
      </div>
      <div class="trainer-display">
        <div id="trainer-figure-name">—</div>
        <div id="trainer-figure-counting">—</div>
        <div id="trainer-count-number">–</div>
      </div>
    </section>

    <section id="tab-impressum" class="tab-panel">
      <h2>Impressum</h2>
      <p>
        <!-- TODO: Name & Kontakt eintragen -->
        [Name]<br />
        [Kontakt-E-Mail]
      </p>
      <h2>Datenschutz</h2>
      <p>
        Diese Seite sammelt, speichert oder verarbeitet selbst keine Nutzerdaten (kein Login, keine Cookies,
        keine Formulare). Das Hosting erfolgt über GitHub Pages; GitHub protokolliert dabei serverseitig
        technische Zugriffsdaten (z. B. IP-Adressen) gemäß der
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub Privacy Statement</a>.
        Es werden kein Tracking, keine Analytics und keine Drittanbieter-Skripte eingesetzt.
      </p>
    </section>
  </main>

  <script type="module" src="app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `style.css`**

```css
:root {
  color-scheme: light dark;
  --accent: #c2185b;
  --border: rgba(128, 128, 128, 0.3);
}

* {
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  max-width: 640px;
}

header h1 {
  font-size: 1.4rem;
  margin: 1rem 0 0.75rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab-button {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
}

.tab-button.active {
  background: var(--accent);
  color: white;
}

.tab-panel {
  display: none;
}

.tab-panel.active {
  display: block;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

th, td {
  text-align: left;
  padding: 0.4rem;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

#list-search {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.trainer-settings fieldset {
  margin-bottom: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
}

.trainer-settings label {
  display: block;
  margin: 0.3rem 0;
}

.trainer-buttons button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  margin-right: 0.5rem;
}

.trainer-display {
  text-align: center;
  margin-top: 1.5rem;
}

#trainer-figure-name {
  font-size: 1.5rem;
  font-weight: bold;
}

#trainer-figure-counting {
  font-size: 1.1rem;
  margin: 0.3rem 0;
}

#trainer-count-number {
  font-size: 4rem;
  font-weight: bold;
  color: var(--accent);
}
```

- [ ] **Step 3: Commit**

```bash
git add index.html style.css
git commit -m "feat: add static markup and styling for list, trainer, and impressum tabs"
```

---

### Task 5: List tab wiring

**Files:**
- Create: `app.js`

**Interfaces:**
- Consumes: `STEPS` from `steps-data.js`; `groupStepsByCategory`, `filterStepsByName` from `list-render.js`.
- Produces: `initTabs()`, `initList()` (module-private usage, called at the bottom of `app.js`). No exports needed yet — Task 6 will extend this same file.

- [ ] **Step 1: Create `app.js` with tab switching and list rendering**

```js
import { STEPS } from './steps-data.js';
import { groupStepsByCategory, filterStepsByName } from './list-render.js';

function initTabs() {
  const buttons = document.querySelectorAll('.tab-button');
  const panels = document.querySelectorAll('.tab-panel');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(`tab-${button.dataset.tab}`).classList.add('active');
    });
  });
}

function renderList(query) {
  const filtered = filterStepsByName(STEPS, query);
  const groups = groupStepsByCategory(filtered);
  const container = document.getElementById('list-content');
  container.innerHTML = groups.map(group => `
    <h2>${group.category}</h2>
    <table>
      <thead><tr><th>Step</th><th>Counting</th><th>Beschreibung</th></tr></thead>
      <tbody>
        ${group.steps.map(step => `
          <tr>
            <td>${step.name}</td>
            <td>${step.countingDisplay}</td>
            <td>${step.description}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `).join('');
}

function initList() {
  const searchInput = document.getElementById('list-search');
  renderList('');
  searchInput.addEventListener('input', () => renderList(searchInput.value));
}

initTabs();
initList();
```

- [ ] **Step 2: Manually verify in a browser**

Run: `python3 -m http.server 8000` from the repo root, then open `http://localhost:8000/`.

Checklist:
- All three tab buttons are visible; clicking each one shows only that tab's panel.
- The "Liste" tab shows all 9 category headings with their steps in a table.
- Typing "madrid" in the search box narrows the list to "Madrid" and "Double Madrid" only.
- Clearing the search box restores the full list.

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: wire up tab switching and searchable step list"
```

---

### Task 6: Trainer tab wiring (settings, sequencer, BPM timer)

**Files:**
- Modify: `app.js`

**Interfaces:**
- Consumes: `STEPS`, `BASIC_STEP` from `steps-data.js`; `filterStepsForCountMode`, `filterByCategories`, `countDurationMs`, `createSequencer` from `trainer-logic.js`.

- [ ] **Step 1: Extend `app.js` with trainer wiring**

Add these imports to the top of `app.js` (next to the existing ones):

```js
import { STEPS, BASIC_STEP } from './steps-data.js';
import { filterStepsForCountMode, filterByCategories, countDurationMs, createSequencer } from './trainer-logic.js';
```

Replace the `import { STEPS } from './steps-data.js';` line from Task 5 with the combined import above, then append the following to the end of `app.js`, before the final `initTabs(); initList();` calls:

```js
function initCategoryFilters() {
  const fieldset = document.getElementById('category-filters');
  const categories = [...new Set(STEPS.map(step => step.category))];
  fieldset.innerHTML = categories.map(category => `
    <label>
      <input type="checkbox" class="category-checkbox" value="${category}" checked />
      ${category}
    </label>
  `).join('');
}

function getActiveCategories() {
  return [...document.querySelectorAll('.category-checkbox:checked')].map(checkbox => checkbox.value);
}

function getCountMode() {
  return Number(document.querySelector('input[name="count-mode"]:checked').value);
}

function initTrainer() {
  initCategoryFilters();

  let timerId = null;
  let currentCount = 0;
  let currentItem = null;

  const nameEl = document.getElementById('trainer-figure-name');
  const countingEl = document.getElementById('trainer-figure-counting');
  const countNumberEl = document.getElementById('trainer-count-number');
  const startButton = document.getElementById('trainer-start');
  const stopButton = document.getElementById('trainer-stop');

  function showItem(item) {
    currentItem = item;
    currentCount = 1;
    nameEl.textContent = item.displayName;
    countingEl.textContent = item.displayCounting;
    countNumberEl.textContent = String(currentCount);
  }

  function tick(sequencer, intervalMs) {
    currentCount += 1;
    if (currentCount > currentItem.countLength) {
      showItem(sequencer.next());
    } else {
      countNumberEl.textContent = String(currentCount);
    }
    timerId = setTimeout(() => tick(sequencer, intervalMs), intervalMs);
  }

  function start() {
    const mode = getCountMode();
    const activeCategories = getActiveCategories();
    const insertBasicBetween = document.getElementById('insert-basic').checked;
    const bpm = Number(document.getElementById('bpm-input').value);

    const available = filterByCategories(filterStepsForCountMode(STEPS, mode), activeCategories);
    if (available.length === 0) {
      alert('Keine Steps für die aktuelle Auswahl verfügbar. Bitte Kategorien anpassen.');
      return;
    }
    const basicStep = filterStepsForCountMode([BASIC_STEP], mode)[0];
    const sequencer = createSequencer({ steps: available, basicStep, insertBasicBetween });
    const intervalMs = countDurationMs(bpm);

    showItem(sequencer.next());
    startButton.disabled = true;
    stopButton.disabled = false;
    timerId = setTimeout(() => tick(sequencer, intervalMs), intervalMs);
  }

  function stop() {
    clearTimeout(timerId);
    timerId = null;
    startButton.disabled = false;
    stopButton.disabled = true;
  }

  startButton.addEventListener('click', start);
  stopButton.addEventListener('click', stop);
}
```

Finally, update the bottom of the file to:

```js
initTabs();
initList();
initTrainer();
```

- [ ] **Step 2: Manually verify in a browser**

Run: `python3 -m http.server 8000` (if not already running) and open `http://localhost:8000/`, then go to the "Trainer" tab.

Checklist:
- Category checkboxes are all present and checked by default, matching the 9 categories from the list tab.
- With "8 Counts" selected and "Basic dazwischen" checked: click Start. A figure name + counting appears, the big number counts 1→8 at the BPM-implied pace, then a `Basic` entry appears, then another random figure, alternating.
- Switch to "4 Counts", click Start again: only 4-count figures appear (no "(beide Seiten)" suffix), counting 1→4 each.
- Uncheck "Basic dazwischen", click Start: random figures appear back-to-back with no `Basic` in between.
- Uncheck all categories except one (e.g. only "Fusion-Elemente"), click Start: only figures from that category appear.
- Uncheck every category, click Start: an alert appears ("Keine Steps für die aktuelle Auswahl verfügbar...") and the loop does not start.
- Click Stop while the loop is running: the countdown stops immediately, Start re-enables, Stop disables.
- Changing the BPM value before clicking Start measurably changes the speed of the count-up (e.g. 90 vs 180 BPM).

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: wire up trainer settings, category filters, and BPM-driven sequencer"
```

---

### Task 7: GitHub Pages deployment

**Files:**
- None (repo configuration only)

- [ ] **Step 1: Push the final state to GitHub**

```bash
git push origin main
```

Expected: push succeeds (SSH remote already configured and tested working).

- [ ] **Step 2: Enable GitHub Pages**

In the browser, go to `https://github.com/alinasrw/bachata-footwork/settings/pages`, under "Build and deployment" set **Source** to "Deploy from a branch", **Branch** to `main` and folder `/ (root)`, then save.

- [ ] **Step 3: Verify the live site**

Wait ~1 minute, then open the URL GitHub shows on that same Pages settings page (format `https://alinasrw.github.io/bachata-footwork/`). Re-run the Task 5 and Task 6 manual checklists against the live URL instead of localhost.

- [ ] **Step 4: Fill in the Impressum placeholder**

Edit `index.html`, replace `[Name]` and `[Kontakt-E-Mail]` in the `#tab-impressum` section with real values, then:

```bash
git add index.html
git commit -m "docs: fill in Impressum contact details"
git push origin main
```

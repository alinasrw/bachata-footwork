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
  assert.equal(madrid.displayName, 'Madrid');
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

test('countDurationMs converts bpm to milliseconds per count, paced 1.2x slower than raw beat time', () => {
  assert.equal(countDurationMs(120), 600);
  assert.equal(countDurationMs(60), 1200);
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

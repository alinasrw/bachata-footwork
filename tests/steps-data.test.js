import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STEPS, BASIC_STEP } from '../steps-data.js';

test('STEPS contains exactly 37 entries', () => {
  assert.equal(STEPS.length, 37);
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

test('category names match the nine English sections', () => {
  const categories = [...new Set(STEPS.map(step => step.category))];
  assert.deepEqual(categories, [
    'Basics',
    'Rompe & Madrid Family',
    'Sin Copa & Syncopation (Footwork Focus)',
    'Hip & Body Movement',
    'Tap, Heel & Toe Variations',
    'Cross & Slide Steps',
    'Tiki Taka & Kicks',
    'Turns & Transitions',
    'Fusion Elements'
  ]);
});

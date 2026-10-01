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
